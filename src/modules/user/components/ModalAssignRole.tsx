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
    switchGetUsers?: boolean;
    setSwitchGetUsers?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAssignRole: FC<IModal> = ({ type, id, setSwitchGetUsers, switchGetUsers }) => {
    const dispatch = useDispatch<any>();
    const [roleUser, setRoleUser] = useState(null);
    const users1: any[] = useSelector((store: any) => store.user.list_users.value);
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [user, setUser] = useState(true);
    const [userlistFilter, setUserlistFilter] = useState<any>({});
    const [userInfo, setUserInfo] = useState<any>();
    const form_ref = useRef<any>();
    const open = () => {
        set_is_visible(true);
    };
    const close = () => {
        set_is_visible(false);
    };
    const get_inforRolesDetail = async () => {
        if (userInfo !== undefined) {
            const res = await dispatch(actions.get__RoleDetail(roleUser ? roleUser : userInfo?.use_role?.id));
            setUserlistFilter(res?.data);
        }
    };
    const changeRoleUsers = async () => {
        await dispatch(actions.change_RoleUser(Number(userInfo?.use_id), roleUser, set_is_visible));
        if (setSwitchGetUsers) setSwitchGetUsers(!switchGetUsers);
    };
    useEffect(() => {
        get_inforRolesDetail();
    }, [userInfo, roleUser]);
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
                afterClose={() => {
                    setUserInfo('');
                }}
                onCancel={() => {
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
                                <button onClick={close} className="btn btn-outline-primary me-3">
                                    Cancelar
                                </button>
                                <button onClick={changeRoleUsers} className="btn btn-primary">
                                    Asignar rol
                                </button>
                            </div>,
                        ]}
                    >
                        <FormFilterUser
                            setRoleUser={setRoleUser}
                            infoUser={{
                                role: roleUser === null ? userInfo?.use_role?.id : roleUser,
                                document: userInfo?.use_id,
                            }}
                            innerRef={form_ref}
                            onSubmit={() => {}}
                            type="change"
                        />
                        {userlistFilter && (
                            <Alert
                                message={
                                    <div style={{ color: '#F28C02' }}>
                                        <div style={{ fontFamily: 'Montserrat-SemiBold' }}>
                                            Ha seleccionado el rol de {userlistFilter?.rol_name}, el usuario tendrá
                                            permiso para:
                                        </div>
                                        <div>{userlistFilter?.rol_description}</div>
                                    </div>
                                }
                                type="warning"
                            />
                        )}
                    </Card>
                )}
            </Modal>
        </>
    );
};

export default ModalAssignRole;
