import { FC, useEffect, useState } from 'react';
import { Card, Table } from '../../../utils/ui';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../redux';

interface TableInfoPostulationPros {
    infoPost?: any;
}

const TableInfoPostulation: FC<TableInfoPostulationPros> = ({ infoPost }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { id } = useParams<any>();
    const dispatch = useDispatch<any>();

    const challenges = useSelector((store: any) => store.challenge.challenges.value);
    const { total } = useSelector((store: any) => store.challenge.challenges.pagination);
    const loading = useSelector((store: any) => store.challenge.challenges.loading);
    const infoPosutlationsetail = useSelector((store: any) => store.postulation.detail_postulation.value);
    const infoGeneralGroup = infoPosutlationsetail[0]?.members_info.map((item: any) => ({
        gruint_disability: item.gruint_disability === true ? 'Si' : 'No',
        gruint_document: item.gruint_document,
        gruint_ethnicity: item.gruint_ethnicity,
        gruint_identity: item.gruint_identity,
        gruint_names: item.gruint_names,
        gruint_orientation_sexual: item.gruint_orientation_sexual,
        gruint_sex: item.gruint_sex,
    }));
    const infoGroupPostulation = async () => {
        await dispatch(actions.get__postulationInfoDetail(infoPost));
    };
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
    });
    useEffect(() => {
        infoGroupPostulation();
    }, []);

    const OpenModal = () => {
        setModalOpen(true);
    };

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
                    items={infoGeneralGroup}
                    with_pagination
                />
            </Card>
        </div>
    );
};

export default TableInfoPostulation;
