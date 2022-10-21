import { Modal } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoMedeinnLogin } from '../../../utils/assets/img';
import FormLogin from './FormLogin';

export interface LoginModalProps {
    open?: boolean;
    toggle?: () => void;
    is_new_user: boolean;
}

const ModalLogin: FC<LoginModalProps> = ({ open, toggle }) => {
    const navigate = useNavigate();

    return (
        <>
            <Modal bodyStyle={{ height: '54rem' }} visible={open} footer={null} onCancel={toggle} title="" className='modal-form-login'>
                <div className="row" style={{ height: '100vh' }}>
                    <div className="col mt-5">
                        <div className="container-form-login mx-auto" style={{ width: 300 }}>
                            <div className="container-center text-center mb-4">
                                <img className="image-logo-container-login" src={logoMedeinnLogin} />
                            </div>
                            <h5 className="sub-header-login text-center mb-5">Ingresa tus datos para iniciar sesión</h5>
                            <div className="form-login">
                                <FormLogin toggle={toggle} />
                                <div
                                    className="row"
                                    style={{
                                        paddingTop: '15px',
                                        borderTop: '0.5px solid #D1D0D0',
                                    }}
                                >
                                    <div className="col text-center">
                                        <p style={{ marginTop: '30px' }}>
                                            Si aún no tienes usuario{' '}
                                            <a
                                                style={{ font: 'Montserrat', color: '#41A0FF', fontWeight: '600' }}
                                                onClick={() => {
                                                    navigate(`../auth/register/`);
                                                    if (toggle) toggle();
                                                }}
                                                // onClick={() => navigate('../auth/register', { replace: true })}
                                            >
                                                Regístrate
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalLogin;
