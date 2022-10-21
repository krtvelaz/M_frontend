import { Formik, Form, Field } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { DocumentInput, ErrorMessage } from '../../../../utils/ui';
import { IMainBanner } from '../../custom_types';

interface BannerFormPros {
    innerRef: any;
    onSubmit: (values: IMainBanner, form?: any) => any;
    banner?: IMainBanner;
    type: 'create' | 'edit';
}

const FormMainBanner: FC<BannerFormPros> = ({ innerRef, onSubmit, banner, type }) => {
    const initial_values = {
        ban_order: '',
        ban_title: '',
        ban_description: '',
        ban_reference_url: '',
        ban_embedded_video: '',
        ban_image: {
            name: banner?.cha_image_name ? `${banner?.cha_image_name}.jpg` : '',
            id: banner?.id || '',
        },
        ...banner,
    };

    const schema = Yup.object().shape({
        ban_title: Yup.string().trim().required('Campo obligatorio'),
        ban_description: Yup.string().trim().required('Campo obligatorio'),
        ban_embedded_video: Yup.string().trim().url('Por favor ingrese una url').max(200, 'Máximo 200 caracteres'),
        ban_reference_url: Yup.string().trim().url('Por favor ingrese una url').max(200, 'Máximo 200 caracteres'),
        ban_image: Yup.object({
            name: Yup.string().trim().required('Campo obligatorio'),
        }).nullable(),
    });

    const submit = async (values: any, form: any) => {
        await onSubmit(values);
        form.setSubmitting(false);
        if (type === 'create') {
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
      {({ values, handleChange,errors,touched  }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="car_titulo_id" className="form-label">
                  Título
                </label>
                <Field
                  type="text"
                  className={`form-control ${(errors.ban_title && touched.ban_title) && 'error-input'}`}
                  id="car_titulo_id"
                  name="ban_title"
                  autoComplete="off"
                  maxLength={47}
                />
                <ErrorMessage name="ban_title" withCount max={47} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="car_descripcion_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className={`form-control ${(errors.ban_description && touched.ban_description) && 'error-input'}`}
                  id="car_descripcion_id"
                  name="ban_description"
                  autoComplete="off"
                  maxLength={220}
                  style={{ height: "38px" }}
                />
                <ErrorMessage
                  name="ban_description"
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
                  name="ban_reference_url"
                  className="form-control"
                  autoComplete="off"
                />
                <ErrorMessage name="ban_reference_url" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="car_url_video_id" className="form-label">
                  URL Video{" "}
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="car_url_video_id"
                  name="ban_embedded_video"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Video)
                </div>
                <ErrorMessage name="ban_embedded_video" />
              </div>
              <div className="col-12 col-md-12 col-lg-6">
                <label htmlFor="car_imagen_id" className="form-label">
                  Imagen (Fondo)
                </label>
                <Field
                  component={DocumentInput}
                  maximum_size={2}
                  file_type="img"
                  type_image='JPG'
                  type="text"
                  id="car_imagen_id"
                  name="ban_image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ban_image.name" />
              </div>
              
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormMainBanner;
