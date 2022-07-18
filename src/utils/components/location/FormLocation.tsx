import { Field, Form, Formik } from 'formik'


import * as Yup from "yup";
import { Link } from 'react-router-dom';
// import { IPostulationTeam } from '../../../modules/landing/postulationChallenge/custom_types';

import { FC } from "react";
import { IPostulationTeam } from "../../../modules/landing/postulationChallenge/custom_types";
import { ErrorMessage, Select } from '../../ui';
import { Radio } from 'antd';


interface PostulationTeamFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    postulationTeam?: IPostulationTeam;
}

const FormLocation: FC<PostulationTeamFormPros> = ({ innerRef, onSubmit, postulationTeam }) => {
    const initial_values = {
        name_last_name: "",
        document_type: null,
        number_document: "",
        type_sex: null,
        gender_identity: null,
        sexual_orientation: null,
        ethnicity: null,
        radiogroup_victim: "",
        radiogroup_disability: "",
        ...postulationTeam
    };

    const schema = Yup.object().shape({
        name_last_name: Yup.string().required("Campo obligatorio").min(3, "Mínimo 3 caracteres"),
        document_type: Yup.string().nullable().required("Campo obligatorio"),
        number_document: Yup.string().required("Campo obligatorio").min(7, "Mínimo 7 caracteres"),
        type_sex: Yup.string().nullable().required("Campo obligatorio"),
        gender_identity: Yup.string().nullable().required("Campo obligatorio"),
        sexual_orientation: Yup.string().nullable().required("Campo obligatorio"),
        ethnicity: Yup.string().nullable().required("Campo obligatorio"),
        radiogroup_victim: Yup.string().required("Campo obligatorio"),
        radiogroup_disability: Yup.string().required("Campo obligatorio"),
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

                                        { name: "Femenino", id: "Femenino" },
                                        { name: "Masculino", id: "Masculino" },
                                        { name: "Intersexual", id: "Intersexual" },
                                        { name: "Indefinido", id: "Indefinido" },

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
                                    placeholder="Número"
                                    minLength={7}
                                    maxLength={20}
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
                                    placeholder="Letra"
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
                                <ErrorMessage name="character" withCount max={50} />
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

                                        { name: "Femenino", id: "Femenino" },
                                        { name: "Masculino", id: "Masculino" },
                                        { name: "Intersexual", id: "Intersexual" },
                                        { name: "Indefinido", id: "Indefinido" },

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
                                <ErrorMessage name="zone" />
                            </div>
                        </div>


                        <div className='row'>


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
                                    placeholder="Número"
                                    minLength={7}
                                    maxLength={20}
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
                                <ErrorMessage name="number" withCount max={20} />

                            </div>

                            <div className="col-3">
                                <label htmlFor="character_id" className="form-label" >
                                    Letra <span style={{ fontSize: "10px" }}> - Opcional </span>
                                </label>
                                <Field
                                    type="text"
                                    id="character_id"
                                    name="character"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Letra"
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
                                <ErrorMessage name="character" withCount max={50} />
                            </div>

                            <div className="col-3 ">
                                <label htmlFor="zone_id" className="form-label">
                                    Zona <span style={{ fontSize: "10px" }}> - Opcional </span>
                                </label>
                                <Field
                                    component={Select}
                                    id="zone_id"
                                    name="zone"
                                    style={{ height: "38px" }}

                                    options={[

                                        { name: "Femenino", id: "Femenino" },
                                        { name: "Masculino", id: "Masculino" },
                                        { name: "Intersexual", id: "Intersexual" },
                                        { name: "Indefinido", id: "Indefinido" },

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
                                <ErrorMessage name="zone" />
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
                                    placeholder="Número"
                                    minLength={7}
                                    maxLength={20}
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
                                <ErrorMessage name="number" withCount max={20} />

                            </div>
                        </div>


                        <div className='row'>
                            <div className="">
                                <label htmlFor="character_id" className="form-label" >
                                    Observaciones
                                </label>
                                <Field
                                    type="text"
                                    id="character_id"
                                    name="character"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Observaciones"
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
                                <ErrorMessage name="character" withCount max={50} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="">
                                <label htmlFor="character_id" className="form-label" >
                                    Dirección ingresada
                                </label>
                                <Field
                                    type="text"
                                    id="character_id"
                                    name="character"
                                    className="form-control"
                                    autoComplete="off"
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
                                <ErrorMessage name="character" withCount max={50} />
                            </div>
                        </div>


                    </Form>

                );
            }}

        </Formik>

    );
}

export default FormLocation