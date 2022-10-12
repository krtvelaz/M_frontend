import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '../../../utils/ui';
import FormFilterUser from '../components/FormFilterUser';
import ModalAssignRole from '../components/ModalAssignRole';
import TableUser from '../components/TableUser';
import { actions } from '../redux';

const ListUser = () => {
    const form_ref = useRef<any>();
    const [switchGetUsers, setSwitchGetUsers] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const [clean, setClean] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        page: 1,
        page_size: 10,
        from: 'management'
    });

    const filterUsers = async (values: { document?: string; role?: string | number }) => {
        if (!values.document && !values.role) {
            return;
        }
        await dispatch(
            actions.get_list_users({
                ...(values.document && { document: values.document }),
                ...(values.role && { role: values.role }),
                from: 'management'
            })
        );
        setClean(true);
    };
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">Roles y permisos</h5>
                        <div
                            style={{
                                margin: '0 20px 10px 0',
                            }}
                            className="col d-flex justify-content-end"
                        >
                            <ModalAssignRole
                                setSwitchGetUsers={setSwitchGetUsers}
                                switchGetUsers={switchGetUsers}
                                type="assign"
                            />
                        </div>
                    </div>
                    <Card
                        title="Buscar usuario con rol asignado"
                        actions={[
                            <div className="d-flex justify-content-end" style={{ padding: '20px' }}>
                                <button
                                    type="button"
                                    className="btn-back me-5"
                                    onClick={async () => {
                                        const { role, document } = form_ref.current.values;
                                        if ((role || document) && clean) {
                                            await dispatch(actions.get_list_users(filters));
                                            setClean(false);
                                        }
                                        form_ref.current?.resetForm();
                                    }}
                                >
                                    Limpiar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => form_ref.current?.submitForm()}
                                >
                                    Buscar
                                </button>
                            </div>,
                        ]}
                    >
                        <FormFilterUser type="filter" innerRef={form_ref} onSubmit={filterUsers} />
                    </Card>
                    <Card>
                        <TableUser
                            setSwitchGetUsers={setSwitchGetUsers}
                            switchGetUsers={switchGetUsers}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListUser;
