import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../utils/ui";
import FormMainBanner from "../components/mainBanner/FormMainBanner";
import ListMainBanner from "../components/mainBanner/ListMainBanner";
import { IMainBanner } from "../custom_types";
import { actions } from "../redux";

const CreateMainBanner = () => {
  const list_banners: IMainBanner[] = useSelector((store: any) => store.banner.list_banners.value);

  const form_ref = useRef<FormikProps<FormikValues>>();
  const dispatch = useDispatch<any>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const addImage = async (value: IMainBanner) => {
    await dispatch(actions.create_main_banner(value));
    setIsSuccess(true);
  };

  const editImage = async(value: IMainBanner, id: number) => {
    await dispatch(actions.edit_banner(value, id ));
    setIsSuccess(true);
  };

  const deleteImage = async (id: number) => {
    await dispatch(actions.delete_banner(id));
    setIsSuccess(true);
  
  };

  const get_banners = async () => {
    await dispatch(actions.get_list_banners());
  };

  useEffect(() => {
    get_banners();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      get_banners();
      setIsSuccess(false);
    }
  }, [isSuccess]);
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
                        form_ref.current?.submitForm()
                      }}
                    >
                      Agregar
                    </button>
                  </div>,
                ]}
              >
                <FormMainBanner innerRef={form_ref} onSubmit={addImage} type='create' />
              </Card>
              {list_banners.length > 0 && (
                <Card>
                  <h4>Elementos agregados</h4>
                  <ListMainBanner
                    data={list_banners}
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
            // dispatch(actions.create_main_banner(images));
          }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateMainBanner;