import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../utils/ui";
import FormIndicator from "../components/FormIndicator";
import { IIndicator } from "../custom_types";
import { actions } from "../redux";

const CreateIndicator = () => {
  const form_ref = useRef<FormikProps<FormikValues>>();
  const dispatch = useDispatch<any>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  const statistics: IIndicator = useSelector((store:any) => store.banner.statistics.value)

  const addIndicator = async (values: IIndicator) => {
    await dispatch(actions.create_statistics(values));
    setIsSuccess(true);

  };

  useEffect(() => {
  dispatch(actions.get_statistics());
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(actions.get_statistics());
      setIsSuccess(false);
    }
  }, [isSuccess]);

  

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5 className="">Estadísticas</h5>
            </div>
            <div className="col-md-12">
              <Card title="Editar estadísticas  - Página inicio" actions={[]}>
                <FormIndicator indicator={statistics} innerRef={form_ref} onSubmit={addIndicator} />
              </Card>
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
        <button type="button" className="btn btn-primary" onClick={() => {
            form_ref.current?.submitForm();
        }}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateIndicator;
