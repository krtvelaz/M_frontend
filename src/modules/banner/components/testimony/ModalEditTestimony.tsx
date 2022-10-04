import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PencilComponent from '../../../../utils/assets/img/PencilComponent';
import { ITestimony } from '../../custom_types';
import FormTestimony from './FormTestimony';

interface ModalFormPros {
    onSubmit: (values: any, form?: any) => any;
    testimony: ITestimony;
}

const ModalEditTestimony: FC<ModalFormPros> = ({ onSubmit, testimony }) => {
    const form_ref = useRef<FormikProps<FormikValues>>();

    const loading: boolean = useSelector((store: any) => store.banner.testimony.loading);

    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);

    const edit = async (values: ITestimony) => {
        await onSubmit(values);
        set_is_visible(false);
    };

    return (
        <>
            <PencilComponent
                on_click={() => {
                    open();
                }}
            />

            <Modal
                visible={is_visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Editar documento</span>}
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                footer={[
                    <button
                        key="saveDoc"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            form_ref.current?.submitForm();
                        }}
                        disabled={loading}
                    >
                        Guardar Cambios
                        {loading && (
                            <i
                                className="fa fa-circle-o-notch fa-spin"
                                style={{ fontSize: 12, marginLeft: 10, color: '#fff' }}
                            />
                        )}
                    </button>,
                ]}
            >
                <FormTestimony onSubmit={edit} innerRef={form_ref} testimony={testimony} type="edit" />
            </Modal>
        </>
    );
};

export default ModalEditTestimony;
