import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoAlcaldiaNegro } from '../../../utils/assets/img';
import FormLogin from '../components/FormLogin';
import actions from '../redux/actions';

const Login = () => {
    const [alert, set_alert] = useState<string>();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const onLogin = async (values: any) => {
        const promise: any = dispatch(actions.login(values.email, values.password));
        await promise
            .then((res: any) => {
                navigate('../home', { replace: true });
                
            })
            .catch((e: any) => {                                
                set_alert(e?.response?.data?.message);
            });
    };
    return (
        <div>
            <div className="row" style={{ height: '100vh' }}>
                <div
                    className="col d-none d-md-block no-padding-bottom no-padding-top"
                    style={{ background: '#603ce6' }}
                ></div>
                <div className="col mt-3">
                    <div className="container-form-login mx-auto" style={{ width: 300 }}>
                        <div className="container-center text-center">
                            <img className="image-logo-container-login" src={logoAlcaldiaNegro} />
                        </div>
                        <h5 className="sub-header-login text-center">
                            Secretaría de Innovación Digital, Medeiin laboratorio de innovación
                        </h5>
                        <div className="form-login">
                            <div>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '15px',
                                        fontSize: '14px',
                                        borderTop: '0.5px solid #D1D0D0',
                                    }}
                                >
                                    Ingrese sus datos para iniciar sesión
                                </p>
                            </div>
                            <FormLogin onSubmit={onLogin} alert={alert} />
                            <div
                                className="row"
                                style={{
                                    paddingTop: '15px',
                                    borderTop: '0.5px solid #D1D0D0',
                                }}
                            >
                                <div className="col text-center">
                                    <span>¿Olvidó su contraseña?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
