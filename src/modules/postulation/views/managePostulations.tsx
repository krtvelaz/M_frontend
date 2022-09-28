import { useEffect, useState } from 'react';
import { Card, Table } from '../../../utils/ui';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import ModalInfoPostulations from '../components/ModalInfoPostulations';
import PostulationsFilter from '../components/PostulationsFilter';

const managePostulations = () => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => {
        set_is_visible(true);
    };
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const infoPosutlations = useSelector((store: any) => store.postulation.inforPostulation.value);
    console.log(infoPosutlations);
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
            dataIndex: 'conv.',
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
                        value
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
                        value
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
                        value
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
                    dataIndex: 'id_postulation',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (id_postulation: number) => {
                        return <ModalInfoPostulations onSubmit={OpenModal} id={id_postulation} />;
                    },
                },
            ],
        },
    ];
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <h5 className="col d-flex justify-content-start mb-3">Gestionar Postulaciones a Retos</h5>

                    <Card
                        title={'Buscar Reto'}
                        actions={[
                            <div className="d-flex flex-row justify-content-end my-3">
                                <button className="btn me-3" style={{ color: '#1D98D1' }}>
                                    Limpiar filtros
                                </button>
                                <button key="saveDoc" type="button" className="btn btn-primary me-4">
                                    Buscar
                                </button>
                            </div>,
                        ]}
                    >
                        <PostulationsFilter />
                    </Card>

                    <Card>
                        <Table
                            title="Listado de postulaciones"
                            columns={table_columns}
                            paginationTop
                            items={infoPosutlations}
                            change_page={change_page}
                            with_pagination
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default managePostulations;
