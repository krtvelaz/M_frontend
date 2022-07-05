import { Field, Form, Formik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../../utils/ui";

interface DocsFormPros {
  disabled?: boolean;
  type?: "view" | "create" | "edit";
  typeDoc?: "general" | "administrative" | "technicians";
  innerRef: any;
  onSubmit: (values: any) => void;
}

const FormAddDocument: FC<DocsFormPros> = ({
  disabled,
  innerRef,
  onSubmit,
  typeDoc,
}) => {
  const initialValues = {
    document_type: null,
    profile: null,
    template: "",
  };

  const schema = Yup.object().shape({
    document_type: Yup.string().nullable().required("Campo Obligatorio"),
    ...(typeDoc !== "general" && {
      profile: Yup.number().nullable().required("Campo obligatorio"),
    }),
  });

  const submit = (values: any, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ handleChange, values }) => {
        return (
          <Form>
            <div className="row">
              {typeDoc !== "general" && (
                <div className="col-3">
                  <label htmlFor="profile_id" className="form-label">
                    Perfil
                  </label>
                  <Field
                    component={Select}
                    id="profile_id"
                    name="profile"
                    className=""
                    options={[
                      {
                        name: "Grupo de investigación",
                        id: "Grupo de investigación",
                      },
                      { name: "Persona jurídica", id: "Persona jurídica" },
                      {
                        name: "Equipo de innovadores",
                        id: "Equipo de innovadores",
                      },
                    ]}
                    placeholder="Seleccionar…"
                  />
                  <ErrorMessage name="profile" />
                </div>
              )}

              <div className={`col-${typeDoc !== "general" ? 3 : 6} `}>
                <label htmlFor="document_type_id" className="form-label">
                  Tipo de documento
                </label>
                <Field
                  component={Select}
                  id="document_type_id"
                  name="document_type"
                  className=""
                  options={[
                    ...(typeDoc === "general"
                      ? [
                          {
                            name: "Ficha del reto",
                            id: "Ficha del reto",
                          },
                          {
                            name: "Términos generales",
                            id: "Términos generales",
                          },
                          {
                            name: "Matriz de riesgo",
                            id: "Matriz de riesgo",
                          },
                        ]
                      : typeDoc === "technicians"
                      ? [
                          {
                            name: "Formato presentación solución",
                            id: "Formato presentación solución",
                          },
                          {
                            name: "Certificado experiencia desarrollo tecnológico",
                            id: "Certificado experiencia desarrollo tecnológico",
                          },
                          {
                            name: "Matriz de riesgo",
                            id: "Matriz de riesgo",
                          },
                          {
                            name: "Diagrama arquitectónico",
                            id: "Diagrama arquitectónico",
                          },
                        ]
                      : typeDoc === "administrative"
                      ? [
                          {
                            name: "RUT",
                            id: "RUT",
                          },
                          {
                            name: "Cédula representante",
                            id: "Cédula representante",
                          },
                          {
                            name: "Certificado seguridad social",
                            id: "Certificado seguridad social",
                          },
                          {
                            name: "Carta de presentación",
                            id: "Carta de presentación",
                          },
                          {
                            name: "Cédula mujeres",
                            id: "Cédula mujeres",
                          },
                          {
                            name: "Certificado discapacidad",
                            id: "Certificado discapacidad",
                          },
                          {
                            name: "Certificado único victimas",
                            id: "Certificado único victimas",
                          },
                          {
                            name: "Certificado población minoritaria",
                            id: "Certificado población minoritaria",
                          },
                          ...(values.profile === "Equipo de innovadores"
                            ? [
                                {
                                  name: "Recibo de servicios públicos",
                                  id: "Recibo de servicios públicos",
                                },
                              ]
                            : []),
                          ...(values.profile === "Grupo de investigación"
                            ? [
                                {
                                  name: "Certificado validación IES que pertenece",
                                  id: "Certificado validación IES que pertenece",
                                },
                                {
                                  name: "Registro grupLAC, categoría B, A, A1",
                                  id: "Registro grupLAC, categoría B, A, A1",
                                },
                                {
                                  name: "Aval institución registrada en el instituLAC",
                                  id: "Aval institución registrada en el instituLAC",
                                },
                                {
                                  name: "Tener un proyecto de investigación en ejecución",
                                  id: "Tener un proyecto de investigación en ejecución",
                                },
                              ]
                            : []),
                          ...(values.profile === "Persona jurídica"
                            ? [
                                {
                                  name: "Certificado de existencia y representación legal",
                                  id: "Certificado de existencia y representación legal",
                                },
                                {
                                  name: "Certificado de antecedentes disciplinarios",
                                  id: "Certificado de antecedentes disciplinarios",
                                },
                                {
                                  name: "Certificado de antecedentes  judiciales",
                                  id: "Certificado de antecedentes  judiciales",
                                },
                                {
                                  name: "Autorización al representante legal para contratar cuando esta sea necesaria",
                                  id: "Autorización al representante legal para contratar cuando esta sea necesaria",
                                },
                                {
                                  name: "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                                  id: "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                                },
                              ]
                            : []),
                        ]
                      : []),
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="document_type" />
              </div>
              <div className="col-6">
                <label htmlFor="template_id" className="form-label">
                  Adjuntar plantilla{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="PDF."
                  maximum_size={5}
                  type="text"
                  id="template_id"
                  name="template"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="template" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormAddDocument;
