import { FC, useState } from 'react';
import { Table } from '../../../utils/ui';
import { Button, Modal, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { descargaImg } from '../../../utils/assets/img';
import WatchComponent from '../../../utils/assets/img/WatchComponent';
import fileDownload from 'js-file-download';

interface TablePros {
    title: string;
    type: 'admin' | 'tecnic';
}

const TableDocsPostulation: FC<TablePros> = ({ title, type }) => {
    const [viewPdf, setViewPdf] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const postulation = useSelector((store: any) => store.postulation.detail_postulation.value);

    const close = () => {
        setModalOpen(false);
    };
    const dispatch = useDispatch<any>();

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
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (data: any) => {
                        const previewFile = async () => {
                            const petition = await dispatch(actions.get__documentDownload(data.posarc_id));
                            const PdfFail = new Blob([petition], { type: 'application/pdf' });
                            const url = URL.createObjectURL(PdfFail);
                            setViewPdf(url);
                        };
                        return (
                            <>
                                <WatchComponent
                                    on_click={async () => {
                                        setModalOpen(true);
                                        previewFile();
                                    }}
                                />
                            </>
                        );
                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Descargar</span>,
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (data: any) => {
                        const DownloadFile = async () => {
                            const petition = await dispatch(actions.get__documentDownload(data.posarc_id));
                            fileDownload(petition, data.posarc_path_file);
                        };
                        return (
                            <div>
                                <img
                                    src={descargaImg}
                                    className="img-fluid"
                                    alt=""
                                    style={{ cursor: 'pointer' }}
                                    onClick={async () => {
                                        DownloadFile();
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
            <Modal
                className="ant-modal-close-x2"
                visible={modalOpen}
                title={`Previsualización: `}
                width={1000}
                onCancel={close}
                footer={[
                    <Button key="B_CERRAR_1" className="button-gray-ghost m-0" onClick={close}>
                        Cerrar
                    </Button>,
                ]}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div>{viewPdf && <embed src={`${viewPdf}#toolbar=0`} width="100%" height="375px" />}</div>
            </Modal>
            <span style={{ padding: '2% 0% 2% 1%', fontWeight: 'bold', color: '#000000', fontSize: '14px' }}>
                {title}
            </span>
            {type === 'tecnic' ? (
                postulation?.documents_info?.filter((item: any) => item.rettipdoc_type_form === 2).length > 0 ? (
                    <Table
                        columns={table_columns}
                        items={postulation?.documents_info?.filter((item: any) => item.rettipdoc_type_form === 2)}
                        with_pagination={false}
                    />
                ) : (
                    <div className="m-3">No hay resultados...</div>
                )
            ) : postulation?.documents_info?.filter((item: any) => item.rettipdoc_type_form === 3).length > 0 ? (
                <Table
                    columns={table_columns}
                    items={postulation?.documents_info?.filter((item: any) => item.rettipdoc_type_form === 3)}
                    with_pagination={false}
                />
            ) : (
                <div className="m-3">No hay resultados...</div>
            )}
        </>
    );
};

export default TableDocsPostulation;
