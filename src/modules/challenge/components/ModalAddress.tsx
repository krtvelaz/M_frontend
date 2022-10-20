import { Select } from '../../../utils/ui';
import { Field, Form, Formik } from 'formik';
import { FC, useRef, useState } from 'react';
import { Modal } from 'antd';
import ErrorMessage from '../../../utils/ui/ErrorMessage';
import { FieldProps } from 'formik';
import * as Yup from 'yup';

interface ModalAddress extends FieldProps {
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
}

const optionsV = [
    {
        name: 'Norte',
        id: 'Norte',
    },
    {
        name: 'Sur',
        id: 'Sur',
    },
    {
        name: 'Este',
        id: 'Este',
    },
    {
        name: 'Oeste',
        id: 'Oeste',
    },
];

const ModalAddress: FC<ModalAddress> = ({ field, form, extra_on_change, ...props }) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const close = () => set_is_visible(false);
    const open = () => set_is_visible(true);

    const submit = (values: any, actions: any) => {
        form.setFieldValue(
            field.name,
            `${values.tipo_via} ${values.numero_dir}${values.letra_dir}  ${values.zona_dir} # ${values.numero2_dir}${values.letra2_dir} ${values.zona2_dir} - ${values.numero3_dir} ${values.obser_dir}`,
            false
        );
        close();
    };

    const form_ref = useRef<any>();

    const initial_values = {
        tipo_via: '',
        numero_dir: '',
        letra_dir: '',
        zona_dir: '',
        numero2_dir: '',
        letra2_dir: '',
        zona2_dir: '',
        numero3_dir: '',
        obser_dir: '',
        dir_ing: '',
    };

    const schema = Yup.object().shape({
        tipo_via: Yup.string().nullable().required('Campo obligatorio'),
        numero_dir: Yup.string().required('Campo obligatorio'),
        numero2_dir: Yup.string().required('Campo obligatorio'),
        numero3_dir: Yup.string().required('Campo obligatorio'),
    });

    return (
        <>
            <div
                className="form-control"
                onClick={open}
                style={{
                    borderBottomLeftRadius: '6px',
                    borderTopLeftRadius: '6px',
                    height: '38px',
                }}
            >
                {field.value}
            </div>
            <Modal
                title={
                    <>
                        <div style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px' }}>Ingrese la dirección</div>
                    </>
                }
                visible={is_visible}
                width={1000}
                onCancel={() => {
                    form_ref.current?.resetForm();
                    close();
                }}
                footer={[
                    <>
                        <button className="btn-back me-3" onClick={close}>
                            Cancelar
                        </button>
                        <button
                            onClick={() => form_ref.current?.submitForm()}
                            type="button"
                            className="btn btn-landing-primary"
                        >
                            Aceptar
                        </button>
                    </>,
                ]}
                closable={false}
            >
                <Formik onSubmit={submit} initialValues={initial_values} validationSchema={schema} innerRef={form_ref}>
                    {({ handleChange, values }) => {
                        return (
                            <Form>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="tipo_via_id" className="form-label label-landing">
                                            Tipo de vía
                                        </label>
                                        <Field
                                            component={Select}
                                            maxTagCount="responsive"
                                            dropdownMatchSelectWidth={false}
                                            id="ret_perfil_id"
                                            name="tipo_via"
                                            className=""
                                            options={[
                                                {
                                                    name: 'Autopista',
                                                    id: 'Autopista',
                                                },
                                                {
                                                    name: 'Autovía',
                                                    id: 'Autovía',
                                                },
                                                {
                                                    name: 'Avenida',
                                                    id: 'Avenida',
                                                },
                                                {
                                                    name: 'Bulevar',
                                                    id: 'Bulevar',
                                                },
                                                {
                                                    name: 'Calle',
                                                    id: 'Calle',
                                                },
                                                {
                                                    name: 'Carrera',
                                                    id: 'Carrera',
                                                },
                                                {
                                                    name: 'Callejón',
                                                    id: 'Callejón',
                                                },
                                                {
                                                    name: 'Camino',
                                                    id: 'Camino',
                                                },
                                                {
                                                    name: 'Diagonal',
                                                    id: 'Diagonal',
                                                },
                                                {
                                                    name: 'Carril',
                                                    id: 'Carril',
                                                },
                                                {
                                                    name: 'Carretera',
                                                    id: 'Carretera',
                                                },
                                                {
                                                    name: 'Sendero',
                                                    id: 'Sendero',
                                                },
                                                {
                                                    name: 'Vía rápida',
                                                    id: 'Vía rápida',
                                                },
                                                {
                                                    name: 'Urbanización',
                                                    id: 'Urbanización',
                                                },
                                            ]}
                                            placeholder="Seleccione uno o más perfiles…"
                                        />

                                        <ErrorMessage name="tipo_via" />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="numero_dir_id" className="form-label label-landing">
                                            Número
                                        </label>
                                        <Field
                                            type="text"
                                            id="numero_dir_id"
                                            name="numero_dir"
                                            className="form-control"
                                            autocomplete="off"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={3}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,3}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="numero_dir" withCount max={3} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="letra_dir_id" className="form-label label-landing">
                                            Letra <span> - Opcional</span>{' '}
                                        </label>
                                        <Field
                                            type="text"
                                            id="letra_dir_id"
                                            name="letra_dir"
                                            className="form-control"
                                            autocomplete="off"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={1}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z\\Ñ\\ñ"]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="letra_dir" withCount max={1} />
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="zona_dir_id" className="form-label label-landing">
                                            Zona <span> - Opcional</span>
                                        </label>
                                        <Field
                                            component={Select}
                                            id="zona_dir_id"
                                            name="zona_dir"
                                            dropdownMatchSelectWidth={false}
                                            options={optionsV}
                                        />
                                        <ErrorMessage name="zona_dir" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="numero2_dir" className="form-label label-landing">
                                            Número
                                        </label>
                                        <Field
                                            type="text"
                                            id="numero2_dir"
                                            name="numero2_dir"
                                            className="form-control"
                                            autocomplete="off"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={3}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,3}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="numero2_dir" withCount max={3} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="letra2_dir" className="form-label label-landing">
                                            Letra <span> - Opcional</span>
                                        </label>

                                        <Field
                                            type="text"
                                            id="letra2_dir"
                                            name="letra2_dir"
                                            className="form-control"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={1}
                                            autocomplete="off"
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z\\Ñ\\ñ"]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="letra2_dir" withCount max={1} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="zona2_dir" className="form-label label-landing">
                                            Zona <span> - Opcional</span>
                                        </label>
                                        <Field
                                            component={Select}
                                            id="zona2_dir"
                                            name="zona2_dir"
                                            dropdownMatchSelectWidth={false}
                                            options={[
                                                {
                                                    name: 'Norte',
                                                    id: 'Norte',
                                                },
                                                {
                                                    name: 'Sur',
                                                    id: 'Sur',
                                                },
                                                {
                                                    name: 'Este',
                                                    id: 'Este',
                                                },
                                                {
                                                    name: 'Oeste',
                                                    id: 'Oeste',
                                                },
                                            ]}
                                            extra_on_change={(value: number) => {}}
                                        />
                                        <ErrorMessage name="zona2_dir" />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="numero3_dir" className="form-label label-landing">
                                            Número
                                        </label>
                                        <Field
                                            type="text"
                                            id="numero3_dir"
                                            name="numero3_dir"
                                            className="form-control"
                                            dropdownMatchSelectWidth={false}
                                            autocomplete="off"
                                            maxLength="3"
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,3}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="numero3_dir" withCount max={3} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-12">
                                        <label htmlFor="obser_dir" className="form-label label-landing">
                                            Observaciones <span> - Opcional</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="obser_dir"
                                            name="obser_dir"
                                            autocomplete="off"
                                            className="form-control"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={100}
                                        />
                                        <ErrorMessage name="obser_dir" withCount max={100} />
                                    </div>
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
                                            value={`${values.tipo_via} ${values.numero_dir}${values.letra_dir}  ${values.zona_dir} # ${values.numero2_dir}${values.letra2_dir} ${values.zona2_dir} - ${values.numero3_dir} ${values.obser_dir}`}
                                            className="form-control"
                                            dropdownMatchSelectWidth={false}
                                            maxLength={100}
                                        />
                                        <ErrorMessage name="dir_ing" withCount max={100} />
                                    </div>
                                </div>

                                <div
                                    className="d-flex flex-row justify-content-end btn-responsive"
                                    style={{ paddingTop: 24, marginTop: 30, borderTop: '1px solid #ccc' }}
                                ></div>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalAddress;
