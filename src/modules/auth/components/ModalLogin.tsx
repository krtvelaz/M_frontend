import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoMedeinnLogin } from '../../../utils/assets/img';
import actions from '../redux/actions';
import FormLoginCopy from './FormLoginCopy';


const ModalLogin = () => {
    const [alert, set_alert] = useState<string>();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const onLogin = async (values: any) => {
        navigate('../home', { replace: true });

        // const promise: any = dispatch(actions.login(values.email, values.password));
        // await promise
        //     .then((res: any) => {
        //         navigate('../home', { replace: true });

        //     })
        //     .catch((e: any) => {                                
        //         set_alert(e?.response?.data?.message);
        //     });
    };
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal

                footer={false}
                title="" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="row" style={{ height: '100vh' }}>

                    <div className="col mt-5">
                        <div className="container-form-login mx-auto" style={{ width: 300 }}>
                            <div className="container-center text-center mb-4">
                                <img className="image-logo-container-login" src={logoMedeinnLogin} />
                            </div>
                            <h5 className="sub-header-login text-center">
                                Ingrese sus datos para iniciar sesión
                            </h5>
                            <div className="form-login">

                                <FormLoginCopy onSubmit={onLogin} alert={alert} />
                                <div
                                    className="row"
                                    style={{
                                        paddingTop: '15px',
                                        borderTop: '0.5px solid #D1D0D0',
                                    }}
                                >
                                    <div className="col text-center">
                                        <p>Si aún no tienes usuario <a style={{ font: 'Montserrat', color: '#41A0FF' }}  onClick={()=>  navigate('../auth/register', { replace: true })}>Regístrate</a></p>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col ">
                                        {/* <button
                                    type="button"
                                    className="btn btn-outline-primary my-3"
                                    onClick={() => (window.location.href = 'http://localhost:3000/auth/signup')}
                                >
                                    Registrarme
                                </button> */}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalLogin