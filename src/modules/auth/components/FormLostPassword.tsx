import { Field, Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../utils/ui';
import { ILostPassword } from '../custom_types';

interface LostPasswordFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    lostPassword?: ILostPassword;
}
const FormLostPassword: FC<LostPasswordFormPros> = ({ lostPassword, innerRef, onSubmit }) => {
    const location: any = useLocation();

    const initialValues = {
        document: location?.state.data_user.document || '',
        email: location?.state.data_user.email || '',
        ...lostPassword,
    };
    const submit = async (values: any, form: any) => {
        await onSubmit(values, form);
    };

    const schema = Yup.object().shape({
        document: Yup.string().required('Campo obligatorio'),
        email: Yup.string().email('Ingrese un correo electrónico valido').required('Campo obligatorio'),
    });

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-6">
                                <label htmlFor="user_id" className="form-label label-landing">
                                    Digita tu usuario
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="user_id"
                                    name="document"
                                    placeholder="ingresa tu usuario, cédula o NIT"
                                    disabled={location?.state['from'] === 'dashboard'}
                                    autoComplete="off"
                                    min={0}
                                    max={9999999999999999}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,15}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="document" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="email_id" className="form-label label-landing">
                                    Correo electrónico
                                </label>
                                <Field
                                    type="email"
                                    id="email_id"
                                    name="email"
                                    disabled={location?.state['from'] === 'dashboard'}
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: '38px' }}
                                    placeholder="Correo electrónico"
                                />
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormLostPassword;
