import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { Card } from '../../../utils/ui';
import FormFilterUser from './formFilterUser';
import '../styles.css';

const ModalAssignRole = () => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const form_ref = useRef<any>();
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    return (
        <>
            <div onClick={open} style={{ color: '#1D98D1' }}>
                Cambiar rol
            </div>
            <Modal
                className="modal-roles"
                title="Buscar y asignar rol a usuario"
                visible={is_visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                bodyStyle={{ padding: 0, background: 'transparent' }}
                footer={[]}
            >
                <div
                    style={{ background: '#fff', padding: '20px', marginBottom: '10px', borderRadius: '0 0 10px 10px' }}
                >
                    <FormFilterUser innerRef={form_ref} onSubmit={() => {}} />
                </div>
                <Card>
                    <FormFilterUser innerRef={form_ref} onSubmit={() => {}} />
                </Card>
            </Modal>
        </>
    );
};

export default ModalAssignRole;
