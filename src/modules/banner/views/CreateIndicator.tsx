import { FormikProps, FormikValues } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from '../../../utils/ui';
import DragDropTable from '../components/DragDropTable';
import FormIndicator from '../components/statistics/FormIndicator';
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
            fixed: 'left',
            dataIndex: 'sta_order',
            align: 'center' as 'center',
        },
        {
            title: 'Nombre',
            dataIndex: 'sta_name',
            align: 'left' as 'left',
        },
        {
            title: 'Valor',
            dataIndex: 'sta_value',
            align: 'left' as 'left',
        },
        {
            title: 'Descripción',
            dataIndex: 'sta_description',
            align: 'left' as 'left',
        },
        {
            title: 'Acciones',
            fixed: 'value',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Editar</span>,
                    fixed: 'right',
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
        dispatch(actions.get_statistics({page: 1, page_size: 4, order_by_key: 'sta_order', order_by_value: 'asc' }));
    }, []);

    useEffect(() => {
        if(Array.isArray(statistics)){
            setData(statistics)
        }
    }, [statistics]);


    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.get_statistics({page: 1, page_size: 4, order_by_key: 'sta_order', order_by_value: 'asc' }));
            setIsSuccess(false);
        }
    }, [isSuccess]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">Estadísticas</h5>
                    </div>

                    <Card>
                        <DragDropTable
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
                                await dispatch(actions.edit_order_statistics(newdata))
                                await  dispatch(actions.get_statistics({page: 1, page_size: 4, order_by_key: 'sta_order', order_by_value: 'asc' }));
                               
                            }}
                        />
                        
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateIndicator;
