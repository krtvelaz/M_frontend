import { Popover } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trash } from '../../../../utils/assets/img';
import { swal_error } from '../../../../utils/ui';
import { ITestimony } from '../../custom_types';
import { actions } from '../../redux';
import DragDropTable from '../DragDropTable';
import ModalEditTestimony from './ModalEditTestimony';
import ModalImgTestimony from './ModalImgTestimony';

interface IListTestimony {
    testimonials: ITestimony[];
    onEdit: (values: ITestimony) => any;
    onDelete: (index: number) => void;
}

const ListTestimony: FC<IListTestimony> = ({ testimonials, onEdit, onDelete }) => {
    const [data, setData] = useState([...testimonials]);
    const loading: boolean = useSelector((store: any) => store.banner.testimonials.loading);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        setData(testimonials);
    }, [testimonials]);

    const table_columns = [
        {
            title: 'No.',
            align: 'center' as 'center',
            render: (datos: any, datos2: any, index: number) => {
                return index + 1;
            }
        },
        {
            title: 'Título',
            dataIndex: 'tes_title',
            align: 'left' as 'left',
            render: (value: string) => {
                return (
                    value &&
                    (value.length > 24 ? (
                        <Popover style={{ width: '200px' }} content={value} trigger="click">
                            <span style={{ cursor: 'pointer' }} className="popover-span">{`${value.substring(
                                0,
                                22
                            )}...`}</span>
                        </Popover>
                    ) : (
                        value
                    ))
                );
            },
        },
        {
            title: 'Descripción',
            dataIndex: 'tes_description',
            align: 'left' as 'left',
        },
        {
            title: 'Imagen Empresario',
            dataIndex: 'tes_image_name',
            align: 'left' as 'left',
        },
        {
            title: 'Imagen Logo',
            dataIndex: 'tes_logo_name',
            align: 'left' as 'left',
        },
        {
            title: 'Acciones',
            fixed: 'right',
            children: [
                {
                    title: (
                        <span
                            style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: '9px',
                                paddingBottom: '0px',
                            }}
                        >
                            ver
                        </span>
                    ),
                    fixed: 'right',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id: number) => {
                        return <ModalImgTestimony id={id} />;
                    },
                },
                {
                    title: <span style={{ fontFamily: 'Montserrat-Regular', fontSize: '9px' }}>Editar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (values: any, id: number) => {
                        return <ModalEditTestimony onSubmit={onEdit} testimony={values} />;
                    },
                },
                {
                    title: <span style={{ fontFamily: 'Montserrat-Regular', fontSize: '9px' }}>Eliminar</span>,
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
        <>
            <DragDropTable
                _columns={table_columns}
                data={data}
                setData={setData}
                loading={loading}
                edit={async () => {
                    const newdata = data?.map((d, i: number) => {
                        return (d = {
                            ...d,
                            tes_order: i + 1,
                        });
                    });
                    await Promise.all(newdata?.map((result: any) => dispatch(actions.edit_testimonial(result, true))));
                    const res = await dispatch(
                        actions.get_list_testimonials({
                            page: 1,
                            page_size: 4,
                            order_by_key: 'tes_order',
                            order_by_value: 'asc',
                        })
                    );
                    return res;
                }}
            />
            {/* <Table loading={loading} columns={table_columns} items={data} with_pagination={false} /> */}
        </>
    );
};

export default ListTestimony;
