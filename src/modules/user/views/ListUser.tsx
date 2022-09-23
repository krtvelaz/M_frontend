import { useRef } from 'react';
import { Card, } from '../../../utils/ui';
import FormFilterUser from '../components/formFilterUser';
import ModalAssignRole from '../components/ModalAssignRole';
import TableUser from '../components/TableUser';

const ListUser = () => {
    const form_ref = useRef<any>();
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
                            <ModalAssignRole type='assign'/>
                        </div>
                    </div>
                    <Card
                        title="Buscar usuario con rol asignado"
                        actions={[
                            <div className="d-flex justify-content-end" style={{ padding: '20px' }}>
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
                        <FormFilterUser innerRef={form_ref} onSubmit={() => {}} />
                    </Card>
                    <Card>
                        <TableUser />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListUser;
