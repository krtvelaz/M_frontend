import { FormikProps, FormikValues } from 'formik';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../utils/ui';
import FormLostPassword from '../components/FormLostPassword';
import FormResetPassword from '../components/FormResetPassword';
import { actions } from '../redux';

const ForgotPassword = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const RecoverPassword = async (values: any, form: any) => {
        const reult: any = dispatch(actions.recover_password(values.document, values.email));
        await reult
            .then((res: any) => {
                // navigate('../home', { replace: true });
                
            })
            .catch((e: any) => {                                
                // set_alert(e?.response?.data?.message);
            });
        

    }

    return (
        <div className="box-resetPaswword">
            <div style={{ marginTop: '110' }} className="container">
                <div className="row justify-content-center">
                    <div className="d-flex flex-row m-5 col-md-12">
                        <div style={{fontSize: '16px', fontFamily: 'Montserrat-SemiBold'}} className="mt-5 ms-5 text-white">¿Olvido su contraseña?</div>
                    </div>

                    <Card actions={[]}>
                        <div className="row px-5">
                            <div className="" style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}>
                                Completa los campos para iniciar el proceso de recuperación de su contraseña
                            </div>
                            <div className='mt-3'  style={{ fontSize: '17px' }}>Ingrese sus datos</div>
                            <hr style={{ border: '1px solid #FF8403' }} />
                            
                            <FormLostPassword innerRef={form_ref} onSubmit={RecoverPassword} />
                            <hr />
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                >
                                    Restablecer contraseña
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
