import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../utils/ui';
import { ILostPassword } from '../custom_types';

interface LostPasswordFormPros {
    innerRef: any;
    // onSubmit: (values: any, form?: any) => any;
    lostPassword?: ILostPassword;
}
const FormLostPassword: FC<LostPasswordFormPros> = ({ lostPassword, innerRef }) => {

    const initialValues = {
        user: '',
        email: '',
        ...lostPassword
    };
    const submit = (values: any, form: any) => {
        console.log(values)
    };

    const schema = Yup.object().shape({
        user: Yup.string().required('Campo obligatorio'),
        email: Yup.string().email("Ingrese un correo electrónico valido").required("Campo obligatorio"),

    });
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ isSubmitting, values, handleChange }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-6">
                                <label htmlFor="user_id" className="form-label">
                                    {/* Número de identificación */}
                                    Digite su usuario
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="user_id"
                                    name="user"
                                    placeholder='Ingrese su usuario, cédula o NIT'
                                    // disabled={disabled}
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
                                <ErrorMessage name="user" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="email_id" className="form-label">
                                    Correo electrónico
                                </label>
                                <Field
                                    type="email"
                                    id="email_id"
                                    name="email"
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: "38px" }}
                                    placeholder="Correo electrónico"

                                />
                                <ErrorMessage name="email" />
                            </div>
                        </div>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default FormLostPassword
