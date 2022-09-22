import { Alert, Checkbox } from 'antd';
import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../utils/ui';

interface IloginFormPros {
    onSubmit: (values: any, actions?: any) => any;
    disabled?: boolean;
    alert?: string;
}

const FormLoginCopy: FC<IloginFormPros> = ({ onSubmit, disabled, alert }) => {
    const navigate = useNavigate();
    const passwordType = ['password', 'text'];
    const [type, setType] = useState(0);

    const initialValues = {
        user: '',
        password: '',
        remember: false,
    };
    const submit = (values: any, actions: any) => {
        actions.setSubmitting(true);
        onSubmit(values, actions)
            .then(() => {
                actions.setSubmitting(false);
                actions.resetForm();
            })
            .catch(() => {
                actions.setSubmitting(false);
            });
    };

    const schema = Yup.object().shape({
        user: Yup.string().required('Campo obligatorio'),
        password: Yup.string().required('Campo obligatorio'),
    });
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}>
            {({ isSubmitting ,values, handleChange}) => {
                return (
                    <Form>
                        <div className="container-inputs-login usuario-item-login mt-4">
                            <label htmlFor="user_id" className="form-label">
                                Digite su usuario
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="user_id"
                                name="user"
                                disabled={disabled}
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
                        <div className="container-inputs-login">
                            <label htmlFor="password_id" className="form-label">
                                Digite su contraseña
                            </label>
                            <div className="input-group ">
                                <Field
                                    type={passwordType[type]}
                                    className="form-control border-end-0"
                                    id="password_id"
                                    name="password"
                                    autoComplete="on"
                                    disabled={disabled}
                                />

                                <span
                                    className="input-group-text bg-white border-start-0"

                                    onClick={() => {
                                        if (type === 0) {
                                            setType(1);
                                        } else {
                                            setType(0);
                                        }
                                    }}
                                    style={{ cursor: 'pointer', borderRadius: '0px 6px 6px 0px' }}
                                >
                                    {type === 0 && <span style={{ color: '#1FAEEF' }}>VER</span>}
                                    {type === 1 && <span style={{ color: '#1FAEEF' }}>OCULTAR</span>}
                                </span>
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="d-flex align-items-center fw-normal">
                                    <Checkbox onChange={() => { }}>Recordar datos de acceso</Checkbox>
                                    {/* <Field type="checkbox" name="remember" value="remember-me" />
                                    <span className="d-inline-block ms-1">Recordar datos de acceso</span> */}
                                </label>
                            </div>
                        </div>
                        {alert && (
                            <div className="row">
                                <div className="col-12">
                                    <Alert
                                        message=""
                                        description={alert}
                                        type="error"
                                        closable
                                        style={{ fontSize: 13 }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="row">
                           
                            <div className="col-12 text-center mt-4">
                                <p>¿Olvidó su contraseña? <a style={{ font: 'Montserrat', color: '#41A0FF' }} onClick={()=>  navigate('../auth/reset-password/', { replace: true })}> Recuperala AQUÍ</a></p>
                            </div>
                            <div className="bg-white d-flex flex-row justify-content-between mt-4 mb-5 text-center">
                                <div className="col-6">
                                    <button type="button" className="btn btn-outline-primary  me-2" onClick={() => { }}>
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                        disabled={disabled || isSubmitting}
                                    >
                                        Ingresar
                                        {isSubmitting && (
                                            <i
                                                className="fa fa-circle-o-notch fa-spin"
                                                style={{ fontSize: 12, marginLeft: 10, color: '#fff' }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormLoginCopy;
