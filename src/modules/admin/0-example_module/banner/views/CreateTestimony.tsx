import { FormikProps, FormikValues, validateYupSchema } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../utils/ui";
import FormTestimony from "../components/testimony/FormTestimony";
import ListTestimony from "../components/testimony/ListTestimony";
import { ITestimony } from "../custom_types";
import { actions } from "../redux";

const CreateTestimony = () => {
  const testimonials: ITestimony[] = useSelector(
    (store: any) => store.banner.testimonials.value
  );

  const [isChange, setIsChange] = useState<boolean>(false);

  const dispatch = useDispatch<any>();

  const form_ref = useRef<FormikProps<FormikValues>>(); 

  const addTestimony = async (values: ITestimony) => {
    await dispatch(actions.create_testimony(values));
    setIsChange(true);
  };

  const editTetimony = async (values: ITestimony) => {    
    await dispatch(actions.edit_testimonial(values));
    setIsChange(true);
  };

  const onDelete = async (id: number) => {
    await dispatch(actions.delete_testimonial(id));
    setIsChange(true);
  };

  const get_testimonals = async () => {
    await dispatch(actions.get_list_testimonials());
  };

  useEffect(() => {
    get_testimonals();
  }, []);

  useEffect(() => {
    if (isChange) {
      get_testimonals();
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5 className="">Carrusel Testimonios</h5>
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
                      disabled={form_ref.current?.isSubmitting}
                    >
                      Agregar
                      { form_ref.current?.isSubmitting && (
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: 12, marginLeft: 4, color: "#603CE6" }}
                        />
                      )}
                    </button>
                  </div>,
                ]}
              >
                <FormTestimony type="create" innerRef={form_ref} onSubmit={addTestimony} />
              </Card>
              {testimonials.length > 0 && (
                <Card>
                  <h4>Elementos Agregados</h4>
                  <ListTestimony
                    data={testimonials}
                    onEdit={editTetimony}
                    onDelete={onDelete}
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
          onClick={() => {}}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateTestimony;