import { FC } from 'react';
import { IGalleryInfo, IGeneralInfo, IPublication } from '../custom_types';
import { Field, Form, Formik } from 'formik';

import * as Yup from 'yup';
import { DocumentInput, ErrorMessage, Select } from '../../../utils/ui';

interface GalleryPros {
    innerRef: any;
    onSubmit: (values: any) => any;
    gallery?: IGalleryInfo;
}

const FormGallery: FC<GalleryPros> = ({ innerRef, onSubmit, gallery }) => {
    const initial_values = {
        gal_titulo: '',
        gal_descripcion: '',
        gal_imagen: {
            name: gallery?.gal_nombre_imagen || '',
            id: gallery?.id || -1,
        },
        ...gallery,
    };

    const schema = Yup.object().shape({
        gal_titulo: Yup.string().required('Campo obligatorio'),
        gal_imagen: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
        }).nullable(),
        gal_descripcion: Yup.string().required('Campo obligatorio'),
    });

    const submit = async (values: any, actions: any) => {
        onSubmit(values).then((res: any)=> {
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
            {({ values, handleChange }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="gal_imagen_id" className="form-label">
                                    Imagen
                                </label>
                                <Field
                                    component={DocumentInput}
                                    file_type="img"
                                    type_image="JPEG"
                                    maximum_size={2}
                                    type="text"
                                    id="gal_imagen_id"
                                    name="gal_imagen"
                                    className="form-control"
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="gal_imagen.name" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="gal_titulo_id" className="form-label">
                                    Título
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="gal_titulo_id"
                                    name="gal_titulo"
                                    autoComplete="off"
                                    maxLength={100}
                                    style={{ height: '38px' }}
                                />
                                <ErrorMessage name="gal_titulo" withCount max={100} />
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="gal_descripcion_id" className="form-label">
                                Descripción
                            </label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="gal_descripcion_id"
                                name="gal_descripcion"
                                autoComplete="off"
                                maxLength={100}
                                style={{ height: '38px' }}
                            />
                            <ErrorMessage name="gal_descripcion" withCount max={100} />
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormGallery;
