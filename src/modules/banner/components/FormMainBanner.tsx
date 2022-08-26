import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../utils/ui";
import { IMainBanner } from "../custom_types";

interface BannerFormPros {
  innerRef: any;
  onSubmit: (values: IMainBanner, form?: any) => any;
  banner?: IMainBanner;
  type: 'create' | 'edit';
}

const FormMainBanner: FC<BannerFormPros> = ({ innerRef, onSubmit, banner, type }) => {
  const initial_values = {
    car_titulo: '',
    car_descripcion: '',
    car_url: '',
    car_url_video: '',
    car_imagen: {
      name: banner?.car_nombre_imagen || '',
      id: banner?.id || '',
    },
    
    ...banner,
  };

  const schema = Yup.object().shape({
    car_titulo: Yup.string().required('Campo obligatorio'),
    car_descripcion: Yup.string().required('Campo obligatorio'),
    car_url_video: Yup.string().url("Por favor ingrese una url").max(200, 'Máximo 200 caracteres'),
    car_url: Yup.string().url("Por favor ingrese una url").max(200, 'Máximo 200 caracteres'),
    car_imagen: Yup.object({
      name: Yup.string().required('Campo obligatorio')
    }).nullable(),
  });

  const submit = async (values: any, form: any) => {
    await onSubmit(values);
    form.setSubmitting(false);
    if(type === 'create'){
      form.resetForm();
    }
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
                <label htmlFor="car_titulo_id" className="form-label">
                  Título
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="car_titulo_id"
                  name="car_titulo"
                  autoComplete="off"
                  maxLength={47}
                />
                <ErrorMessage name="car_titulo" withCount max={47} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="car_descripcion_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="car_descripcion_id"
                  name="car_descripcion"
                  autoComplete="off"
                  maxLength={220}
                  style={{ height: "38px" }}
                />
                <ErrorMessage
                  name="car_descripcion"
                  withCount
                  max={220}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="car_url_id" className="form-label">
                  URL botón{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="car_url_id"
                  name="car_url"
                  className="form-control"
                  autoComplete="off"
                />
                <ErrorMessage name="car_url" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="car_url_video_id" className="form-label">
                  URL Video{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="car_url_video_id"
                  name="car_url_video"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Vimeo)
                </div>
                <ErrorMessage name="car_url_video" />
              </div>

              <div className="col-12 col-md-12 col-lg-6">
                <label htmlFor="car_imagen_id" className="form-label">
                  Imagen (Fondo)
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type_image='JPEG'
                  type="text"
                  id="car_imagen_id"
                  name="car_imagen"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="car_imagen.name" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormMainBanner;
