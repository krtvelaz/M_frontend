import { Alert, Checkbox } from 'antd';
import { Field, Form, Formik } from 'formik';
import { FC, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { ErrorMessage } from '../../../utils/ui';
import { actions } from '../redux';

interface IloginFormPros {
    disabled?: boolean;
    toggle?: any;
}

const FormLogin: FC<IloginFormPros> = ({ disabled, toggle }) => {
    const [alert, set_alert] = useState<string>();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const context = useContext(TemplateContext);
    const passwordType = ['password', 'text'];
    const [type, setType] = useState(0);

    const initialValues = {
        document: '',
        password: '',
        remember: false,
    };
    const submit = async (values: any, form: any) => {
        const promise: any = dispatch(actions.login(values.document, values.password));
        await promise
            .then((res: any) => {
                if (res?.detail_user?.use_role?.id === 4) {
                    navigate('../', { replace: true });
                    context.toggle_login_modal();
                } else {
                    navigate('../home', { replace: true });
                }
            })
            .catch((e: any) => {
                if (e?.response?.data?.message === 'El usuario requiere cambio de contraseña') {
                    navigate(`../auth/change-password/`, { state: { data_user: {...values, name: e?.response?.data?.data} } });
                    toggle();
                    return;
                }
                set_alert(e?.response?.data?.message);
            });
    };

    const schema = Yup.object().shape({
        document: Yup.string().required('Campo obligatorio'),
        password: Yup.string().required('Campo obligatorio'),
    });
    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initialValues} validationSchema={schema}>
            {({ isSubmitting, values, handleChange }) => {
                return (
                    <Form>
                        <div className="container-inputs-login usuario-item-login mt-4">
                            <label htmlFor="user_id" className="form-label">
                                Digita tu usuario
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="user_id"
                                name="document"
                                disabled={disabled}
                                autoComplete="off"
                                min={0}
                                max={9999999999}
                                onChange={(e: any) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = /^[0-9]{0,20}$/;
                                    if (regex.test(value.toString())) {
                                        handleChange(e);
                                    }
                                }}
                            />
                            <ErrorMessage name="document" />
                        </div>
                        <div className="container-inputs-login">
                            <label htmlFor="password_id" className="form-label">
                                Digita tu contraseña
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
                                    {/* <Checkbox onChange={() => { }}>Recordar datos de acceso</Checkbox> */}
                                    <Field type="checkbox" name="remember" />
                                    <span className="d-inline-block ms-1">Recordar tus datos de acceso</span>
                                </label>
                            </div>
                        </div>
                        {alert && alert.length > 0 && (
                            <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '10px' }}>
                                <div className="row container-error-login">
                                    <div className="col-11 font-color-AD0808 font-size-12px font-family-Montserrat-Regular text-error-login">{alert}</div>
                                    <div className="col-1 justify-content-flex-end font-size-12px font-color-AD0808" onClick={() => { set_alert('') }}><span style={{ color: '#AD0808', fontWeight: 'bold', cursor: 'pointer' }}>x</span></div>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-12 text-center mt-4">
                                <p>
                                    ¿Olvidaste tu contraseña?
                                    <a
                                        style={{ font: 'Montserrat', color: '#41A0FF', fontWeight: '600' }}
                                        onClick={() => {
                                            navigate(`../auth/recover-password/`);
                                            if (toggle) toggle();
                                        }}
                                    >
                                       {' '} Recupérala AQUÍ
                                    </a>
                                </p>
                            </div>
                            <div className="bg-white d-flex flex-row justify-content-between mt-4 mb-5 text-center">
                                <div className="col-6">
                                    <button
                                        style={{
                                            width: '80%',
                                            height: '93%',
                                        }}
                                        type="button"
                                        className="btn btn-outline-primary  me-2"
                                        onClick={() => { 
                                            context.toggle_login_modal();
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        style={{
                                            width: '80%',
                                            height: '93%',
                                        }}
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

export default FormLogin;
