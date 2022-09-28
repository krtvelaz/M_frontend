import { FC, useEffect, useState } from 'react';
import { Card, Table, swal_error } from '../../../utils/ui';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';

import { trash } from '../../../utils/assets/img';
import WatchComponent from '../../../utils/assets/img/WatchComponent';
import Item from 'antd/lib/list/Item';
import fileDownload from 'js-file-download';

interface TablePros {
    title: string;
    type: 'admin' | 'tecnic';
    idPos?: number;
}

const TableDocsPostulation: FC<TablePros> = ({ title, idPos }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { id } = useParams<any>();
    const dispatch = useDispatch<any>();
    const infoPosutlationsetail = useSelector((store: any) => store.postulation.detail_postulation.value);
    const infoDocsTec = infoPosutlationsetail[0].documents_info.filter((item: any) => item.rettipdoc_type_form === 2);
    const infoDocsAdmins = infoPosutlationsetail[0].documents_info.filter(
        (item: any) => item.rettipdoc_type_form === 3
    );

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
            title: 'Tipo de documento',
            dataIndex: 'rettipdoc_name',
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
            title: 'Nombre',
            dataIndex: 'posarc_name_file',
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
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Ver</span>,
                    dataIndex: 'id',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (id: string) => {
                        return <WatchComponent />;
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Descargar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (data: any) => {
                        console.log('data', data);
                        const DownloadFile = async () => {
                            const petition = await dispatch(actions.get__documentDownload(data.posarc_id));
                            console.log('respuesta', data);
                            fileDownload(petition, data.posarc_path_file);
                        };
                        return (
                            <div>
                                <img
                                    src={trash}
                                    className="img-fluid"
                                    alt=""
                                    style={{ cursor: 'pointer' }}
                                    onClick={async () => {
                                        DownloadFile();
                                        // const result = await swal_error.fire({
                                        //     title: 'Eliminar elemento',
                                        //     html:
                                        //         '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                                        //         '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                                        //     showCancelButton: false,
                                        //     showDenyButton: true,
                                        //     confirmButtonText: 'Sí, eliminar',
                                        //     denyButtonText: `Cancelar`,
                                        // });
                                    }}
                                />
                            </div>
                        );
                    },
                },
            ],
        },
    ];
    return (
        <>
            <span style={{ padding: '2% 0% 2% 1%', fontWeight: 'bold', color: '#000000', fontSize: '14px' }}>
                {title}
            </span>
            {title === 'Documentos técnicos' ? (
                <Table columns={table_columns} items={infoDocsTec} with_pagination={false} />
            ) : (
                <Table columns={table_columns} items={infoDocsAdmins} with_pagination={false} />
            )}
        </>
    );
};

export default TableDocsPostulation;
