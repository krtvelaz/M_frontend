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
        title: '',
        description: '',
        image: {
            name:  '',
            id: gallery?.id || -1,
        },
        ...gallery,
    };

    const schema = Yup.object().shape({
        title: Yup.string().required('Campo obligatorio'),
        image: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
        }).nullable(),
        description: Yup.string().required('Campo obligatorio'),
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
                                    type_image="JPG"
                                    maximum_size={2}
                                    type="text"
                                    id="gal_imagen_id"
                                    name="image"
                                    className="form-control"
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="image.name" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="gal_titulo_id" className="form-label">
                                    Título
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="gal_titulo_id"
                                    name="title"
                                    autoComplete="off"
                                    maxLength={100}
                                    style={{ height: '38px' }}
                                />
                                <ErrorMessage name="title" withCount max={100} />
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
                                name="description"
                                autoComplete="off"
                                maxLength={100}
                                style={{ height: '38px' }}
                            />
                            <ErrorMessage name="description" withCount max={100} />
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormGallery;
