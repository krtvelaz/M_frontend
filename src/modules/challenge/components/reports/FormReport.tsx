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
    retinf_nombre: "",
    retinf_documento: {
      name: report?.retinf_nombre_archivo || "",
      id: report?.id,
    },
    ...report,
  };


  const schema = Yup.object().shape({
    retinf_nombre: Yup.string().required("Campo obligatorio"),
    retinf_documento: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
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
      {({ handleChange, values, errors, touched }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="retinf_nombre_id" className="form-label">
                  Título del informe
                </label>
                <Field
                  type="text"
                  id="retinf_nombre_id"
                  name="retinf_nombre"
                  className="form-control"
                  aria-describedby="nombre del documento"
                  autoComplete="off"
                  maxLength={50}
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
                <ErrorMessage name="retinf_nombre" withCount max={50} />
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="retinf_documento_id" className="form-label">
                  Adjuntar documento
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="PDF."
                  maximum_size={5}
                  type="text"
                  id="retinf_documento_id"
                  name="retinf_documento"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="retinf_documento.name" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormReport;
