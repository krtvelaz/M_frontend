import { Card, Table } from '../../../utils/ui';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';


const TableInfoPostulation = () => {

    const postulation = useSelector((store: any) => store.postulation.detail_postulation.value)

    const table_columns = [
        {
            title: 'No.',
            fixed: 'left',
            align: 'center' as 'center',
            render: (data: any, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: 'Nombre y apellidos',
            dataIndex: 'gruint_names',
            align: 'left' as 'left',
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
            title: 'No de Documento',
            dataIndex: 'gruint_document',
            align: 'left' as 'left',
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
            title: 'Discapacitado',
            dataIndex: 'gruint_disability',
            align: 'left' as 'left',
            render: (value: boolean) => {
                return value ? 'Si' : 'No'
            },
        },
        {
            title: 'Sexo',
            dataIndex: 'gruint_sex',
            align: 'left' as 'left',
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
            title: 'Orientación Sexual',
            dataIndex: 'gruint_orientation_sexual',
            align: 'left' as 'left',
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
            title: 'Identidad de Genero',
            dataIndex: 'gruint_identity',
            align: 'left' as 'left',
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
            title: 'Etnia',
            dataIndex: 'gruint_ethnicity',
            align: 'left' as 'left',
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
    ];
    return (
        <div className="row" style={{ width: '100%', display: 'contents' }}>
            <Card>
                <Table
                    title="Listado de postulaciones"
                    columns={table_columns}
                    items={postulation?.members_info}
                    with_pagination
                />
            </Card>
        </div>
    );
};

export default TableInfoPostulation;
