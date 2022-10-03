import { Modal, Skeleton } from 'antd';
import { FC, useState } from 'react';
import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';

interface DocumetFormProps {
    gallery: any;
}

const ModalDetailGallery: FC<DocumetFormProps> = ({ gallery }) => {
    const loading: any = useSelector((states: any) => states.publication.publication.loading);
    const [is_visible, set_is_visible] = useState(false);
    const close = () => set_is_visible(false);
    const open = () => set_is_visible(true);
    return (
        <>
            <div className="imagen-events" onClick={open}>
                <div className="lupa-image-postulation" style={{ position: 'absolute', bottom: '35%', left: '40%' }}>
                    <i className="fa fa-search-plus text-white" style={{ fontSize: '50px' }} aria-hidden="true" />
                </div>

                {gallery?.pubfil_buffer?.data && (
                    <img
                        src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(gallery?.pubfil_buffer?.data).toString(
                            'base64'
                        )}`}
                        className="w-100"
                        alt="imagen galería postulación"
                    />
                ) }
            </div>

            <Modal
                visible={is_visible}
                width={751}
                onCancel={close}
                title={
                    <span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>{gallery?.pubfil_title}</span>
                }
                maskStyle={{
                    backgroundColor: 'rgba(33, 25, 21, .76)',
                }}
                footer={[]}
            >
                <div>
                    {gallery?.pubfil_buffer?.data && (
                        <img
                            src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                gallery?.pubfil_buffer?.data
                            ).toString('base64')}`}
                            alt="img"
                        />
                    )}

                    <div className="my-3">{gallery?.pubfil_description}</div>
                </div>
            </Modal>
        </>
    );
};

export default ModalDetailGallery;
