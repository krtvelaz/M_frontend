import { Popover } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from '../../../utils/ui';
import ModalExport from '../compenents/bulletin/ModalExport';
import { IEvent } from '../custom_types';
import { actions } from '../redux';

const ListNewsletters = () => {
    const dispatch = useDispatch<any>();
    const newsletters = useSelector((store: any) => store.event.newsletters.value);
    const loading = useSelector((store: any) => store.event.newsletters.loading);
    const { total } = useSelector((store: any) => store.event.newsletters.pagination);

    const [filters, setFilters] = useState({
        page: 1,
        page_size: 10,
    });

    const get_news_letters = async () => {
        await dispatch(actions.get_list_bulletin(filters));
    };

    const change_page = (page: number, pageSize?: number) => {
        setFilters({
          page,
          page_size: pageSize || 10
        })
        dispatch(actions.get_list_bulletin({page, page_size: pageSize}))
      }

    useEffect(() => {
        get_news_letters();
    }, []);

    const table_columns: any = [
        {
            title: 'No.',
            fixed: 'left',
            dataIndex: 'id',
            align: 'center' as 'center',
            // render: (data: IEvent, values: any, i: number) => {
            //     return i + 1;
            // },
        },
        {
            title: 'Correo electrónico',
            dataIndex: 'sub_email',
            align: 'left' as 'left',
            with: '500px',
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
            title: 'Fecha',
            dataIndex: 'sub_created_at',
            align: 'left' as 'left',
            render: (date: string) => {
                return moment(date).format('DD / MM / YYYY');
            },
        },
    ];

    const handleDownloadExcel = () => {
        downloadExcel({
            fileName: 'Tabla-inscritos-boletines',
            sheet: 'Boletines',
            tablePayload: {
                header: ['id', 'email', 'fecha'],
                body: newsletters,
            },
        });
    };
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <span
                            style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}
                            className="col d-flex justify-content-start"
                        >
                            Inscripciones a boletines
                        </span>
                    </div>

                    <Card>
                        <Table
                            title="Lista de correos inscritos"
                            columns={table_columns}
                            items={newsletters}
                            change_page={change_page}
                            count={total}
                            loading={loading}
                            paginationTop
                        />
                        <div style={{ position: 'relative', bottom: '49px', textAlign: 'start', width:'200px' }}>
                            <ModalExport />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ListNewsletters;
