import { ErrorMessage, Select } from '../../../utils/ui';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { FC, useRef } from 'react';
import * as Yup from "yup";

interface IPostulationsFilter {
    setFilters: any;
    filters: any;
}

const PostulationsFilter: FC<IPostulationsFilter> = ({ setFilters, filters }) => {
    const initial_values = {
        palabraClave: '',
        convocatoriaSearch: '',
        estadoPos: '',
        cha_announcement: ''
    };

    const schema = Yup.object().shape({
        palabraClave: Yup.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
        cha_announcement: Yup.number()
    });
    
    const form_ref = useRef<any>();
    const dispatch = useDispatch<any>();

    const submit = async (values: any) => {
        setFilters({
            page: 1,
            pageSize: 10,
            challenge_name: values.palabraClave,
            cha_announcement: values.cha_announcement,
            status: values.estadoPos.toUpperCase(),
        });
        await dispatch(
            actions.get_list_postulation({
                page: 1,
                page_size: 10,
                cha_name: values.palabraClave,
                cha_announcement: values.cha_announcement,
                pos_status: values.estadoPos.toUpperCase(),
            })
        );
    };

    return (
        <div>
            <Formik onSubmit={submit} validationSchema={schema} initialValues={initial_values} innerRef={form_ref}>
                {({ handleChange, values, setValues }) => {
                    return (
                        <Form>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <label htmlFor="palabraClave_id" className="form-label">
                                        Nombre o palabra clave
                                    </label>
                                    <Field
                                        type="text"
                                        id="palabraClave_id"
                                        name="palabraClave"
                                        className="form-control"
                                        maxLength={100}
                                    />
                                    <ErrorMessage name="palabraClave" withCount max={100} />
                                </div>

                                <div className="col-12 col-md-6 col-lg-3">
                                    <label htmlFor="convocatoriaSearch_id" className="form-label">
                                        No. Convocatoría
                                    </label>
                                    <Field
                                        type="number"
                                        id="cha_announcement_id"
                                        name="cha_announcement"
                                        className={`form-control`}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-3">
                                    <label htmlFor="estadoPos_id" className="form-label">
                                        Estado
                                    </label>
                                    <Field
                                        component={Select}
                                        id="estadoPos_id"
                                        name="estadoPos"
                                        options={[
                                            {
                                                name: 'Finalizado',
                                                id: 'Finalizado',
                                            },
                                            {
                                                name: 'Sin Finalizar',
                                                id: 'Sin Finalizar',
                                            },
                                            {
                                                name: 'Revisado',
                                                id: 'Revisado',
                                            },
                                        ]}
                                        placeholder="Seleccionar…"
                                        extra_on_change={(value: number) => {}}
                                    />
                                </div>
                            </div>

                            <div className="ant-card-actions"></div>

                            <div className="d-flex flex-row justify-content-end my-3">
                                <button
                                    onClick={() => {
                                        form_ref.current?.resetForm();
                                        setFilters({
                                            page: 1,
                                            per_page: 10,
                                        });
                                        dispatch(actions.get_list_postulation({ page: 1, page_size: 10 }));
                                    }}
                                    className="btn me-3 mt"
                                    style={{ color: '#1D98D1' }}
                                >
                                    Limpiar filtros
                                </button>
                                <button
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                    key="saveDoc"
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Buscar
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default PostulationsFilter;
