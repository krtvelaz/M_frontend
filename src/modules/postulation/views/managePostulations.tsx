import { useEffect, useState } from 'react';
import { Card, Table } from '../../../utils/ui';
import { Button, Modal, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import ModalInfoPostulations from '../components/ModalInfoPostulations';
import PostulationsFilter from '../components/PostulationsFilter';
import { Formik } from 'formik';
import { ModalExportData } from '../components/ModalExportData';
import moment from 'moment';
const managePostulations = () => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [colorState, setColorState] = useState<boolean>(false);
    const open = () => {
        set_is_visible(true);
    };
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [infoModaL, setInfoModaL] = useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const infoPosutlations = useSelector((store: any) => store.postulation.inforPostulation.value);
    const infoPosutlationsFilter = useSelector((store: any) => store.postulation.searchPostulations.value);
    const inforPostFilterData = infoPosutlationsFilter?.data;
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
    });
    useEffect(() => {
        dispatch(actions.get__postulationInfo());
    }, []);

    const change_page = (page: number, pageSize?: number) => {
        setFilters({ page, pageSize: pageSize || 10 });
        dispatch(actions.get__postulationInfo());
    };

    const OpenModal = () => {
        setModalOpen(true);
    };
    const OpenModalExportData = () => {
        setInfoModaL(true);
    };
    let className = 'menu';
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
            title: 'Conv.',
            fixed: 'left',
            dataIndex: 'cha_announcement.',
            align: 'left' as 'left',
            render: (data: any, values: any, i: number) => {
                return (i = 1);
            },
        },
        {
            title: 'Nombre del reto',
            dataIndex: 'cha_name',
            fixed: 'left',
            align: 'left' as 'left',
            render: (value: string) => {
                return (
                    value &&
                    (value.length > 65 ? (
                        <Popover content={value}>
                            <span style={{ cursor: 'pointer' }} className="popover-span">
                                {`${value.substring(0, 64)}...`}
                            </span>
                        </Popover>
                    ) : (
                        value
                    ))
                );
            },
        },
        {
            title: 'Estado',
            dataIndex: 'pos_status',
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
                        <span
                            style={
                                value === 'REVISADO'
                                    ? { color: '#29740B', fontWeight: 'bold' }
                                    : value === 'FINALIZADO'
                                    ? { color: '#F28C02', fontWeight: 'bold' }
                                    : {}
                            }
                        >
                            {value}
                        </span>
                    ))
                );
            },
        },
        {
            title: 'Nombre del postulante',
            dataIndex: 'pos_business_name',
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
            title: 'Código del postulante',
            dataIndex: 'pos_documentid',
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
            title: 'Tipo de participante',
            dataIndex: 'pos_id_type_competitor',
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
            title: 'Cód. postulación',
            dataIndex: 'pos_settled',
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
            title: 'Fecha. postulación',
            dataIndex: 'pos_updated_at',
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
                        moment(value).format('YYYY-MM-DD')
                    ))
                );
            },
        },
        {
            title: 'Hora postulación',
            dataIndex: 'pos_updated_at',
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
                        moment(value).format('HH:mm:ss')
                    ))
                );
            },
        },
        {
            title: 'Dimensión',
            dataIndex: 'maedim_name',
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
            title: 'Acciones',
            dataIndex: 'id_postulation',
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (data: any) => {
                        return (
                            // data.pos_status === 'FINALIZADO' ||
                            // (data.pos_status === 'REVISADO' && (
                            <ModalInfoPostulations
                                state={data.pos_status}
                                onSubmit={OpenModal}
                                id={data.id_postulation}
                            />
                            // ))
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
                    <h5
                        className="col d-flex justify-content-start mb-3"
                        style={{ fontSize: '14px', fontFamily: 'Montserrat-SemiBold' }}
                    >
                        Gestionar Postulaciones a Retos
                    </h5>

                    <Card
                        title={
                            <span style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold' }}>
                                {'Buscar reto'}
                            </span>
                        }
                    >
                        <PostulationsFilter />
                    </Card>

                    <Card>
                        <Table
                            title="Lista de retos"
                            columns={table_columns}
                            paginationTop
                            items={infoPosutlations}
                            change_page={change_page}
                            with_pagination
                        />
                        <div style={{ position: 'relative' }}>
                            <button
                                key="saveDoc"
                                type="button"
                                style={{ color: '#1D98D1' }}
                                className="btn me-3"
                                onClick={OpenModalExportData}
                            >
                                Exportar datos
                            </button>

                            <ModalExportData setInfoModaL={setInfoModaL} infoModaL={infoModaL} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default managePostulations;
