import { Formik, Form, FormikProps, FormikValues, Field } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../../utils/ui';
import { IIndicator } from '../../custom_types';

interface IndicarFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    indicator?: IIndicator;
}
const FormIndicator: FC<IndicarFormPros> = ({ innerRef, onSubmit, indicator }) => {
    const initial_values = {
        sta_value: '',
        sta_description: '',
        ...indicator,
    };

    

    const schema = Yup.object().shape({
        sta_value: Yup.string().trim().required('Campo obligatorio'),
        sta_description: Yup.string().trim().required('Campo obligatorio'),
    });

    const submit = (values: any, form: any) => {
        onSubmit(values);
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
                        <div className="row ">
                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="est_numero_reto_id" className="form-label">
                                    Número de retos lanzados
                                </label>
                                <Field
                                    type="text"
                                    className={`form-control ${(errors.sta_value && touched.sta_value) && 'error-input'}`}
                                    id="est_numero_reto_id"
                                    name="sta_value"
                                    autoComplete="off"
                                    min={0}
                                    max={999999}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,6}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="sta_value" withCount max={6} />
                            </div>

                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="sta_description_id" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: '38px' }}
                                    className={`form-control ${(errors.sta_description && touched.sta_description) && 'error-input'}`}
                                    id="sta_description_id"
                                    name="sta_description"
                                    autoComplete="off"
                                    maxLength={48}
                                />
                                <ErrorMessage name="sta_description" withCount max={48} />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormIndicator;
