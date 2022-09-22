import moment from 'moment';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { trash } from '../../../../utils/assets/img';
import WatchComponent from '../../../../utils/assets/img/WatchComponent';
import { ModalDetailDocument, swal_error, Table } from '../../../../utils/ui';
import { Informe } from '../../custom_types';
import { actions } from '../../redux';
import ModalEditReport from './ModalEditReport';

interface TablePros {
    reports: Informe[];
    onDelete: (index: number) => void;
    onEdit: (values: Informe) => void;
    loading: boolean;
    count: number;
}

const TableReport: FC<TablePros> = ({ onEdit, reports, onDelete, count, loading }) => {
    const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const dispatch = useDispatch<any>();

    const change_page = (page: number, pageSize?: number) => {
        dispatch(actions.get_list_challenge_report(2, { page, pageSize }));
    };

    const table_columns: any = [
        {
            title: 'No.',
            align: 'left' as 'left',
            render: (data: Informe, values: any, i: number) => {
                return i + 1;
            },
        },
        {
            title: 'Título del informe',
            dataIndex: 'retinf_nombre',
            align: 'left' as 'left',
        },
        {
            title: 'Nombre de documento adjunto',
            dataIndex: 'retinf_nombre_archivo',
            align: 'left' as 'left',
        },
        {
            title: 'Fecha',
            dataIndex: 'retinf_creado',
            align: 'left' as 'left',
            render: (date: string) => {
                return moment(new Date(date)).zone(120).format('DD/MM/YYYY');
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
                                        const res = await dispatch(actions.get_document(id, 'report'));
                                        if (res) {
                                            const _url = URL.createObjectURL(
                                                new Blob([res], {
                                                    type: 'application/pdf',
                                                })
                                            );

                                            setUrl(_url);
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
                    render: (values: Informe, data: Informe) => {
                        return <ModalEditReport report={values} onEdit={onEdit} />;
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
                                        title: 'Eliminar documento',
                                        html:
                                            '<div class="mysubtitle">Se eliminará el documento seleccionado</div>' +
                                            '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                                        showCancelButton: false,
                                        showDenyButton: true,
                                        confirmButtonText: 'Aceptar',
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
            <ModalDetailDocument open={is_visibleDoc} setOpen={set_is_visible_doc} url={url} />
            <Table
                columns={table_columns}
                items={reports}
                with_pagination
                change_page={change_page}
                count={count}
                loading={loading}
                paginationTop
            />
        </>
    );
};

export default TableReport;
