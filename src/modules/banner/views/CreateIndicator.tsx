import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrowsFromLine } from '../../../utils/assets/img';
import { Card } from '../../../utils/ui';
import DragDropTable from '../components/DragDropTable';
import ModalEditStatistics from '../components/statistics/ModalEditStatistics';
import { IIndicator } from '../custom_types';
import { actions } from '../redux';

const CreateIndicator = () => {
    const dispatch = useDispatch<any>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const statistics: any[] = useSelector((store: any) => store.banner.statistics.value);
    const [data, setData] = useState<any>([]);
    const loading: boolean = useSelector((store: any) => store.banner.statistics.loading);

    const table_columns: any = [
        {
            title: 'No.',
            dataIndex: 'sta_order',
            align: 'center' as 'center',
            render: () => {
                return (
                    <div className="">
                        <img src={arrowsFromLine} alt="drag and drop image" />
                    </div>
                );
            },
        },
        {
            title: 'Nombre',
            align: 'left' as 'left',
            render: (data: any) => {
                return (
                    <div style={{ fontFamily: 'Montserrat-SemiBold' }}>
                        {data?.sta_name}: <span>{data?.sta_value}</span> - Descripción:{' '}
                        <span> {data?.sta_description}</span>
                    </div>
                );
            },
        },
        {
            title: 'Acciones',
            fixed: 'value',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    align: 'center' as 'center',
                    render: (value: IIndicator) => {
                        return <ModalEditStatistics data={value} on_submit={editIndicator} />;
                    },
                },
            ],
        },
    ];

    const editIndicator = async (values: IIndicator) => {
        await dispatch(actions.edit_statistics(values));
        setIsSuccess(true);
    };

    useEffect(() => {
        dispatch(actions.get_statistics({ page: 1, page_size: 4, order_by_key: 'sta_order', order_by_value: 'asc' }));
    }, []);

    useEffect(() => {
        if (Array.isArray(statistics)) {
            setData(statistics);
        }
    }, [statistics]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                actions.get_statistics({ page: 1, page_size: 4, order_by_key: 'sta_order', order_by_value: 'asc' })
            );
            setIsSuccess(false);
        }
    }, [isSuccess]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div style={{ fontSize: '14px', fontFamily: 'Montserrat-SemiBold' }} className="mb-3 ms-5">
                    Estadísticas
                </div>
                <div className="col-md-12">
                    <Card
                        title={
                            <>
                                <div style={{ fontSize: '14px' }}>
                                    Lista de Estadísticas{' '}
                                    <span>- Arrastre la estadística para cambiar el orden de visualización</span>
                                </div>
                            </>
                        }
                    >
                        <DragDropTable
                            className="table-drag-drop"
                            _columns={table_columns}
                            data={data}
                            setData={setData}
                            loading={loading}
                            edit={async () => {
                                const newdata = data?.map((d: any, i: number) => {
                                    return (d = {
                                        id: d.id,
                                        sta_order: i + 1,
                                    });
                                });
                                await dispatch(actions.edit_order_statistics(newdata));
                                await dispatch(
                                    actions.get_statistics({
                                        page: 1,
                                        page_size: 4,
                                        order_by_key: 'sta_order',
                                        order_by_value: 'asc',
                                    })
                                );
                            }}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateIndicator;
