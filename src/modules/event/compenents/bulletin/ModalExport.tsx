import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux';
import FormExport from './FormExport';

const ModalExport = () => {
    const [visible, setvisible] = useState<boolean>(false);
    const form_ref = useRef<any>();
    const open = () => setvisible(true);
    const close = () => setvisible(false);
    const dispatch = useDispatch<any>();

    const export_values = async (values: any, form: any) => {
        await dispatch(actions.export_data(values));
        form.resetForm();
        close();
    };

    return (
        <>
            <button type="button" className="btn btn-outline-primary" onClick={open}>
                Exportar Datos
            </button>
            <Modal
                visible={visible}
                width={'660px'}
                onCancel={() => {
                    close();
                }}
                title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Exportar Datos</span>}
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                footer={[
                    <button
                        disabled={false}
                        key="saveDoc"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            form_ref.current?.submitForm();
                        }}
                    >
                        Exportar datos
                    </button>,
                ]}
            >
                <div className="mb-3" style={{ fontFamily: 'Work-Sans-Regular', fontSize: '14px' }}>
                    Seleccione un rango de fechas para exportar los datos
                </div>
                <FormExport innerRef={form_ref} onSubmit={export_values} />
            </Modal>
        </>
    );
};

export default ModalExport;
