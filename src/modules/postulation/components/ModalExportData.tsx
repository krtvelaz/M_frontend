import { Modal } from 'antd';
import { Field, Form, Formik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage, Select } from '../../../utils/ui';
import { actions } from '../redux';

interface ModalExportData {
    infoModaL?: any;
    setInfoModaL?: any;
}
export const ModalExportData: FC<ModalExportData> = ({ infoModaL, setInfoModaL }) => {
    const dispatch = useDispatch<any>();
    const form_ref = useRef<any>();

    const submit = async (values: any) => {
        await dispatch(actions.get__postulationReportDetail(values.convocatoria, values.estadoPostulacion));
        close();
    };

    const close = () => {
        setInfoModaL(false);
    };

    const initial_values = {
        convocatoria: '',
        estadoPostulacion: '',
    };
    const schema = Yup.object().shape({
        convocatoria: Yup.string().nullable().required('Campo obligatorio'),
        estadoPostulacion: Yup.string().required('Campo obligatorio'),
    });

    return (
        <div>
            <Modal
                title={<span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Exportar datos</span>}
                visible={infoModaL}
                onCancel={() => {
                    close();
                }}
                bodyStyle={{
                    padding: '0% 0% 0% 4%',
                }}
                footer={[
                    <button
                        key="saveDoc"
                        onClick={() => form_ref.current?.submitForm()}
                        type="button"
                        className="btn btn-primary"
                    >
                        Exportar datos
                    </button>,
                ]}
            >
                <div>
                    <div style={{ fontWeight: 'bold', color: '#000000', paddingBottom: '5%', paddingTop: '3%' }}>
                        <span>Seleccione los datos que desea exportar.</span>
                    </div>

                    <Formik
                        onSubmit={submit}
                        initialValues={initial_values}
                        validationSchema={schema}
                        innerRef={form_ref}
                    >
                        {({ handleChange, values, setValues }) => {
                            return (
                                <Form>
                                    <div className="row">
                                        <div style={{ width: '48%' }}>
                                            <label htmlFor="convocatoria_id">Número de convocatoria</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                placeholder="Seleccionar…"
                                                id="convocatoria_id"
                                                name="convocatoria"
                                            />

                                            <ErrorMessage name="convocatoria" />
                                        </div>
                                        <div style={{ width: '48%' }}>
                                            <label htmlFor="estadoPostulacion_id">Estado</label>
                                            <Field
                                                component={Select}
                                                type="select"
                                                placeholder="Seleccionar…"
                                                id="estadoPostulacion_id"
                                                name="estadoPostulacion"
                                                options={[
                                                    {
                                                        name: 'Finalizado',
                                                        id: 'Finalizado',
                                                    },
                                                    {
                                                        name: 'Sin finalizar',
                                                        id: 'Sin finalizar',
                                                    },
                                                    {
                                                        name: 'Todos',
                                                        id: 'Todos',
                                                    },
                                                ]}
                                            />
                                            <ErrorMessage name="estadoPostulacion" />
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};
