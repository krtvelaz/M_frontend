import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "../../../../utils/ui";
import { IIndicator } from "../../custom_types";

interface IndicarFormPros {
  innerRef: any;
  onSubmit: (values: any, form?: any) => any;
  indicator?: IIndicator;
}
const FormIndicator: FC<IndicarFormPros> = ({
  innerRef,
  onSubmit,
  indicator,
}) => {
  const initial_values = {
    est_numero_reto: "",
    est_persona_impacto: "",
    ...indicator,
  };

  const schema = Yup.object().shape({
    est_numero_reto: Yup.string().required("Campo obligatorio"),
    est_persona_impacto: Yup.string().required("Campo obligatorio"),
  });

  const submit = (values: any, form: any) => {
    onSubmit(values);
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initial_values}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <div className="row ">
              <div className="col-12 col-md-12  col-lg-6  ">
                <label htmlFor="est_numero_reto_id" className="form-label">
                  Número de retos lanzados
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="est_numero_reto_id"
                  name="est_numero_reto"
                  autoComplete="off"
                  min={0}
                  max={999999}
                  onChange={(e: any) => {
                    e.preventDefault();
                    const { value } = e.target;
                    const regex = /^[0-9]{0,6}$/;
                    if (regex.test(value.toString())) {
                      handleChange(e);
                    }
                  }}
                />
                <ErrorMessage name="est_numero_reto" withCount max={6} />
              </div>

              <div className="col-12 col-md-12  col-lg-6  ">
                <label
                  htmlFor="est_descripcion_numero_reto_id"
                  className="form-label"
                >
                  Descripción
                </label>
                <Field
                  as="textarea"
                  style={{ height: "38px" }}
                  className="form-control"
                  id="est_descripcion_numero_reto_id"
                  name="est_descripcion_numero_reto"
                  autoComplete="off"
                  maxLength={48}
                />
                <ErrorMessage
                  name="est_descripcion_numero_reto"
                  withCount
                  max={48}
                />
              </div>
            </div>

            
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormIndicator;
