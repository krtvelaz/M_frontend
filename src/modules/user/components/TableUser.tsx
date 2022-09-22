import { Table } from '../../../utils/ui';
import ModalAssignRole from './ModalAssignRole';

const TableUser = () => {
    const table_columns: any = [
        {
            title: 'No.',
            dataIndex: 'id',
            align: 'left' as 'left',
        },
        {
            title: 'Nombre completo',
            dataIndex: 'name',
            align: 'left' as 'left',
        },
        {
            title: 'Usuario',
            dataIndex: 'user',
            align: 'left' as 'left',
        },
        {
            title: 'Rol asignado',
            dataIndex: 'role',
            align: 'left' as 'left',
        },
        {
            title: 'Acciones',
            align: 'center' as 'center',
            // fixed: 'right',
            render: () => {
                return <ModalAssignRole />;
            },
        },
    ];
    return (
        <>
            <Table
                columns={table_columns}
                items={[{ id: 1, name: 'Luisa María Sánchez Cadavid', user: '101719606', role: 'Super administrador' }]}
                with_pagination={false}
                loading={false}
            />
        </>
    );
};

export default TableUser;
