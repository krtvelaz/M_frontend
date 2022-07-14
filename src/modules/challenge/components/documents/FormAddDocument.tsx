import { Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../../utils/ui";
import { IDocument } from "../../custom_types";

interface DocsFormPros {
  disabled?: boolean;
  type?: "view" | "create" | "edit";
  typeDoc?: "general" | "administrative" | "technicians" | "report";
  innerRef: any;
  doc?: IDocument;
  onSubmit: (values: any) => void;
  editListDocs: (value: string) => void;
  typesDocument: any[];
}

const FormAddDocument: FC<DocsFormPros> = ({
  disabled,
  typeDoc,
  innerRef,
  doc,
  onSubmit,
  editListDocs,
  typesDocument,
}) => {
  const initialValues = {
    document_type: null,
    profile: null,
    template: "",
    document_name: "",
    ...doc,
  };
  const schema = Yup.object().shape({
    ...(typeDoc === "report"
      ? {
          template: Yup.string().required("Campo obligatorio"),
          document_name: Yup.string().required("Campo obligatorio"),
        }
      : {
          document_type: Yup.string().nullable().required("Campo Obligatorio"),
          document_name: Yup.string().when("document_type", {
            is: "Otro",
            then: Yup.string().required("Campo obligatorio"),
          }),
          ...(typeDoc !== "general" && {
            profile: Yup.string().nullable().required("Campo obligatorio"),
          }),
        }),
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
      {({ handleChange, values, setFieldValue }) => {
        return (
          <Form>
            <div className="row">
              {typeDoc !== "general" && typeDoc !== "report" && (
                <div className="col-12 col-md-3 col-lg-3">
                  <label htmlFor="profile_id" className="form-label">
                    Perfil
                  </label>
                  <Field
                    component={Select}
                    id="profile_id"
                    name="profile"
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
                    extra_on_change={(value: string) => {
                      editListDocs(value);
                    }}
                  />
                  <ErrorMessage name="profile" />
                </div>
              )}
              {typeDoc !== "report" && (
                <div className={`col-12 col-md${typeDoc !== "general" ? 3 : 6} `}>
                  <label htmlFor="document_type_id" className="form-label">
                    Tipo de documento
                  </label>
                  <Field
                    component={Select}
                    id="document_type_id"
                    name="document_type"
                    className=""
                    options={typesDocument}
                    placeholder="Seleccionar…"
                  />
                  <ErrorMessage name="document_type" />
                </div>
              )}

              {(values.document_type === "Otro" || typeDoc === "report") && (
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="document_name_id" className="form-label">
                    {typeDoc !== "report" ? "Nombre" : "Titulo del informe"}
                  </label>
                  <Field
                    type="text"
                    id="document_name_id"
                    name="document_name"
                    className="form-control"
                    aria-describedby="nombre del documento"
                    autoComplete="off"
                    maxLength={typeDoc === "report" ? 50 : 80}
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
                  <ErrorMessage
                    name="document_name"
                    withCount
                    max={typeDoc === "report" ? 50 : 80}
                  />
                </div>
              )}

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="template_id" className="form-label">
                  {typeDoc !== "report" ? (
                    <>
                      Adjuntar plantilla{" "}
                      <span style={{ fontSize: "10px" }}> - Opcional </span>
                    </>
                  ) : (
                    "Adjuntar documento"
                  )}
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
