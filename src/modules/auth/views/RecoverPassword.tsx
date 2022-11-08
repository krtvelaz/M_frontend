import { FormikProps, FormikValues } from 'formik';
import { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { trazado_amarillo } from '../../../utils/assets/img';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { Card } from '../../../utils/ui';
import FormLostPassword from '../components/FormLostPassword';
import { actions } from '../redux';

const RecoverPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const form_ref = useRef<FormikProps<FormikValues>>();
    const dispatch = useDispatch<any>();
    const context = useContext(TemplateContext);
    const navigate = useNavigate();
    const location: any = useLocation();

    const recover = async (values: any, form: any) => {
        setLoading(true);
        const reult: any = dispatch(actions.recover_password(values.document, values.email));
        await reult
            .then((res: any) => {
                if (location?.state['from'] === 'dashboard') {
                    return navigate(`../auth/change-password/`, {
                        replace: true,
                        state: {
                            data_user: {
                                document: location?.state.data_user?.document,
                                name: location?.state.data_user?.document,
                            },
                            from: 'dashboard',
                        },
                    });
                }

                context.toggle_login_modal();
                navigate('../', { replace: true });
            })
            .catch((e: any) => {});
        setLoading(false);
    };

    return (
        <>
            <div className="box-resetPaswword">
                <div style={{ marginTop: '100', marginBottom: '100px' }} className="container">
                    <img
                        src={trazado_amarillo}
                        alt="trazado"
                        style={{
                            position: 'absolute',
                            top: '-1%',
                            left: '-40%',
                            maxWidth: '3500px',
                        }}
                    />
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row m-5 col-md-12">
                            <div
                                style={{
                                    fontSize: '16px',
                                    fontFamily: 'Montserrat-SemiBold',
                                    margin: '100px 0 20px 50px',
                                }}
                                className=" text-white"
                            >
                                ¿Olvidaste tu contraseña?
                            </div>
                        </div>

                        <Card actions={[]} style={{ borderRadius: '32px' }}>
                            <div className="row px-5">
                                <div className="" style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}>
                                    Completa los campos para iniciar el proceso de recuperación de tu contraseña
                                </div>
                                <div className="mt-3" style={{ fontSize: '17px' }}>
                                    Ingresa tus datos
                                </div>
                                <hr style={{ border: '1px solid #FF8403' }} />

                                <FormLostPassword innerRef={form_ref} onSubmit={recover} />
                                <hr />
                                <div className="text-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            form_ref.current?.submitForm();
                                        }}
                                        disabled={loading}
                                    >
                                        Restablece tu contraseña
                                        {loading && (
                                            <i
                                                className="fa fa-circle-o-notch fa-spin"
                                                style={{ fontSize: 12, marginLeft: 10, color: '#fff' }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecoverPassword;
