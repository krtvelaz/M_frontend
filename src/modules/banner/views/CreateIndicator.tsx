import { FormikProps, FormikValues } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from '../../../utils/ui';
import FormIndicator from '../components/statistics/FormIndicator';
import ModalEditStatistics from '../components/statistics/ModalEditStatistics';
import { IIndicator } from '../custom_types';
import { actions } from '../redux';

const CreateIndicator = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const dispatch = useDispatch<any>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const statistics: IIndicator[] = useSelector((store: any) => store.banner.statistics.value);
    const loading: boolean = useSelector((store: any) => store.banner.statistics.loading);

    const table_columns: any = [
        {
            title: 'No.',
            fixed: 'left',
            dataIndex: 'id',
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
                    dataIndex: 'id',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (value: IIndicator) => {
                      return <ModalEditStatistics data={value}/>;
                    }
                },
            ],
        },
    ];

    const addIndicator = async (values: IIndicator) => {
        await dispatch(actions.create_statistics(values));
        setIsSuccess(true);
    };

    useEffect(() => {
        dispatch(actions.get_statistics());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.get_statistics());
            setIsSuccess(false);
        }
    }, [isSuccess]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start">Gestionar Retos</h5>
                        <div
                            style={{
                                margin: '0 20px 10px 0',
                            }}
                            className="col d-flex justify-content-end"
                        >
                            {/* <Link to="/challenge/create" name="Crear Reto" iconText="+" /> */}
                        </div>
                    </div>

                    <Card>
                        <Table
                            columns={table_columns}
                            
                            items={statistics}
                            // change_page={change_page}
                            // count={total}
                            with_pagination
                            loading={loading}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateIndicator;
