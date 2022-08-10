import { FC } from "react";
import { IGeneralInfo } from "../custom_types";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../../utils/ui";

interface PublicationPros {
  innerRef: any;
  onSubmit: (values: any) => void;
  publication?: IGeneralInfo;
}
const FormGeneral: FC<PublicationPros> = ({
  innerRef,
  onSubmit,
  publication,
}) => {
  const initial_values = {
    hec_id_tipo_publicacion: "",
    hec_titulo: "",
    hec_autor: "",
    hec_descripcion: "",
    hec_nombre_imagen_principal: {
      name: publication?.hec_nombre_imagen_principal || "",
      id: publication?.id,
    },
    ...publication,
  };

  const schema = Yup.object().shape({
    hec_id_tipo_publicacion: Yup.string().required("Campo Obligatorio"),
    hec_titulo: Yup.string().required("Campo obligatorio"),
    hec_autor: Yup.string().required("Campo obligatorio"),
    hec_nombre_imagen_principal: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
    hec_descripcion: Yup.string().required("Campo obligatorio"),
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
      initialValues={initial_values}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label
                  htmlFor="hec_id_tipo_publicacion_id"
                  className="form-label"
                >
                  Tipo de publicación
                </label>
                <Field
                  id="hec_id_tipo_publicacion_id"
                  name="hec_id_tipo_publicacion"
                  component={Select}
                  options={[
                    {
                      name: "Noticia",
                      id: 1,
                    },
                    { name: "Evento", id: 2 },
                    {
                      name: "Resultado",
                      id: 3,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="hec_id_tipo_publicacion" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
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
                />
                <ErrorMessage name="hec_titulo" withCount max={100} />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="hec_autor_id" className="form-label">
                  Autor
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="hec_autor_id"
                  name="hec_autor"
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
                <ErrorMessage name="hec_autor" withCount max={100} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label
                  htmlFor="hec_nombre_imagen_principal_id"
                  className="form-label"
                >
                  Imagen
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="hec_nombre_imagen_principal_id"
                  name="hec_nombre_imagen_principal"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="hec_nombre_imagen_principal.name" />
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="hec_descripcion_id" className="form-label">
                Contenido
              </label>
              <Field
                as="textarea"
                className="form-control"
                id="hec_descripcion_id"
                name="hec_descripcion"
                autoComplete="off"
                maxLength={3000}
                style={{ height: "157px" }}
              />
              <ErrorMessage name="hec_descripcion" withCount max={3000} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGeneral;
