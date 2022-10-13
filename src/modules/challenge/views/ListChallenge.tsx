import { Popover, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trash } from '../../../utils/assets/img';
import { Card, Link, swal_error, Table } from '../../../utils/ui';
import { actions } from '../redux';
import moment from 'moment';
import PencilComponent from '../../../utils/assets/img/PencilComponent';

const ListChallenge = () => {
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
    });

    const change_page = (page: number, pageSize?: number) => {
        setFilters({ page, pageSize: pageSize || 10 });
        dispatch(actions.get_list_challenges({page, page_size: pageSize}));
    };

    const table_columns: any = [
        {
            title: 'No.',
            fixed: 'left',
            dataIndex: 'id',
            align: 'center' as 'center',
        },
        {
            title: 'Conv.',
            fixed: 'left',
            dataIndex: 'cha_announcement',
            align: 'center' as 'center',
        },
        {
            title: 'Nombre del reto',
            fixed: 'left',
            dataIndex: 'cha_name',
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
            title: 'Creado por',
            dataIndex: 'createdBy',
            align: 'left' as 'left',
            render: (value: string) => {
                return 'Luisa Sánchez';
                // return moment(value).format('DD / MM / YYYY');
            },
        },
        {
            title: 'Publicado',
            align: 'left' as 'left',
            render: (value: any) => {
                const onChange = async (e: any) => {
                    // if (
                    //     value.status !== 'Pendiente' &&
                    //     value.status !== 'Aceptado' &&
                    //     value.status !== 'Publicado' &&
                    //     value.status !== 'Postulado'
                    // ) {
                    //     swal_error.fire({
                    //         title: 'Está función no se puede realizar por el momento',
                    //         html:
                    //             '<div class="mysubtitle">El reto no cumple con todos los parámetros necesarios</div>' +
                    //             '<div class="mytext">Por favor, termina de crear el reto</div>',
                    //         showCancelButton: false,
                    //         confirmButtonText: 'Aceptar',
                    //     });
                    //     return;
                    // }
                    if(
                        value.cha_status !== 2 &&
                        value.cha_status !== 3 &&
                        value.cha_status !== 5 
                        // value.cha_status !== 'Postulado'
                    ) {
                        swal_error.fire({
                            title: 'Está función no se puede realizar por el momento',
                            html:
                                '<div class="mysubtitle">El reto no cumple con todos los parámetros necesarios</div>' +
                                '<div class="mytext">Por favor, termina de crear el reto</div>',
                            showCancelButton: false,
                            confirmButtonText: 'Aceptar',
                        });
                        return;
                    }

                    if (e.target.value === true) {
                        await dispatch(actions.publish_challenge(value.id));
                    } else {
                        await dispatch(actions.unpublish_challenge(value.id));
                    }
                    await dispatch(actions.get_list_challenges({page: filters.page, page_size: filters.pageSize}));
                };

                return (
                    <Radio.Group onChange={onChange} value={value.cha_status === 5 ? true : false}>
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                );
            },
        },
        {
            title: 'Fecha inicio',
            dataIndex: 'cha_start_date',
            align: 'left' as 'left',
            render: (value: string) => {
                return moment(value).format('DD / MM / YYYY');
            },
        },
        {
            title: 'Fecha cierre',
            dataIndex: 'cha_end_date',
            align: 'left' as 'left',
            render: (value: string) => {
                return moment(value).format('DD / MM / YYYY');
            },
        },
        {
            title: 'Acciones',
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    dataIndex: 'id',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (id: string) => {
                        return (
                            <Link
                                to={`/challenge/edit/${id}/`}
                                name=""
                                avatar={false}
                                icon={<PencilComponent />}
                            />
                        );
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Eliminar</span>,
                    fixed: 'right',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id: number) => {
                        return (
                            <img
                                src={trash}
                                className="img-fluid"
                                alt=""
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    const result = await swal_error.fire({
                                        title: 'Eliminar elemento',
                                        html:
                                            '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                                            '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                                        showCancelButton: false,
                                        showDenyButton: true,
                                        confirmButtonText: 'Sí, eliminar',
                                        denyButtonText: `Cancelar`,
                                    });
                                    if (result.isConfirmed) {
                                        await dispatch(actions.delete_challenge(id));
                                        await dispatch(actions.get_list_challenges());
                                    }
                                }}
                            />
                        );
                    },
                },
            ],
        },
    ];

    const dispatch = useDispatch<any>();
    const challenges = useSelector((store: any) => store.challenge.challenges.value);
    const { total } = useSelector((store: any) => store.challenge.challenges.pagination);
    const loading = useSelector((store: any) => store.challenge.challenges.loading);

    useEffect(() => {
        dispatch(actions.get_list_challenges({page: 1, page_size:10}));
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">Gestionar retos</h5>
                        <div
                            style={{
                                margin: '0 20px 10px 0',
                            }}
                            className="col d-flex justify-content-end"
                        >
                            <Link to="/challenge/create" name="Crear reto" iconText="+" />
                        </div>
                    </div>

                    <Card>
                        <Table
                            columns={table_columns}
                            title="Lista de retos"
                            paginationTop
                            items={challenges}
                            change_page={change_page}
                            count={total}
                            with_pagination
                            loading={loading}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListChallenge;
