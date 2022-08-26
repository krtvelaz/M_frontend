import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import { FC } from "react";
import { IAddress } from "../../../modules/postulation/custom_types";
import { ErrorMessage, Select } from '../../ui';


interface IAddressFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    address?: IAddress;
}

const FormLocation: FC<IAddressFormPros> = ({ innerRef, onSubmit, address }) => {
    const initial_values = {
        type_via: null,
        character: "",
        character2: "",
        number: "",
        number2: "",
        number3: "",
        zone: null,
        zone2: null,
        observations: "",
        address: "",
        ...address
    };

    const schema = Yup.object().shape({
        type_via: Yup.string().nullable().required("Campo obligatorio"),
        number: Yup.string().required("Campo obligatorio"),
        number2: Yup.string().required("Campo obligatorio"),
        number3: Yup.string().required("Campo obligatorio"),
        // number: Yup.string().required("Campo obligatorio").min(7, "Mínimo 7 caracteres"),
        character: Yup.string().required("Campo obligatorio"),
        zone: Yup.string().nullable().required("Campo obligatorio"),
        observations: Yup.string().required("Campo obligatorio"),
       
    });
    const submit = (values: any, form: any) => {
        onSubmit(values);

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
                            <div className="col-3 ">
                                <label htmlFor="type_via_id" className="form-label">
                                    Tipo de vía
                                </label>
                                <Field
                                    component={Select}
                                    id="type_via_id"
                                    name="type_via"
                                    style={{ height: "38px" }}

                                    options={[

                                        { name: "Calle", id: "Calle" },
                                       
                                    ]}
                                    placeholder="Calle"
                                    filterOption={(input: any, option: any) => {
                                        return (
                                            option?.children
                                                ?.toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                />
                                <ErrorMessage name="type_via" />
                            </div>

                            <div className="col-3">
                                <label htmlFor="number_id" className="form-label ">
                                    Número
                                </label>

                                <Field
                                    type="text"
                                    name="number"
                                    id="number_id"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="15"
                                    minLength={6}
                                    maxLength={20}
                                    min={0}
                                    max={999999}
                                    onChange={(e:any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,6}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="number" withCount max={20} />

                            </div>

                            <div className="col-3">
                                <label htmlFor="character_id" className="form-label" >
                                    Letra
                                </label>
                                <Field
                                    type="text"
                                    id="character_id"
                                    name="character"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="B"
                                    maxLength={1}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="character" withCount max={1} />
                            </div>

                            <div className="col-3 ">
                                <label htmlFor="zone_id" className="form-label">
                                    Zona
                                </label>
                                <Field
                                    component={Select}
                                    id="zone_id"
                                    name="zone"
                                    style={{ height: "38px" }}

                                    options={[

                                        { name: "Norte", id: "Norte" },
                                        { name: "Sur", id: "Sur" },
                                        { name: "Este", id: "Este" },
                                        { name: "Oeste", id: "Oeste" },

                                    ]}
                                    placeholder="Sur"
                                    filterOption={(input: any, option: any) => {
                                        return (
                                            option?.children
                                                ?.toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                />
                                <ErrorMessage name="zone" />
                            </div>
                        </div>
                        <div className='row'>
                        <div className="col-3">
                                <label htmlFor="number2_id" className="form-label ">
                                    Número
                                </label>

                                <Field
                                    type="text"
                                    name="number2"
                                    id="number2_id"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="26"
                                    minLength={6}
                                    maxLength={20}
                                    min={0}
                                    max={999999}
                                    onChange={(e:any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,6}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="number2" withCount max={20} />

                            </div>


                            <div className="col-3">
                                <label htmlFor="character2_id" className="form-label" >
                                    Letra <span style={{ fontSize: "10px" }}> - Opcional </span>
                                </label>
                                <Field
                                    type="text"
                                    id="character2_id"
                                    name="character2"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="B"
                                    maxLength={1}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="character2" withCount max={1} />
                            </div>

                            <div className="col-3 ">
                                <label htmlFor="zone2_id" className="form-label">
                                    Zona <span style={{ fontSize: "10px" }}> - Opcional </span>
                                </label>
                                <Field
                                    component={Select}
                                    id="zone2_id"
                                    name="zone2"
                                    style={{ height: "38px" }}

                                    options={[

                                        { name: "Norte", id: "Norte" },
                                        { name: "Sur", id: "Sur" },
                                        { name: "Este", id: "Este" },
                                        { name: "Oeste", id: "Oeste" },

                                    ]}
                                    placeholder="Sur"
                                    filterOption={(input: any, option: any) => {
                                        return (
                                            option?.children
                                                ?.toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                />
                                <ErrorMessage name="zone2" />
                            </div>

                            <div className="col-3">
                                <label htmlFor="number3_id" className="form-label ">
                                    Número
                                </label>

                                <Field
                                    type="text"
                                    name="number3"
                                    id="number3_id"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="342"
                                    minLength={6}
                                    maxLength={20}
                                    min={0}
                                    max={999999}
                                    onChange={(e:any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,6}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="number3" withCount max={20} />

                            </div>
                        </div>


                        <div className='row'>
                            <div className="">
                                <label htmlFor="observations_id" className="form-label" >
                                    Observaciones
                                </label>
                                <Field
                                    type="text"
                                    id="observations_id"
                                    name="observations"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Apto 1509"
                                    minLength={3}
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
                                <ErrorMessage name="observations" withCount max={50} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="">
                                <label htmlFor="address_id" className="form-label" >
                                    Dirección ingresada
                                </label>
                                <Field
                                disabled 
                                    type="text"
                                    id="address_id"
                                    name="address"
                                    className="form-control"
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={50}
                                    placeholder="Calle 39B sur # 26D sur 341 - Apto 1509"
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
                               
                            </div>
                        </div>


                    </Form>

                );
            }}

        </Formik>

    );
}

export default FormLocation