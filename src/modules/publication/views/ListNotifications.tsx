import { Popover } from 'antd';
import moment from 'moment';
import { downloadExcel } from 'react-export-table-to-excel';
import { Card, swal_error, Table } from "../../../utils/ui";
import { IEvent } from '../custom_types';

const ListNotifications = () => {

    const dataSource = [
        {
            key: '1',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 05/03/2022',

        },
        {
            key: '2',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 06/03/2022',

        }, {
            key: '3',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 05/03/2022',

        },
        {
            key: '4',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 06/03/2022',

        }, {
            key: '5',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 05/03/2022',

        },
        {
            key: '6',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 06/06/2022',

        }, {
            key: '7',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 05/03/2022',

        },
        {
            key: '8',
            mensaje: 'Un nuevo equipo ha postulado',
            radicado: '00',
            fecha: ' 06/03/2022',

        },

    ];

    const table_columns: any = [
        {
            title: "No.",
            dataIndex: "key",
            fixed: "left",
            align: "center" as "center",
            render: (data: IEvent, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: "Mensaje",
            dataIndex: "mensaje",
            align: "left" as "left",
            with: '500px',
            render: (value: string) => {
                return (
                    value &&
                    (value.length > 65 ? (
                        <Popover content={value}>
                            <span
                                style={{ cursor: "pointer" }}
                                className="popover-span"
                            >{`${value.substring(0, 64)}...`}</span>
                        </Popover>
                    ) : (
                        value
                    ))
                );
            },
        },
        {
            title: "No. radicado",
            dataIndex: "radicado",
            align: "left" as "left",
            render: (data: IEvent, values: any, i: number) => {
                return '000' + i;
            },
        },

        {
            title: "Fecha",
            dataIndex: "fecha",
            align: "left" as "left",
            render: (date: string) => {
                return moment(date).format("DD / MM / YYYY")
            },
        },

    ];




    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">
                        Notificaciones
                        </h5>

                    </div>

                    <Card>
                        <Table
                            title='Lista de notificaciones'
                            columns={table_columns}
                            items={dataSource}
                            paginationTop
                        />
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default ListNotifications