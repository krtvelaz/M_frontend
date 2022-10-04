import { FormikProps, FormikValues } from "formik";
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
  const loading: boolean = useSelector(
    (store: any) => store.banner.testimony.loading
  );
  

  const [isChange, setIsChange] = useState<boolean>(false);

  const dispatch = useDispatch<any>();

  const form_ref = useRef<FormikProps<FormikValues>>(); 

  const addTestimony = async (values: ITestimony) => {
    const newTestiminial = {
      ...values,
      tes_order: testimonials.length + 1
    }
    await dispatch(actions.create_testimony(newTestiminial));
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
    await dispatch(actions.get_list_testimonials({page: 1, page_size: 4, order_by_key: 'tes_order', order_by_value: 'asc' }));
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
                      disabled={loading}
                    >
                      Agregar
                      { loading && (
                        <i
                          className="fa fa-circle-o-notch fa-spin"
                          style={{ fontSize: 12, marginLeft: 10, color: "#1D98D1" }}
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
                  <h4>Elementos agregados</h4>
                  <ListTestimony
                    testimonials={testimonials}
                    onEdit={editTetimony}
                    onDelete={onDelete}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimony;
