import { FormikProps, FormikValues } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, swal_error } from "../../../utils/ui";
import FormMainBanner from "../components/FormMainBanner";
import ListMainBanner from "../components/ListMainBanner";
import { IMainBanner } from "../custom_types";
import { actions } from "../redux";

const CreateMainBanner = () => {
  const form_ref = useRef<FormikProps<FormikValues>>();
  const [images, setImages] = useState<IMainBanner[]>([]);
  const dispatch = useDispatch<any>();

  const addImage = async (value: IMainBanner) => {
    if (images.length > 3) {
      await swal_error.fire({
        title: "Ha llegado al máximo de elementos",
        html:
          '<div class="mysubtitle">Máximo de 4 slider</div>' +
          '<div class="mytext">Se debe eliminar alguno para que se pueda publicar uno nuevo.</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setImages([...images, value]);
  };

  const editImage = (value: IMainBanner, index: number) => {
    setImages((data: IMainBanner[]) => {
      data[index] = value;
      return [...data];
    });
  };

  const deleteImage = (index: number) => {
    const newImages = images.filter((value, id) => id != index);
    return setImages(newImages);
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5>Carrusel principal</h5>
            </div>
            <div className="col-md-12">
              <Card
                title="Agregar elemento"
                actions={[
                  <div
                    className="d-flex justify-content-end"
                    style={{ padding: "20px" }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        form_ref.current?.submitForm();
                      }}
                    >
                      Agregar
                    </button>
                  </div>,
                ]}
              >
                <FormMainBanner innerRef={form_ref} onSubmit={addImage} />
              </Card>
              {images.length > 0 && (
                <Card>
                  <h4>Elementos agregados</h4>
                  <ListMainBanner
                    data={images}
                    onSubmit={editImage}
                    onDelete={deleteImage}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white d-flex flex-row justify-content-between"
        style={{ padding: 16, marginBottom: 60, borderTop: "1px solid #ccc" }}
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {}}
        >
          Atrás
        </button>
        <div className="flex-fill" />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            dispatch(actions.create_main_banner(images));
          }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateMainBanner;
