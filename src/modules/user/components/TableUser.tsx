import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../utils/ui';
import { actions } from '../redux';
import ModalAssignRole from './ModalAssignRole';

interface IProps {
    filters: any;
    setFilters: any;
    setSwitchGetUsers: React.Dispatch<React.SetStateAction<boolean>>;
    switchGetUsers: boolean;
}

const TableUser: FC<IProps> = ({ filters, setFilters, setSwitchGetUsers, switchGetUsers }) => {
    const users: any[] = useSelector((store: any) => store.user.list_users.value);
    const loading: boolean = useSelector((store: any) => store.user.list_users.loading);
    const { total }: any = useSelector((store: any) => store.user.list_users.pagination);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        get_users();
    }, [switchGetUsers]);
    const get_users = async () => {
        await dispatch(actions.get_list_users(filters));
    };

    const change_page = (page: number, pageSize?: number) => {
        setFilters({
            page,
            page_size: pageSize || 10,
        });
        dispatch(actions.get_list_users({ page, page_size: pageSize, ...filters }));
    };

    const table_columns: any = [
        {
            title: 'No.',
            dataIndex: 'id',
            align: 'left' as 'left',
            render: (data: any, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: 'Nombre completo',
            dataIndex: 'use_email',
            align: 'left' as 'left',
        },
        {
            title: 'Usuario',
            dataIndex: 'use_id',
            align: 'left' as 'left',
        },
        {
            title: 'Rol asignado',
            dataIndex: 'use_role',
            align: 'left' as 'left',
            render: (role: { id: number; rol_name: string }) => {
                return role.rol_name.toLocaleLowerCase();
            },
        },
        {
            title: 'Acciones',
            align: 'center' as 'center',
            dataIndex: 'use_id',
            // fixed: 'right',
            render: (id: number) => {
                return (
                    <ModalAssignRole
                        switchGetUsers={switchGetUsers}
                        setSwitchGetUsers={setSwitchGetUsers}
                        id={id}
                        type="change"
                    />
                );
            },
        },
    ];
    return (
        <>
            <Table
                title="Usuarios con roles asignados"
                paginationTop
                change_page={change_page}
                columns={table_columns}
                items={users}
                with_pagination
                count={total}
                loading={loading}
            />
        </>
    );
};

export default TableUser;
