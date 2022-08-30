import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { pencil } from '../../../utils/assets/img';
import { IGalleryInfo } from '../custom_types';
import FormGallery from './FormGallery';

interface ModalEditFormPros {
    gallery: IGalleryInfo;
    onSubmit: (values: IGalleryInfo) => any;
}

const ModalEditGallery: FC<ModalEditFormPros> = ({ gallery, onSubmit }) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const form_ref = useRef<FormikProps<FormikValues>>();
    const loading = useSelector((store: any) => store.event.gallery.loading);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    const edit = async (values: any) => {
        await onSubmit(values);
        set_is_visible(false);
    };
    return (
        <>
            <img src={pencil} style={{ cursor: 'pointer' }} onClick={() => open()} className="img-pencil" alt="" />
            <Modal
                visible={is_visible}
                width={1000}
                onCancel={close}
                title={
                    <span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Editar elemento galería</span>
                }
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                footer={[
                    <button
                        key="saveDoc"
                        type="button"
                        className="btn btn-primary"
                        disabled={loading}
                        onClick={() => {
                            form_ref.current?.submitForm();
                        }}
                    >
                        Guardar Cambios
                        {loading && (
                            <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                            />
                        )}
                    </button>,
                ]}
            >
                <FormGallery gallery={gallery} innerRef={form_ref} onSubmit={edit} />
            </Modal>
        </>
    );
};

export default ModalEditGallery;
