import { Formik, Form, Field } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { DocumentInput, ErrorMessage } from '../../../../utils/ui';
import { ITestimony } from '../../custom_types';

interface TestimonyFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    testimony?: ITestimony;
    type: 'create' | 'edit';
}
const FormTestimony: FC<TestimonyFormPros> = ({ innerRef, onSubmit, testimony, type }) => {
    const initial_values = {
        tes_title: '',
        tes_description: '',
        tes_background_image: {
            name: testimony?.tes_image_name ? `${testimony?.tes_image_name}.png` : '',
            id: testimony?.id,
        },
        tes_background_logo: {
            name: testimony?.tes_logo_name ? `${testimony?.tes_logo_name}.png` : '',
            id: testimony?.id,
        },
        ...testimony,
    };

    const schema = Yup.object().shape({
        tes_title: Yup.string().required('Campo obligatorio'),
        tes_description: Yup.string().required('Campo obligatorio'),
        tes_background_image: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
        }).nullable(),
        tes_background_logo: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
        }).nullable(),
    });

    const submit = async (values: any, form: any) => {
        await onSubmit(values);
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
            {({ values, handleChange, errors, touched, setFieldValue, isSubmitting }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="tes_titulo_id" className="form-label">
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    className={`form-control ${(errors.tes_title && touched.tes_title) && 'error-input'}`}
                                    id="tes_titulo_id"
                                    name="tes_title"
                                    autoComplete="off"
                                    maxLength={70}
                                />
                                <ErrorMessage name="tes_title" withCount max={70} />
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="tes_descripcion_id" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    type="text"
                                    className={`form-control ${(errors.tes_description && touched.tes_description) && 'error-input'}`}
                                    id="tes_descripcion_id"
                                    name="tes_description"
                                    autoComplete="off"
                                    maxLength={300}
                                />
                                <ErrorMessage name="tes_description" withCount max={300} />
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="tes_imagen_id" className="form-label">
                                    Imagen - Empresario
                                </label>
                                <Field
                                    file_type="img"
                                    type_image="PNG"
                                    maximum_size={2}
                                    component={DocumentInput}
                                    className="form-control"
                                    id="tes_imagen_id"
                                    name="tes_background_image"
                                    autoComplete="off"
                                />
                                { !values.tes_background_image.name && <ErrorMessage name="tes_background_image.name" /> }
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="tes_logo_id" className="form-label">
                                    Imagen - Logo
                                </label>
                                <Field
                                    file_type="img"
                                    type_image="PNG"
                                    maximum_size={2}
                                    component={DocumentInput}
                                    className="form-control"
                                    id="tes_logo_id"
                                    name="tes_background_logo"
                                    autoComplete="off"
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                { !values.tes_background_logo.name && <ErrorMessage name="tes_background_image.name" /> }
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormTestimony;
