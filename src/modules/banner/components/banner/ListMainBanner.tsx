import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { trash } from '../../../../utils/assets/img';
import { swal_error, Table } from '../../../../utils/ui';
import ModalDetailDocument from '../../../../utils/ui/ModalDetailDocument';
import { IMainBanner } from '../../custom_types';
import { actions } from '../../redux';
import ModalEditMainBanner from './ModalEditMainBanner';
import { Buffer } from 'buffer/';
import DragDropTable from '../DragDropTable';
import WatchComponent from '../../../../utils/assets/img/WatchComponent';

interface BannerFormPros {
    banners: IMainBanner[];
    loading: boolean;
    onEdit: (values: IMainBanner) => any;
    onDelete: (id: number) => any;
}

const ListMainBanner: FC<BannerFormPros> = ({ banners, onEdit, onDelete, loading }) => {
    const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [data, setData] = useState(banners);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        setData(banners)
    }, [banners]);

    const table_columns: any = [
        {
            title: 'No.',
            align: 'center' as 'center',
            render: (datos: any, datos2: any, index: number) => {
                return index + 1;
            }
        },
        {
            title: 'Título',
            dataIndex: 'ban_title',
            align: 'left' as 'left',
        },
        {
            title: 'Descripción',
            dataIndex: 'ban_description',
            align: 'left' as 'left',
        },
        {
            title: 'Imagen',
            dataIndex: 'cha_image_name',
            responsive: ['md'],
            align: 'left' as 'left',
            render: (value: File) => {
                return value;
            },
        },
        {
            title: 'Acciones',
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Ver</span>,
                    fixed: 'right',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id: number) => {
                        return (
                            <WatchComponent
                                on_click={async () => {
                                    const res = await dispatch(actions.get_image_banner(id));
                                    if (res) {
                                        let _img = Buffer.from(res).toString('base64');

                                        setUrl(_img);
                                        set_is_visible_doc(true);
                                    }
                                }}
                            />
                        );
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (values: any) => {
                        return <ModalEditMainBanner onSubmit={onEdit} value={values} />;
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Eliminar</span>,
                    dataIndex: 'id',
                    fixed: 'right',
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
                            ban_order: i + 1,
                        });
                    });
                    await Promise.all(newdata?.map((result: any) => dispatch(actions.edit_banner(result, true))));
                    const res = await dispatch(
                        actions.get_list_banners({
                            page: 1,
                            page_size: 4,
                            order_by_key: 'ban_order',
                            order_by_value: 'asc',
                        })
                    );
                    return res;
                }}
            />
            <ModalDetailDocument open={is_visibleDoc} setOpen={set_is_visible_doc} url={url} fileType="img" />
        </>
    );
};

export default ListMainBanner;
