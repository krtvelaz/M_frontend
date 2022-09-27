import { Popover } from 'antd';
import moment from 'moment';
import { downloadExcel } from 'react-export-table-to-excel';
import { Card, Table } from "../../../utils/ui";
import ModalExport from '../compenents/bulletin/ModalExport';
import { IEvent } from '../custom_types';

const ListNewsletters = () => {

    const dataSource = [
        {
            key: '1',
            email: 'micorreoconnombrelargo@midominio.com',
            fecha: ' 05/03/2023',

        },
        {
            key: '2',
            email: 'Will@gmail.com',
            fecha: ' 06/03/2023',

        }, {
            key: '3',
            email: 'Mike@gmail.com',
            fecha: ' 05/03/2023',

        },
        {
            key: '4',
            email: 'Will@gmail.com',
            fecha: ' 06/03/2023',

        }, {
            key: '5',
            email: 'Mike@gmail.com',
            fecha: ' 05/03/2023',

        },
        {
            key: '6',
            email: 'Will@gmail.com',
            fecha: ' 06/03/2023',

        }, {
            key: '7',
            email: 'Mike@gmail.com',
            fecha: ' 05/03/2023',

        },
        {
            key: '8',
            email: 'Will@gmail.com',
            fecha: ' 06/03/2023',

        },

    ];

    const table_columns: any = [
        {
            title: "No.",
            fixed: "left",
            align: "center" as "center",
            render: (data: IEvent, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: "Correo electrónico",
            dataIndex: "email",
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
            title: "Fecha",
            dataIndex: "fecha",
            align: "left" as "left",
            render: (date: string) => {
                return moment(date).format("DD / MM / YYYY")
            },
        },
    ];



    const handleDownloadExcel = () => {
        downloadExcel({
            fileName: "Tabla-inscritos-boletines",
            sheet: "Boletines",
            tablePayload: {
                header: ['id', 'email', 'fecha'],
                body: dataSource
            }
        });
    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <span style={{fontFamily: 'Montserrat-SemiBold', fontSize: '14px'}} className="col d-flex justify-content-start">
                            Inscripciones a boletines
                        </span>

                    </div>

                    <Card>
                        <Table
                            title='Lista de correos inscritos'
                            columns={table_columns}
                            items={dataSource}
                            paginationTop
                        />
                        <div style={{ position: 'relative', bottom: '49px', textAlign: 'start' }}>
                            {/* <button
                                type="button" className="btn btn-outline-primary"
                                onClick={handleDownloadExcel}
                            >Exportar Datos
                            </button> */}
                            <ModalExport />
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default ListNewsletters;