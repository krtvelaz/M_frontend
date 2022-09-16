import { Card, Select, Link } from '../../../utils/ui';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { CSSProperties, FC, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { SERVFAIL } from 'dns';
import ErrorMessage from '../../../utils/ui/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { IEvent } from '../../publication/custom_types';

const initial_values = {
    hec_id_tipo_publicacion: '',
    hec_titulo: '',
    hec_autor: '',
    hec_descripcion: '',
};

const submit = () => {
    console.log('Hola');
};
interface ModalAddress {
    onSubmit: (values: any, form?: any) => any;
    id: number;
    is_visible?: boolean;
}

const ModalAddress: FC<ModalAddress> = ({ is_visible }) => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [visibleModal, setVisibleModal] = useState(false);
    const dispatch = useDispatch<any>();
    const close = () => setVisibleModal(!visibleModal);
    const event: IEvent = useSelector((store: any) => store.event.event.value);
    return (
        <div className="container-fluid">
            <Modal
                visible={visibleModal ? !is_visible : is_visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                footer={null}
                closable={false}
            >
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <Card
                            title={
                                <>
                                    <h1
                                        style={{
                                            fontSize: 30,
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 800,
                                        }}
                                    >
                                        Ingrese la dirección
                                    </h1>
                                </>
                            }
                        >
                            <Formik onSubmit={submit} initialValues={initial_values}>
                                <Form>
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Tipo de vía
                                            </span>
                                            <Field
                                                component={Select}
                                                id="tipo_via"
                                                name="tipo_via"
                                                dropdownMatchSelectWidth={false}
                                                options={[
                                                    {
                                                        name: 'Calle',
                                                        id: 1,
                                                    },
                                                    {
                                                        name: 'Carrera',
                                                        id: 2,
                                                    },
                                                ]}
                                                placeholder="Calle"
                                                style={{ margin: '10px 0' }}
                                                extra_on_change={(value: number) => {}}
                                            />
                                            <ErrorMessage name="tipo_via" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Número
                                            </span>
                                            <Field
                                                type="text"
                                                id="numero_dir"
                                                name="numero_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="15"
                                                maxLength={3}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="numero_dir" withCount max={3} />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Letra
                                            </span>
                                            <Field
                                                type="text"
                                                id="letra_dir"
                                                name="letra_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="B"
                                                maxLength={1}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="letra_dir" withCount max={1} />
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Zona
                                            </span>
                                            <Field
                                                component={Select}
                                                id="zona_dir"
                                                name="zona_dir"
                                                dropdownMatchSelectWidth={false}
                                                options={[
                                                    {
                                                        name: 'Norte',
                                                        id: '1',
                                                    },
                                                    {
                                                        name: 'Sur',
                                                        id: '2',
                                                    },
                                                    {
                                                        name: 'Este',
                                                        id: '3',
                                                    },
                                                    {
                                                        name: 'Oeste',
                                                        id: '4',
                                                    },
                                                ]}
                                                placeholder="Sur"
                                                style={{ margin: '10px 0' }}
                                                extra_on_change={(value: number) => {}}
                                            />
                                            <ErrorMessage name="zona_dir" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Número
                                            </span>
                                            <Field
                                                type="text"
                                                id="numero2_dir"
                                                name="numero2_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="26"
                                                maxLength={3}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="numero2_dir" withCount max={3} />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Letra
                                            </span>

                                            <span style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>
                                                {' '}
                                                - Opcional
                                            </span>
                                            <Field
                                                type="text"
                                                id="letra2_dir"
                                                name="letra2_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="D"
                                                maxLength={1}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="letra2_dir" withCount max={1} />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Zona
                                            </span>
                                            <span style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>
                                                {' '}
                                                - Opcional
                                            </span>
                                            <Field
                                                component={Select}
                                                id="zona2_dir"
                                                name="zona2_dir"
                                                dropdownMatchSelectWidth={false}
                                                options={[
                                                    {
                                                        name: 'Norte',
                                                        id: '1',
                                                    },
                                                    {
                                                        name: 'Sur',
                                                        id: '2',
                                                    },
                                                    {
                                                        name: 'Este',
                                                        id: '3',
                                                    },
                                                    {
                                                        name: 'Oeste',
                                                        id: '4',
                                                    },
                                                ]}
                                                placeholder="Norte"
                                                style={{ marginTop: '10px' }}
                                                extra_on_change={(value: number) => {}}
                                            />
                                            <ErrorMessage name="zona2_dir" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Número
                                            </span>
                                            <Field
                                                type="text"
                                                id="numero3_dir"
                                                name="numero3_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="342"
                                                maxLength="3"
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="numero3_dir" withCount max={3} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-12">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Observaciones
                                            </span>
                                            <Field
                                                type="text"
                                                id="obser_dir"
                                                name="obser_dir"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="Apto 1508"
                                                maxLength={100}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="obser_dir" withCount max={100} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-12">
                                            <span
                                                style={{
                                                    color: '#0A0909',
                                                    fontFamily: 'Montserrat-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                Dirección ingresada
                                            </span>
                                            <Field
                                                type="text"
                                                id="dir_ing"
                                                name="dir_ing"
                                                className="form-control"
                                                dropdownMatchSelectWidth={false}
                                                placeholder="Calle 39B sur # 26D Sur 342 - Apto 1509"
                                                maxLength={100}
                                                style={{ marginTop: '10px' }}
                                            />
                                            <ErrorMessage name="dir_ing" withCount max={100} />
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex flex-row justify-content-end btn-responsive"
                                        style={{ paddingTop: 24, marginTop: 30, borderTop: '1px solid #ccc' }}
                                    >
                                        <button
                                            style={{
                                                border: 'none',
                                                background: '#fff',
                                                fontFamily: 'Montserrat-Medium',
                                                fontSize: 16,
                                                color: '#ACACAC',
                                                marginRight: 25,
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={close}
                                            type="button"
                                            className="btn btn-primary"
                                            style={{
                                                fontFamily: 'Montserrat-Bold',
                                                fontSize: 16,
                                            }}
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </Card>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAddress;
