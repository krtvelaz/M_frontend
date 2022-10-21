import { FC } from "react";
import { IGeneralInfo } from "../custom_types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../utils/ui";
import RichText from "./RichText";


interface PublicationPros {
  innerRef: any;
  onSubmit: (values: any) => any;
  publication?: IGeneralInfo;
}
const FormGeneral: FC<PublicationPros> = ({
  innerRef,
  onSubmit,
  publication,
}) => {
  const initial_values = {
    pub_type: "",
    pub_title: "",
    pub_author: "",
    pub_description: "",
    pub_imagen: {
      name: publication?.pub_image?.pubfil_name ? `${publication?.pub_image?.pubfil_name }.${publication?.pub_image?.pubfil_type }` : "",
      id: publication?.id,
    },
    ...publication,
  };


  const schema = Yup.object().shape({
    pub_type: Yup.string().required("Campo Obligatorio"),
    pub_title: Yup.string().required("Campo obligatorio"),
    pub_author: Yup.string().required("Campo obligatorio"),
    pub_imagen: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
    pub_description: Yup.string().required("Campo obligatorio"),
  });

  const submit = async (values: any, actions: any) => {
    onSubmit(values).then((res: any) => {
      actions.setSubmitting(false);
      actions.resetForm();
    });
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initial_values}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ values, handleChange,errors,touched }) => {
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
                  name="pub_type"
                  component={Select}
                  status={(errors?.pub_type && touched.pub_type) ? 'error' : 'success'}
                  options={[
                    {
                      name: "Noticia",
                      id: 2,
                    },
                    { name: "Evento", id: 1 },
                    {
                      name: "Resultado",
                      id: 3,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="pub_type" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="hec_titulo_id" className="form-label">
                  Título
                </label>
                <Field
                  as="textarea"
                  className={`form-control ${(errors.pub_title && touched.pub_title) && 'error-input'}`}
                  id="hec_titulo_id"
                  name="pub_title"
                  autoComplete="off"
                  maxLength={100}
                  style={{ height: "38px" }}
                />
                <ErrorMessage name="pub_title" withCount max={100} />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="hec_autor_id" className="form-label">
                  Autor
                </label>
                <Field
                  as="textarea"
                  className={`form-control ${(errors.pub_author && touched.pub_author) && 'error-input'}`}
                  id="hec_autor_id"
                  name="pub_author"
                  autoComplete="off"
                  maxLength={100}
                  style={{ height: "38px" }}
                />
                <ErrorMessage name="pub_author" withCount max={100} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label
                  htmlFor="hec_imagen_id"
                  className="form-label"
                >
                  Imagen
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type_image="JPG"
                  type="text"
                  id="hec_imagen_id"
                  name="pub_imagen"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="pub_imagen.name" />
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="hec_descripcion_id" className="form-label">
                Contenido
              </label>
              <Field
                component={RichText}
                id="hec_descripcion_id"
                name="pub_description"
                className={`${(errors.pub_description && touched.pub_description) && 'error-input'}`}
                autoComplete="off"
                maxLength={3000}
                style={{ height: "157px" }}
              />
              <ErrorMessage name="pub_description" withCount max={3000} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGeneral;
