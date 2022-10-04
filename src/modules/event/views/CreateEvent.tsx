import { useRef } from 'react';
import { Card } from '../../../utils/ui';
import { IEvent } from '../custom_types';
import { FormikProps, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormEvent from '../compenents/FormEvent';
import { actions } from '../redux';

const CreateEvent = () => {
    const loading: boolean = useSelector((store: any) => store.event.event.loading);
    const navigate = useNavigate();
    const form_ref = useRef<FormikProps<FormikValues>>();
    const dispatch = useDispatch<any>();

    const addEvent = async (values: IEvent) => {
        await dispatch(actions.create_event(values));
        navigate("../event/list", { replace: true });
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5 className="">Crear evento</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title="Detalles nuevo evento" actions={[]}>
                                <FormEvent innerRef={form_ref} onSubmit={addEvent} type="create" />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between  btn-responsive"
                style={{ padding: 16, marginBottom: 60, borderTop: '1px solid #ccc' }}
            >
                <button type="button" className="btn btn-outline-primary" onClick={() => {}}>
                    Atrás
                </button>
                <div className="flex-fill" />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current?.submitForm();
                    }}
                    disabled={loading}
                >
                    Guardar
                    {loading && (
                        <i
                            className="fa fa-circle-o-notch fa-spin"
                            style={{ fontSize: 12, marginLeft: 10, color: '#fff' }}
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateEvent;
