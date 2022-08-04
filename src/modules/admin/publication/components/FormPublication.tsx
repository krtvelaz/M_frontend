import React, { FC, useRef } from "react";
import { IPublicationInfo } from "../custom_types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, ErrorMessage, DocumentInput } from "../../../../utils/ui";


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
    hec_titulo: "",
    hec_descripcion: "",
    img: "",
    hec_id_tipo_publicacion: "",
    ...publication,
  };

  const schema = Yup.object().shape({
    hec_titulo: Yup.string().required("Campo obligatorio"),

    img: Yup.string().required("Campo obligatorio"),
    ...(type === "general"
      ? {
          hec_id_tipo_publicacion: Yup.string().required("Campo Obligatorio"),
        }
      : {
          hec_descripcion: Yup.string().required("Campo obligatorio"),
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
                  <label htmlFor="hec_id_tipo_publicacion_id" className="form-label">
                    Tipo de publicación
                  </label>
                  <Field
                    id="hec_id_tipo_publicacion_id"
                    name="hec_id_tipo_publicacion"
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
                  <ErrorMessage name="hec_id_tipo_publicacion" />
                </div>
              )}

              
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="img_id" className="form-label">
                  Imagen {type === "general" && "principal"}
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="img_id"
                  name="img"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="img" />
              </div>
              <div className={`col-12 col-md-${type === "gallery" ? 6 : 12}`}>
                <label htmlFor="hec_titulo_id" className="form-label">
                  Título
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="hec_titulo_id"
                  name="hec_titulo"
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
                <ErrorMessage name="hec_titulo" withCount max={100} />
              </div>
              {type === "gallery" && (
                <div className="col-12">
                  <label htmlFor="hec_descripcion_id" className="form-label">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    className="form-control"
                    id="hec_descripcion_id"
                    name="hec_descripcion"
                    autoComplete="off"
                    maxLength={100}
                    style={{ height: "38px" }}
                  />
                  <ErrorMessage name="hec_descripcion" withCount max={100} />
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
