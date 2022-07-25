import { Field, Form, Formik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../../utils/ui";
import { IDocument } from "../../custom_types";

interface DocsFormPros {
  disabled?: boolean;
  type?: "create" | "edit";
  typeDoc?: "general" | "admin" | "technicians";
  innerRef: any;
  doc?: IDocument;
  onSubmit: (values: IDocument) => void;
  editListDocs: (value: number) => void;
  typesDocument: any[];
}

const FormAddDocument: FC<DocsFormPros> = ({
  disabled,
  type,
  typeDoc,
  innerRef,
  doc,
  onSubmit,
  editListDocs,
  typesDocument,
}) => {
  const initialValues = {
    ret_tipo_documento: "",
    ret_nombre_documento: "",
    ret_perfiles: "",
    ret_ruta_plantilla: "",
    ret_nombre_plantilla: "",
    ...doc,
  };

  const schema = Yup.object().shape({
    ret_tipo_documento: Yup.number()
      .nullable()
      .required("Campo Obligatorio"),
    ret_nombre_documento: Yup.string().when("ret_tipo_documento", {
      is: 26,
      then: Yup.string().required("Campo obligatorio"),
    }),
    ...(typeDoc !== "general" && {
      ret_perfiles: Yup.string()
        .nullable()
        .required("Campo obligatorio"),
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
      {({ handleChange, values }) => {
        return (
          <Form>
            <div className="row">
              {typeDoc !== "general" && (
                <div className="col-12 col-md-3 col-lg-3">
                  <label htmlFor="ret_perfiles_id" className="form-label">
                    Perfil
                  </label>
                  <Field
                    component={Select}
                    id="ret_perfiles_id"
                    name="ret_perfiles"
                    options={[
                      {
                        name: "Grupo de investigación",
                        id: 1,
                      },
                      { name: "Persona jurídica", id: 2 },
                      {
                        name: "Equipo de innovadores",
                        id: 3,
                      },
                    ]}
                    placeholder="Seleccionar…"
                    extra_on_change={(value: number) => {
                      editListDocs(value);
                    }}
                  />
                  <ErrorMessage name="ret_perfiles" />
                </div>
              )}
              <div
                className={`col-12 col-md-${typeDoc !== "general" ? 3 : 6} `}
              >
                <label htmlFor="ret_tipo_documento_id" className="form-label">
                  Tipo de documento
                </label>
                <Field
                  component={Select}
                  id="ret_tipo_documento_id"
                  name="ret_tipo_documento"
                  className=""
                  options={typesDocument}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_tipo_documento" />
              </div>

              {values.ret_tipo_documento === 26 && (
                <div className="col-12 col-md-6 col-lg-6">
                  <label
                    htmlFor="ret_nombre_documento_id"
                    className="form-label"
                  >
                    Nombre
                  </label>
                  <Field
                    type="text"
                    id="ret_nombre_documento_id"
                    name="ret_nombre_documento"
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
                  <ErrorMessage
                    name="ret_nombre_documento"
                    withCount
                    max={80}
                  />
                </div>
              )}

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_ruta_plantilla_id" className="form-label">
                  <>
                    Adjuntar plantilla{" "}
                    <span style={{ fontSize: "10px" }}> - Opcional </span>
                  </>
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="PDF."
                  maximum_size={5}
                  type="text"
                  id="ret_ruta_plantilla_id"
                  name="ret_ruta_plantilla"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_ruta_plantilla" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormAddDocument;
