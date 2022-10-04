import { Alert, Modal } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { Card, Link } from '../../../utils/ui';
import FormFilterUser from './FormFilterUser';
import '../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';

interface IModal {
    type: 'assign' | 'change';
    id?: number;
}

const ModalAssignRole: FC<IModal> = ({ type, id }) => {
    const dispatch = useDispatch<any>();
    const users1: any[] = useSelector((store: any) => store.user.list_users.value);
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [user, setUser] = useState(true);
    const [userlistFilter, setUserlistFilter] = useState<any>();
    const [userInfo, setUserInfo] = useState<any>();
    const form_ref = useRef<any>();
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    const get_inforRolesDetail = async () => {
        const res = await dispatch(actions.get__RoleDetail(1));
        setUserlistFilter(res.data);
    };
    useEffect(() => {
        get_inforRolesDetail();
    }, []);

    return (
        <>
            {type === 'assign' ? (
                <Link onClick={open} to="#" name="Asignar rol" iconText="+" />
            ) : (
                <div
                    onClick={async () => {
                        const filterInfoUsersList = users1.find((item: any) => item.use_id === id);
                        setUserInfo(filterInfoUsersList);
                        open();
                    }}
                    className="button-assign-rol"
                >
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
                        <FormFilterUser
                            setUserInfoId={setUserInfo}
                            innerRef={form_ref}
                            onSubmit={() => {}}
                            type="assign"
                        />
                    </div>
                )}

                {userInfo && (
                    <Card
                        title="Usuario encontrado"
                        actions={[
                            <div className="my-3 d-flex justify-content-end me-4">
                                <button className="btn btn-outline-primary me-3">Cancelar</button>
                                <button className="btn btn-primary">Asignar rol</button>
                            </div>,
                        ]}
                    >
                        <FormFilterUser
                            infoUser={{ role: userInfo?.use_role?.id, document: userInfo?.use_id }}
                            innerRef={form_ref}
                            onSubmit={() => {}}
                            type="change"
                        />
                        <Alert
                            message={
                                <div style={{ color: '#F28C02' }}>
                                    <div style={{ fontFamily: 'Montserrat-SemiBold' }}>
                                        Ha seleccionado el rol de {userlistFilter?.rol_name}, el usuario tendrá permiso
                                        para:
                                    </div>
                                    <div>{userlistFilter?.rol_description}</div>
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
