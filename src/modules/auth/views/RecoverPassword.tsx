import { FormikProps, FormikValues } from 'formik';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

    const recover = async (values: any, form: any) => {
        setLoading(true);
        const reult: any = dispatch(actions.recover_password(values.document, values.email));
        await reult
            .then((res: any) => {
                context.toggle_login_modal();
                navigate('../', { replace: true });
            })
            .catch((e: any) => {});
        setLoading(false);
    };

    return (
        <div className="box-resetPaswword">
            <div style={{ marginTop: '110' }} className="container">
                <div className="row justify-content-center">
                    <div className="d-flex flex-row m-5 col-md-12">
                        <div
                            style={{ fontSize: '16px', fontFamily: 'Montserrat-SemiBold' }}
                            className="mt-5 ms-5 text-white"
                        >
                            ¿Olvidaste tu contraseña?
                        </div>
                    </div>

                    <Card actions={[]}>
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
    );
};

export default RecoverPassword;
