import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IIndicator } from '../../custom_types';
import FormIndicator from './FormIndicator';

interface statistics {
    data: IIndicator;
    on_submit: (values: IIndicator) => any;
}

const ModalEditStatistics: FC<statistics> = ({ data, on_submit }) => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [visible, setvisible] = useState<boolean>(false);
    const loading = useSelector((store: any) => store.banner.testimony.loading);
    const open = () => setvisible(true);
    const close = () => setvisible(false);

    const editStatistics = async (values: IIndicator) => {
        await on_submit(values);
    };

    return (
        <>
            <div onClick={open} className="button-assign-rol">
                Editar
            </div>
            <Modal
                visible={visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Editar estadística</span>}
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
                <FormIndicator innerRef={form_ref} onSubmit={editStatistics} indicator={data} />
            </Modal>
        </>
    );
};

export default ModalEditStatistics;
