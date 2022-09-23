import { Card, Select, Link } from '../../../utils/ui';
import { Field, Form, Formik } from 'formik';
import { CSSProperties, FC } from 'react';

const initial_values = {
    hec_id_tipo_publicacion: '',
    hec_titulo: '',
    hec_autor: '',
    hec_descripcion: '',
};

const submit = () => {};

const PostulationsFilter = () => {
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <h5 className="col d-flex justify-content-start" style={{ padding: '2% 0% 0% 2%' }}>
                            Gestionar Postulaciones a Retos
                        </h5>
                    </div>
                    <Card title={'Buscar Reto'}>
                        <Formik onSubmit={submit} initialValues={initial_values}>
                            <Form>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <label htmlFor="ch_postulation" className="form-label">
                                            Nombre o palabra clave
                                        </label>
                                        <Field
                                            type="text"
                                            id="ch_postulation"
                                            name="ch_postulation"
                                            className="form-control"
                                            dropdownMatchSelectWidth={false}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="ret_perfiles_id" className="form-label">
                                            No. Convocatoria
                                        </label>
                                        <Field
                                            component={Select}
                                            id="ret_perfiles_id"
                                            name="chafil_perfiles"
                                            dropdownMatchSelectWidth={false}
                                            options={[
                                                {
                                                    name: '1',
                                                    id: 1,
                                                },
                                                { name: '2', id: 2 },
                                                {
                                                    name: '3',
                                                    id: 3,
                                                },
                                                {
                                                    name: '4',
                                                    id: 4,
                                                },
                                                {
                                                    name: '5',
                                                    id: 5,
                                                },
                                            ]}
                                            placeholder="Seleccionar…"
                                            extra_on_change={(value: number) => {}}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="State_options" className="form-label">
                                            Estado
                                        </label>
                                        <Field
                                            component={Select}
                                            id="State_options"
                                            name="State_options"
                                            dropdownMatchSelectWidth={false}
                                            options={[
                                                {
                                                    name: 'Finalizado',
                                                    id: 'State1',
                                                },
                                                {
                                                    name: 'Sin Finalizar',
                                                    id: 'State2',
                                                },
                                                {
                                                    name: 'Revisado',
                                                    id: 'State3',
                                                },
                                            ]}
                                            placeholder="Seleccionar…"
                                            extra_on_change={(value: number) => {}}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row justify-content-end btn-responsive"
                                    style={{ paddingTop: 24, marginTop: 30, borderTop: '1px solid #ccc' }}
                                >
                                    <button className="btn btn-primary-blue" style={{ color: '#1D98D1' }}>
                                        Limpiar filtros
                                    </button>
                                    <button
                                        key="saveDoc"
                                        type="button"
                                        className="btn btn-primary-blue"
                                        style={{ fontFamily: 'Montserrat,semiBold', width: '12%', color: '#1D98D1' }}
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PostulationsFilter;
