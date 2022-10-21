import { Radio } from 'antd';
import { Field, Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { Card, ErrorMessage, Select } from '../../../utils/ui';
import { IRegisterPersonaJuridica } from '../custom_types';
interface RegisterFormPros {
    innerRef: any;
    register_juridica?: IRegisterPersonaJuridica;
}
const FormRegisterPersonaJuridica: FC<RegisterFormPros> = ({ register_juridica, innerRef }) => {
    const initial_values = {
        name: '',
        nit: '',
        entity_type: null,
        email: '',
        direccion_comercial: '',
        direccion_residencia: '',
        barrio: '',
        type_contact: null,
        number_contact: '',
        country: null,
        departament: null,
        city: null,
        radio_politicas: null,

        ...register_juridica,
    };

    const schema = Yup.object().shape({
        name: Yup.string().required('Campo obligatorio'),
        nit: Yup.string().required('Campo obligatorio'),
        entity_type: Yup.string().nullable().required('Campo obligatorio'),
        email: Yup.string().email('Ingrese un correo electrónico valido').required('Campo obligatorio'),
        direccion_comercial: Yup.string().required('Campo obligatorio'),
        direccion_residencia: Yup.string().required('Campo obligatorio'),
        type_contact: Yup.string().nullable().required('Campo obligatorio'),
        number_contact: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        country: Yup.string().nullable().required('Campo obligatorio'),
    });
    const submit = (values: any, form: any) => {};
    return (
        <Formik
            onSubmit={submit}
            enableReinitialize
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange, values }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="name_id" className="form-label">
                                    Nombre o razón social
                                </label>
                                <Field
                                    type="text"
                                    id="name_id"
                                    name="name"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Nombre o razón social"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                                <ErrorMessage name="name" withCount max={50} />
                            </div>
                            <div className="col">
                                <label htmlFor="nit_id" className="form-label ">
                                    NIT
                                </label>
                                <Field
                                    type="text"
                                    name="nit"
                                    id="nit_id"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="No. Digita tu número de NIT"
                                    min={7}
                                    max={99999999999999}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,14}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="nit" withCount max={14} />
                            </div>

                            <div className="col-3 ">
                                <label htmlFor="entity_type_id" className="form-label">
                                    Tipo de entidad
                                </label>
                                <Field
                                    component={Select}
                                    id="entity_type_id"
                                    name="entity_type"
                                    style={{ height: '38px' }}
                                    options={[
                                        {
                                            name: 'Oganización sin ánimo de lucro',
                                            id: 'Oganización sin ánimo de lucro',
                                        },
                                        { name: 'Otro', id: 'Otro' },
                                        { name: 'Privada', id: 'Privada' },
                                        { name: 'Publica', id: 'Publica' },
                                    ]}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="entity_type" />
                            </div>

                            <div className="col-3 col-md-6 col-lg-3">
                                <label htmlFor="email_id" className="form-label">
                                    Correo electrónico
                                </label>
                                <Field
                                    type="email"
                                    id="email_id"
                                    name="email"
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: '38px' }}
                                    placeholder="Correo electrónico"
                                />
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="direccion_comercial_id" className="form-label">
                                    Dirección de Comercial
                                </label>
                                <Field
                                    type="text"
                                    id="direccion_comercial_id"
                                    name="direccion_comercial"
                                    className="form-control"
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="Ingrese una dirección..."
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="direccion_comercial" withCount max={100} />
                            </div>
                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="direccion_residencia_id" className="form-label">
                                    Dirección de residencia
                                </label>
                                <Field
                                    type="text"
                                    id="direccion_residencia_id"
                                    name="direccion_residencia"
                                    className="form-control"
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="Ingrese una dirección..."
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="direccion_residencia" withCount max={100} />
                            </div>

                            <div className="col-3">
                                <label htmlFor="barrio_id" className="form-label">
                                    Barrio de residencia
                                </label>
                                <Field
                                    type="text"
                                    id="barrio_id"
                                    name="barrio"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Nombre barrio"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                                <ErrorMessage name="barrio" withCount max={50} />
                            </div>

                            <div className="col-3">
                                <label htmlFor="type_contact_id" className="form-label ">
                                    Teléfono comercial
                                </label>
                                <div className="row">
                                    <div className="col-4">
                                        <Field
                                            component={Select}
                                            id="type_contact_id"
                                            name="type_contact"
                                            className=""
                                            options={[
                                                {
                                                    name: 'Fijo',
                                                    id: 'Fijo',
                                                },
                                                { name: 'Celular', id: 'Celular' },
                                            ]}
                                            placeholder="Seleccione..."
                                            filterOption={(input: any, option: any) => {
                                                return (
                                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                        <ErrorMessage name="type_contact" />
                                    </div>
                                    <div className="col">
                                        <Field
                                            type="text"
                                            id="number_contact_id"
                                            name="number_contact"
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="No. Digita tu número de contacto."
                                            min={7}
                                            max={9999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,10}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="number_contact" withCount max={10} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 ">
                                <label htmlFor="country_id" className="form-label">
                                    País
                                </label>
                                <Field
                                    component={Select}
                                    id="country_id"
                                    name="country"
                                    style={{ height: '38px' }}
                                    options={[
                                        { name: 'Colombia', id: 'Colombia' },
                                        { name: 'Brasil', id: 'Brasil' },
                                        { name: 'Raizal', id: 'Raizal' },
                                        { name: 'Indígena', id: 'Indígena' },
                                        { name: 'Rom gitano', id: 'Rom gitano' },
                                        { name: 'Ninguno', id: 'Ninguno' },
                                    ]}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="country" />
                            </div>
                            <div className="col-3 ">
                                <label htmlFor="departament_id" className="form-label">
                                    Departamento
                                </label>
                                <Field
                                    component={Select}
                                    id="departament_id"
                                    name="departament"
                                    style={{ height: '38px' }}
                                    disabled={true}
                                    options={[
                                        { name: 'Colombia', id: 'Colombia' },
                                        { name: 'Brasil', id: 'Brasil' },
                                        { name: 'Raizal', id: 'Raizal' },
                                        { name: 'Indígena', id: 'Indígena' },
                                        { name: 'Rom gitano', id: 'Rom gitano' },
                                        { name: 'Ninguno', id: 'Ninguno' },
                                    ]}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                            </div>

                            <div className="col-3 ">
                                <label htmlFor="city_id" className="form-label">
                                    Ciudad
                                </label>
                                <Field
                                    component={Select}
                                    id="city_id"
                                    name="city"
                                    style={{ height: '38px' }}
                                    disabled={true}
                                    options={[
                                        { name: 'Colombia', id: 'Colombia' },
                                        { name: 'Brasil', id: 'Brasil' },
                                        { name: 'Raizal', id: 'Raizal' },
                                        { name: 'Indígena', id: 'Indígena' },
                                        { name: 'Rom gitano', id: 'Rom gitano' },
                                        { name: 'Ninguno', id: 'Ninguno' },
                                    ]}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className=" ">
                                <Radio.Group name="radio_politicas" id="radio_politicas_id">
                                    <Radio value={true}> Acepto Políticas de uso y los Términos y Condiciones</Radio>
                                </Radio.Group>

                                <ErrorMessage name="radio_politicas" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormRegisterPersonaJuridica;
