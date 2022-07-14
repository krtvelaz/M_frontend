import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../utils/ui";
import { IMainBanner } from "../custom_types";

interface BannerFormPros {
  innerRef: any;
  onSubmit: (values: IMainBanner, form?: any) => any;
  data_image?: IMainBanner;
}

const FormMainBanner: FC<BannerFormPros> = ({ innerRef, onSubmit, data_image }) => {
  const initial_values = {
    title: '',
    description: '',
    button_url: '',
    video_url: '',
    background_image: "",
    ...data_image,
  };

  const schema = Yup.object().shape({
    title: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
    background_image: Yup.string().required('Campo obligatorio'),
  });

  const submit = (values: any, form: any) => {
    onSubmit(values);
    form.setSubmitting(false);
    form.resetForm();
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
                <label htmlFor="title_id" className="form-label">
                  Título
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="title_id"
                  name="title"
                  autoComplete="off"
                  maxLength={47}
                  onChange={(e: any) => {
                    e.preventDefault();
                    const { value } = e.target;
                    const regex = new RegExp(
                      /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g
                    );
                    if (regex.test(value.toString())) {
                      handleChange(e);
                    }
                  }}
                />
                <ErrorMessage name="title" withCount max={47} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="description_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="description_id"
                  name="description"
                  autoComplete="off"
                  maxLength={220}
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
                <ErrorMessage
                  name="description"
                  withCount
                  max={220}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="button_url_id" className="form-label">
                  Url botón{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="button_url_id"
                  name="button_url"
                  className="form-control"
                  autoComplete="off"
                />
                <ErrorMessage name="button_url" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="video_url_id" className="form-label">
                  URL Video{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="video_url_id"
                  name="video_url"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Vimeo)
                </div>
                <ErrorMessage name="video_url" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="background_image_id" className="form-label">
                  Imagen (Fondo)
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="background_image_id"
                  name="background_image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="background_image" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormMainBanner;
