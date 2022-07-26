import { Field, Form, Formik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../../utils/ui";
import { Informe } from "../../custom_types";

interface FormPros {
  disabled?: boolean;
  type?: "create" | "edit";
  innerRef: any;
  report?: Informe;
  onSubmit: (values: Informe) => void;
}

const FormReport: FC<FormPros> = ({ onSubmit, innerRef, report }) => {
  const initialValues = {
    ret_titulo_reporte: "",
    ret_ruta_documento: "",
    ret_nombre_documento: "",
    ...report,
  };

  const schema = Yup.object().shape({
    ret_titulo_reporte: Yup.string().required("Campo obligatorio"),
    ret_ruta_documento: Yup.string().required("Campo obligatorio"),
  });

  const submit = (values: any, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  
  
  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ handleChange, values }) => {        return (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_titulo_reporte_id" className="form-label">
                  Titulo del informe
                </label>
                <Field
                  type="text"
                  id="ret_titulo_reporte_id"
                  name="ret_titulo_reporte"
                  className="form-control"
                  aria-describedby="nombre del documento"
                  autoComplete="off"
                  maxLength={80}
                  onChange={(e: any) => {
                    e.preventDefault();
                    const { value } = e.target;
                    const regex = new RegExp(
                      /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                    );
                    if (regex.test(value.toString())) {
                      handleChange(e);
                    }
                  }}
                />
                <ErrorMessage name="ret_titulo_reporte" withCount max={80} />
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_ruta_documento_id" className="form-label">
                  Adjuntar documento
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="PDF."
                  maximum_size={5}
                  type="text"
                  id="ret_ruta_documento_id"
                  name="ret_ruta_documento"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_ruta_documento" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormReport;
