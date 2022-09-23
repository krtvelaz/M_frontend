import { Radio } from 'antd';
import { Field, Form, Formik } from 'formik'
import { FC } from 'react';
import * as Yup from "yup";
import { Card, ErrorMessage, Select } from '../../../utils/ui';
import { IRegisterPersonaNatural } from '../custom_types';

interface RegisterFormPros {
    innerRef: any;
    // onSubmit: (values: any, form?: any) => any;
    register?: IRegisterPersonaNatural
}
const FormRegisterPersonaNatural: FC<RegisterFormPros> = ({   register, innerRef }) => {
    const initial_values = {
        name: "",
        last_name: "",
        document_type: null,
        number_document: "",
        gender: null,
        email: "",
        direccion_residencia: "",
        type_contact: null,
        number_contact: "",
        radioPolitica:"",
        ...register
    };

    const schema = Yup.object().shape({
        name: Yup.string().required("Campo obligatorio").min(3,"Mínimo 3 caracteres"),
        last_name: Yup.string().required("Campo obligatorio").min(3,"Mínimo 3 caracteres"),
        document_type: Yup.string().nullable().required("Campo obligatorio"),
        number_document: Yup.string().required("Campo obligatorio").min(7,"Mínimo 7 caracteres"),
        gender: Yup.string().nullable().required("Campo obligatorio"),
        email: Yup.string().email("Ingrese un correo electrónico valido").required("Campo obligatorio"),
        direccion_residencia: Yup.string().required("Campo obligatorio"),
        type_contact: Yup.string().nullable().required("Campo obligatorio"),
        number_contact: Yup.string().required("Campo obligatorio").min(7,"Mínimo 7 caracteres"),
        country: Yup.string().nullable().required("Campo obligatorio"),
        // radioPolitica: Yup.string().required("Debes aceptar las politicas para continuar")
    });
    const submit = (values: any, form: any) => {
        // onSubmit(values);
       

    };
  return (
    <Formik
            enableReinitialize
             onSubmit={submit}
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange, values }) => {
                return (
                     <Form>
                        <div className='row'>
                            <div className="col-3">
                                <label htmlFor="name_id" className="form-label" >
                                    Nombre(s)
                                </label>
                                <Field
                                    type="text"
                                    id="name_id"
                                    name="name"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Nombres"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                               
                                <ErrorMessage name="name" withCount max={50} />
                            </div>
                            <div className="col-3">
                                <label htmlFor="last_name_id" className="form-label" >
                                    Apellido(s)
                                </label>
                                <Field
                                    type="text"
                                    id="last_name_id"
                                    name="last_name"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Apellidos"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                               
                                <ErrorMessage name="last_name" withCount max={50} />
                            </div>

                            <div className="col-3">
                                <label htmlFor="document_type_id" className="form-label ">
                                    Tipo de Documento
                                </label>
                                <div className="row">
                                    <div className="col-4">
                                        <Field
                                            component={Select}
                                            id="document_type_id"
                                            name="document_type"
                                            className=""
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                                minWidth: 300,
                                            }}
                                            options={[
                                                {
                                                    name: "C.C.",
                                                    id: "C.C",
                                                },
                                                { name: "C.G.I.", id: "C.G.I." },
                                                {
                                                    name: "NIT",
                                                    id: "NIT",
                                                },
                                            ]}
                                            placeholder="C.C."
                                            filterOption={(input: any, option: any) => {
                                                return (
                                                    option?.children
                                                        ?.toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                         <ErrorMessage name="document_type"  />
                                    </div>
                                    <div className="col">
                                        <Field
                                            type="text"
                                            name="number_document"
                                            id="number_document_id"
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="No."
                                            min={7}
                                            max={99999999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,14}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }
                                            }
                                        />
                                        <ErrorMessage name="number_document" withCount max={14} />
                                    </div>    
                                </div>
                            </div>

                            <div className="col-3 ">
                                    <label htmlFor="gender_id" className="form-label">
                                        Género
                                    </label>
                                    <Field
                                        component={Select}
                                        id="gender_id"
                                        name="gender"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Femenino", id: "Femenino" },
                                            { name: "Másculino", id: "Másculino" },
                                           

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="gender" />
                                </div>


                        </div>

                        <div className='row'>
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
                                    style={{ height: "38px" }}
                                    placeholder="Correo electrónico"

                                />
                                <ErrorMessage name="email" />
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
                                        const regex = new RegExp(
                                            /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="direccion_residencia" withCount max={100} />
                            </div>

                            <div className="col-3">
                                <label htmlFor="type_contact_id" className="form-label ">
                                    Número de contacto
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
                                                    name: "Fijo", id: "Fijo",
                                                },
                                                { name: "Celular", id: "Celular" },

                                            ]}
                                            placeholder="Seleccione..."
                                            filterOption={(input: any, option: any) => {
                                                return (
                                                    option?.children
                                                        ?.toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
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
                                            placeholder="No. Digite el número de contacto."
                                            min={7}
                                            max={9999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,10}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }
                                            }
                                        />
                                        <ErrorMessage name="number_contact" withCount max={10} />
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="col-3 ">
                                    <label htmlFor="country_id" className="form-label">
                                        País
                                    </label>
                                    <Field
                                        component={Select}
                                        id="country_id"
                                        name="country"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Colombia", id: "Colombia" },
                                            { name: "Brasil", id: "Brasil" },
                                            { name: "Raizal", id: "Raizal" },
                                            { name: "Indígena", id: "Indígena" },
                                            { name: "Rom gitano", id: "Rom gitano" },
                                            { name: "Ninguno", id: "Ninguno" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="country" />
                                </div>
                        </div>
                        <div className="row">
                        <div className="col-3 ">
                                    <label htmlFor="country_id" className="form-label">
                                        Departamento
                                    </label>
                                    <Field
                                        component={Select}
                                        id="country_id"
                                        name="country"
                                        style={{ height: "38px" }}
                                        disabled={true}
                                        options={[

                                            { name: "Colombia", id: "Colombia" },
                                            { name: "Brasil", id: "Brasil" },
                                            { name: "Raizal", id: "Raizal" },
                                            { name: "Indígena", id: "Indígena" },
                                            { name: "Rom gitano", id: "Rom gitano" },
                                            { name: "Ninguno", id: "Ninguno" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="country" />
                                </div>

                                <div className="col-3 ">
                                    <label htmlFor="country_id" className="form-label">
                                        Ciudad
                                    </label>
                                    <Field
                                        component={Select}
                                        id="country_id"
                                        name="country"
                                        style={{ height: "38px" }}
                                        disabled={true}
                                        options={[

                                            { name: "Colombia", id: "Colombia" },
                                            { name: "Brasil", id: "Brasil" },
                                            { name: "Raizal", id: "Raizal" },
                                            { name: "Indígena", id: "Indígena" },
                                            { name: "Rom gitano", id: "Rom gitano" },
                                            { name: "Ninguno", id: "Ninguno" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="country" />
                                </div>
                        </div>

                        <div className='row'>
                        <div className=" ">
                                
                                    <Radio.Group name="radioPolitica" id='radioPolitica'  >
                                        <Radio value="si"> Acepto Políticas de uso y los Términos y Condiciones</Radio>
                                    </Radio.Group>

                                    <ErrorMessage name="radioPolitica" />
                                </div>
                        </div>
 
                    </Form>
                   
                );
            }}

        </Formik>

  )
}

export default FormRegisterPersonaNatural