import { Alert, Modal } from 'antd';
import { FC, useRef, useState } from 'react';
import { Card, Link } from '../../../utils/ui';
import FormFilterUser from './formFilterUser';
import '../styles.css';

interface IModal {
    type: 'assign' | 'change';
}

const ModalAssignRole: FC<IModal> = ({ type }) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [user, setUser] = useState(true);
    const form_ref = useRef<any>();
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    return (
        <>
            {type === 'assign' ? (
                <Link onClick={open} to="#" name="Asignar rol" iconText="+" />
            ) : (
                <div onClick={open} className="button-assign-rol">
                    Cambiar rol
                </div>
            )}
            <Modal
                className={`modal-roles ${type === 'change' && user && 'modal-header-roles'}`}
                title="Buscar y asignar rol a usuario"
                visible={is_visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                bodyStyle={{ padding: 0, background: 'transparent' }}
                footer={[]}
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
            >
                {type === 'assign' && (
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            marginBottom: '10px',
                            borderRadius: '0 0 10px 10px',
                        }}
                    >
                        <FormFilterUser innerRef={form_ref} onSubmit={() => {}} type="assign" />
                    </div>
                )}

                {user && (
                    <Card
                        title="Usuario encontrado"
                        actions={[
                            <div className="my-3 d-flex justify-content-end me-4">
                                <button className="btn btn-outline-primary me-3">Cancelar</button>
                                <button className="btn btn-primary">Asognar rol</button>
                            </div>,
                        ]}
                    >
                        <FormFilterUser innerRef={form_ref} onSubmit={() => {}} type="change" />
                        <Alert
                            message={
                                <div style={{ color: '#F28C02'}}>
                                    <div style={{ fontFamily: 'Montserrat-SemiBold'}} >
                                        Ha seleccionado el rol de super administrador, el usuario tendrá permiso para:
                                    </div>
                                    <div>
                                        Crear retos, publicaciones, estadísticas, Banner principal, testimonios y
                                        eventos. Tabla de postulaciones, tabla de inscripción a boletines.
                                    </div>
                                </div>
                            }
                            type="warning"
                        />
                    </Card>
                )}
            </Modal>
        </>
    );
};

export default ModalAssignRole;
