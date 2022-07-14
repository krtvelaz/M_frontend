import React, { FC, useRef } from "react";
import { IPublicationInfo } from "../custom_types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, ErrorMessage, DocumentInput } from "../../../utils/ui";


interface PublicationPros {
  innerRef: any;
  onSubmit: (values: any) => void;
  type: "general" | "gallery";
  publication?: IPublicationInfo;
}

const FormPublication: FC<PublicationPros> = ({
  innerRef,
  type,
  onSubmit,
  publication,
}) => {
  const initial_values = {
    title: "",
    description: "",
    image: "",
    publication_type: "",
    ...publication,
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Campo obligatorio"),

    image: Yup.string().required("Campo obligatorio"),
    ...(type === "general"
      ? {
          publication_type: Yup.string().required("Campo Obligatorio"),
        }
      : {
          description: Yup.string().required("Campo obligatorio"),
        }),
  });
  const submit = (values: any, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
    if (type === "gallery") actions.resetForm();
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
            <div className="row">
              {type === "general" && (
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="publication_type_id" className="form-label">
                    Tipo de publicación
                  </label>
                  <Field
                    id="publication_type_id"
                    name="publication_type"
                    component={Select}
                    options={[
                      {
                        name: "Noticia",
                        id: "Noticia",
                      },
                      { name: "Evento", id: "Evento" },
                      {
                        name: "Resultado",
                        id: "Resultado",
                      },
                    ]}
                    placeholder="Seleccionar…"
                  />
                  <ErrorMessage name="publication_type" />
                </div>
              )}

              
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="image_id" className="form-label">
                  Imagen {type === "general" && "principal"}
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="image_id"
                  name="image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="image" />
              </div>
              <div className={`col-12 col-md-${type === "gallery" ? 6 : 12}`}>
                <label htmlFor="title_id" className="form-label">
                  Título
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="title_id"
                  name="title"
                  autoComplete="off"
                  maxLength={100}
                  style={{ height: "38px" }}
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
                <ErrorMessage name="title" withCount max={100} />
              </div>
              {type === "gallery" && (
                <div className="col-12">
                  <label htmlFor="description_id" className="form-label">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    className="form-control"
                    id="description_id"
                    name="description"
                    autoComplete="off"
                    maxLength={100}
                    style={{ height: "38px" }}
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
                  <ErrorMessage name="description" withCount max={100} />
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormPublication;
