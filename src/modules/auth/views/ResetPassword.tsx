import { FormikProps, FormikValues } from 'formik';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../utils/ui';
import FormLostPassword from '../components/FormLostPassword';
import FormResetPassword from '../components/FormResetPassword';
import { actions } from '../redux';

const ResetPassword = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const onRestPassword = async (values: any) => {
        const reult: any = dispatch(actions.change_password(values.user, values.confirmPassword, values.password));
        await reult
            .then((res: any) => {
                navigate('../', { replace: true });
                
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
                        <div style={{fontSize: '16px', fontFamily: 'Montserrat-SemiBold'}} className="mt-5 ms-5 text-white">Restablece tu contraseña</div>
                    </div>

                    <Card actions={[]}>
                        <div className="row px-5">
                            <div className="" style={{ fontSize: '20px' }}>
                                Hola, <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}> Luisa María Sánchez Cadavid, </span> Por tu seguridad debes cambiar la contraseña
                            </div>
                            <div style={{ fontSize: '13px' }}>
                                Por favor ingresa los siguientes campos y ten en cuenta las indicaciones para generar
                                una nueva contraseña de acceso.
                            </div>
                            <div className='mt-3'  style={{ fontSize: '17px' }}>Actualizar datos</div>
                            <hr style={{ border: '1px solid #FF8403' }} />
                            
                            <FormResetPassword innerRef={form_ref} onSubmit={onRestPassword} />
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

export default ResetPassword;
