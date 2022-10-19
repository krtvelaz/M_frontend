import { Checkbox, Popover } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from '../../../utils/ui';
import actions from '../redux/actions';

const ListNotifications = () => {
    const notifications = useSelector((store: any) => store.notification.notifications.value);
    const loading = useSelector((store: any) => store.notification.notifications.loading);
    const { total } = useSelector((store: any) => store.notification.notifications.pagination);

    const [filters, setFilters] = useState({
        page: 1, page_size: 10, order_by_value: 'desc', 
    });

    const dispacth = useDispatch<any>();
    useEffect(() => {
        dispacth(actions.get_list_notifications(filters))
    }, []);

    const change_page = (page: number, page_size?: number) => {
        setFilters({...filters, page: page, page_size: page_size || 10});
        dispacth(actions.get_list_notifications({...filters, page: page, page_size: page_size}))
    }
    
    const change_read_notification = async (id: number) => {
        await dispacth(actions.status_notification(id))
        await dispacth(actions.get_list_notifications({...filters}))
      };

    const table_columns: any = [
        {
            title: 'No.',
            dataIndex: 'id',
            fixed: 'left',
            align: 'center' as 'center',
            // render: (data: any, values: any, i: number) => {
            //     return i + 1;
            // },
        },
        {
            title: 'Mensaje',
            dataIndex: 'not_message',
            align: 'left' as 'left',
            with: '500px',
            render: (value: string) => {
                return (
                    value &&
                    (value.length > 65 ? (
                        <Popover content={value}>
                            <span style={{ cursor: 'pointer' }} className="popover-span">{`${value.substring(
                                0,
                                64
                            )}...`}</span>
                        </Popover>
                    ) : (
                        value
                    ))
                );
            },
        },
        {
            title: 'No. radicado',
            dataIndex: 'not_located',
        },

        {
            title: 'Fecha',
            dataIndex: 'not_created_at',
            align: 'left' as 'left',
            render: (date: string) => {
                return moment(date).format('DD / MM / YYYY');
            },
        },
        {
            title: 'Acciones',
            fixed: 'right',
            align: 'center' as 'center',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Marcar como leido</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (data: any) => {
                        return (
                            <Checkbox checked={data?.not_readed} onChange={() => change_read_notification(data?.id)}/>
                        );
                    },
                },
            ],
            
        },
    ];

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">Notificaciones</h5>
                    </div>

                    <Card>
                        <Table
                        change_page={change_page}
                            title="Lista de notificaciones"
                            columns={table_columns}
                            items={notifications}
                            paginationTop
                            loading={loading}
                            count={total}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListNotifications;
