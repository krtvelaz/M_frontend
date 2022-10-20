import { useEffect, useState } from 'react';
import { Card, Table } from '../../../utils/ui';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import ModalInfoPostulations from '../components/ModalInfoPostulations';
import PostulationsFilter from '../components/PostulationsFilter';
import { ModalExportData } from '../components/ModalExportData';
import moment from 'moment';
const managePostulations = () => {
    
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [infoModaL, setInfoModaL] = useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const infoPosutlations = useSelector((store: any) => store.postulation.list_postulations.value);
    const { total } = useSelector((store: any) => store.postulation.list_postulations.pagination);
    const loading = useSelector((store: any) => store.postulation.list_postulations.loading);
   
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
    });

    useEffect(() => {
        dispatch(actions.get_list_postulation({ page: filters.page, page_size: filters.pageSize}));
    }, []);

    const change_page = (page: number, pageSize?: number) => {
        setFilters({ ...filters, page, pageSize: pageSize || 10 });
        dispatch(actions.get_list_postulation({...filters, page: page, page_size: pageSize || 10}));
    };

    const OpenModal = () => {
        setModalOpen(true);
    };
    const OpenModalExportData = () => {
        setInfoModaL(true);
    };

    const table_columns = [
        {
            title: 'No.',
            fixed: 'left',
            dataIndex: 'id',
            align: 'center' as 'center',
            // render: (data: any, values: any, i: number) => {
            //     return i + 1;
            // },
        },
        {
            title: 'Conv.',
            fixed: 'left',
            dataIndex: 'pos_challenge',
            align: 'left' as 'left',
            render: (value: any) => {                
                return value?.cha_announcement
            }
            
        },
        {
            title: 'Nombre del reto',
            dataIndex: 'pos_challenge',
            fixed: 'left',
            align: 'left' as 'left',
            render: (value: any) => {
                return (
                    value?.cha_name &&
                    (value.length > 65 ? (
                        <Popover content={value?.cha_name}>
                            <span style={{ cursor: 'pointer' }} className="popover-span">
                                {`${value?.cha_name.substring(0, 64)}...`}
                            </span>
                        </Popover>
                    ) : (
                        value?.cha_name
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
            
        },
        {
            title: 'Fecha postulación',
            dataIndex: 'pos_updated_at',
            align: 'left' as 'left',
            render: (value: string) => {
                return  moment(value).format('DD / MM / YYYY')
            },
        },
        {
            title: 'Hora postulación',
            dataIndex: 'pos_updated_at',
            align: 'left' as 'left',
            render: (value: string) => {
                return moment(value).format('hh:mm A')
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
            dataIndex: 'id',
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
                                id={data.id}
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
                        <PostulationsFilter setFilters={setFilters} filters={filters} />
                    </Card>

                    <Card>
                        <Table
                            title="Lista de retos"
                            columns={table_columns}
                            paginationTop
                            items={infoPosutlations}
                            change_page={change_page}
                            count={total}
                            loading={loading}
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
