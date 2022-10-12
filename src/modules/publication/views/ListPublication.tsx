import { Popover, Radio } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trash } from '../../../utils/assets/img';
import PencilComponent from '../../../utils/assets/img/PencilComponent';
import { Card, Link, swal_error, Table } from '../../../utils/ui';
import { IGeneralInfo } from '../custom_types';
import { actions } from '../redux';

const ListPublication = () => {
    const list_publication: IGeneralInfo[] = useSelector((store: any) => store.publication.list_publication.value);
    const { total }: any = useSelector((store: any) => store.publication.list_publication.pagination);
    const loading: any = useSelector((store: any) => store.publication.list_publication.loading);        
    const [isChange, setIsChange] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const onDelete = async (id: number) => {
        await dispatch(actions.delete_publication(id));
        setIsChange(true);
    };
    const getPublications = async () => {
        await dispatch(actions.get_list_publications());
    };
    const change_page = (page: number, page_size?: number) => {
        dispatch(actions.get_list_publications({ page, page_size }));
    };
    const editPublication = async (id: number, values: IGeneralInfo) => {
        await dispatch(actions.edit_publication(/*id ,*/ values));
        setIsChange(true);
    };
    useEffect(() => {
        getPublications();
    }, []);

    useEffect(() => {
        if (isChange) {
            getPublications();
            setIsChange(false);
        }
    }, [isChange]);
    const table_columns: any = [
        {
            title: 'No.',
            fixed: 'left',
            align: 'center' as 'center',
            render: (data: IGeneralInfo, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: 'Nombre',
            dataIndex: 'pub_title',
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
            title: 'Tipo',
            dataIndex: 'pub_type',
            align: 'left' as 'left',
        },
        {
            title: 'Publicada',
            align: 'left' as 'left',
            render: (data: IGeneralInfo) => {              
                
                const onChange = async (e: any) => {                    
                    await dispatch(actions.edit_published_publication(Number(data?.id), e?.target?.value === true ? 'publish' : 'unpublish'));
                    await getPublications();
                };
                
                return (
                    <Radio.Group onChange={onChange} value={data?.pub_status === 'Publicado' ? true : false}>
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                );
            },
        },
        {
            title: 'Creado por',
            dataIndex: 'pub_author',
            align: 'left' as 'left',
        },
        {
            title: 'Fecha publicación',
            dataIndex: 'hec_creado',
            align: 'left' as 'left',
            render: (date: string) => {
                return moment(date).format('DD / MM / YYYY');
            },
        },
        {
            title: 'Acciones',
            dataIndex: 'id',
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    dataIndex: 'id',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (id: number, values: IGeneralInfo) => {
                        return (
                            <Link
                                //  onSubmit={editPublication(id, values)}
                                to={`/publication/edit/${id}/`}
                                name=""
                                avatar={false}
                                icon={ <PencilComponent />}
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
                                        onDelete(id);
                                    }
                                }}
                            />
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
                        <h5 className="col d-flex justify-content-start">Gestionar publicaciones</h5>
                        <div
                            style={{
                                margin: '0 20px 10px 0',
                            }}
                            className="col d-flex justify-content-end"
                        >
                            <Link to="/publication/create" name="Crear Publicación" iconText="+" />
                        </div>
                    </div>

                    <Card>
                        <Table
                            title="Lista de publicaciones"
                            paginationTop
                            columns={table_columns}
                            items={list_publication}
                            change_page={change_page}
                            with_pagination
                            loading={loading}
                            count={total}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListPublication;
