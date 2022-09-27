import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trash } from '../../../utils/assets/img';
import WatchComponent from '../../../utils/assets/img/WatchComponent';
import { ModalDetailDocument, swal_error, Table } from '../../../utils/ui';
import { IGalleryInfo, IPublication } from '../custom_types';
import { actions } from '../redux';
import ModalEditGallery from './ModalEditGallery';
import { Buffer } from 'buffer';

interface IGalleryProps {
    images: IGalleryInfo[];
    onEdit: (values: IGalleryInfo) => any;
    onDelete: (id: number) => any;
    publication: IPublication;
}

const ListGallery: FC<IGalleryProps> = ({ images, onEdit, onDelete, publication }) => {
    const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [list_gallery, set_list_gallery] = useState<any[]>([]);
    const dispatch = useDispatch<any>();
    const loading = useSelector((store: any) => store.publication.list_gallery.loading);

    useEffect(() => {
        const gallery = images.filter((publication) => publication !== null && publication !== undefined );
        set_list_gallery(gallery);
    }, [images]);

    const table_columns = [
        {
            title: 'No.',
            align: 'center' as 'center',
            render: (data: any, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: 'Título',
            dataIndex: 'pubfil_title',
            align: 'left' as 'left',
        },
        {
            title: 'Descripción',
            dataIndex: 'pubfil_description',
            align: 'left' as 'left',
        },
        {
            title: 'Imagen',
            dataIndex: 'pubfil_name',
            responsive: ['md'],
            align: 'left' as 'left',
            render: (name: string) => {
                return `${name}.jpg`;
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
                            <>
                                <WatchComponent
                                    on_click={async () => {
                                        const res = await dispatch(actions.get_image_gallery(id || -1));
                                        if (res) {
                                            let _img = Buffer.from(res).toString('base64');

                                            setUrl(_img);
                                            set_is_visible_doc(true);
                                        }
                                    }}
                                />
                            </>
                        );
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (values: IGalleryInfo, data: any, index: number) => {
                        return <ModalEditGallery onSubmit={(publication) => onEdit(publication)} gallery={values} />;
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
            <Table columns={table_columns} items={list_gallery} with_pagination={false} loading={loading} />
            <ModalDetailDocument open={is_visibleDoc} setOpen={set_is_visible_doc} url={url} fileType="img" />
        </>
    );
};

export default ListGallery;
