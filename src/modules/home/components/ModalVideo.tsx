import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player';

interface UrlVideo {
    urlVideo: string;
}

const ModalVideo: FC<UrlVideo> = ({ urlVideo }) => {
    // const [img, setImg] = useState("");
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    return (
        <>
            <span
            className='component-link'
                onClick={() => {
                    open();
                }}
            >
                <span style={{ cursor: 'pointer' }}>Presentación</span>
                <Avatar className="ms-2 text-white link-avatar" size={28} style={{ backgroundColor: '#603CE6' }}>
                    <i className="fa fa-play" aria-hidden="true"></i>
                </Avatar>
            </span>
            <Modal
                visible={is_visible}
                width={751}
                onCancel={close}
                title={
                    <p style={{ fontFamily: 'Roboto, Bold', fontSize: '15px' }}>
                        <span style={{ fontFamily: 'Roboto, Black', fontSize: '23px', color: '#5AC1DD' }}>
                            Medellín,
                        </span>{' '}
                        una ciudad que inspira, florece y se transforma todos los días
                    </p>
                }
                maskStyle={{
                    backgroundColor: '#707070',
                    opacity: '1',
                }}
                footer={[
                    <button
                        key="saveDoc"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            close();
                        }}
                    >
                        Aceptar
                    </button>,
                ]}
            >
                <div>
                    <div style={{ border: '0.5px solid #707070', padding: '15px', opacity: '1', margin: '0px 30px' }}>
                        <ReactPlayer
                            url={urlVideo}
                            controls
                            width="100%"
                            height="350px"
                            playing={is_visible}
                            // Agregar función para que el video se detenga cuando cierres el modal
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalVideo;