// import {  TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import { FC, useState } from "react";
import { ErrorMessage } from "../../../../utils/ui";
import Input from "../../../../utils/ui/CurrencyInput";
import DateInput from "../../../../utils/ui/DateInput";
import { IEvent } from "../custom_types";
import * as Yup from "yup";
import RadioMedeinn from "../../../../utils/ui/Radio";
import TimeInput from "../../../../utils/ui/TimeInput";


interface EventFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    event?: IEvent;
}

const FormEvent: FC<EventFormPros> = ({ innerRef, onSubmit, event }) => {


    const initial_values = {
        eve_titulo: "",
        eve_descripcion: "",
        eve_lugar_evento: "",
        eve_fecha: "",
        eve_hora: "",
        eve_cupos_limitado: true,
        eve_numero_cupos: "",
        ...event,
    };

    const schema = Yup.object().shape({
        eve_titulo: Yup.string().required("Campo obligatorio"),
        eve_lugar_evento: Yup.string().required("Campo obligatorio"),
        eve_descripcion: Yup.string().required("Campo obligatorio"),
        eve_fecha: Yup.string().required("Campo obligatorio"),
        eve_hora: Yup.string().required("Campo obligatorio"),
        eve_cupos_limitado: Yup.boolean().required("Campo obligatorio"),
        eve_numero_cupos: Yup.string().when("eve_cupos_limitado", {
            is: true,
            then: Yup.string().required("Campo obligatorio")
        }),

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

            {({ values, handleChange }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="title_id" className="form-label">
                                    Título
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                    className="form-control"
                                    id="eve_titulo_id"
                                    name="eve_titulo"
                                    autoComplete="off"
                                    maxLength={90}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="eve_titulo" withCount max={90} />
                            </div>

                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_lugar_evento_id" className="form-label">
                                    Lugar del evento
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                    className="form-control"
                                    id="eve_lugar_evento_id"
                                    name="eve_lugar_evento"
                                    autoComplete="off"
                                    maxLength={90}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(
                                            /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g
                                        );
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="eve_lugar_evento" withCount max={90} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-12  col-lg-12  ">
                                <label htmlFor="eve_descripcion" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                    className="form-control"
                                    id="eve_descripcion_id"
                                    name="eve_descripcion"
                                    autoComplete="off"
                                    maxLength={100}
                                />
                                <ErrorMessage name="eve_descripcion" withCount max={100} />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_fecha_id" className="form-label">
                                    Fecha
                                </label>
                                <Field
                                    component={DateInput}
                                    name="eve_fecha"
                                    id="eve_fecha_id"
                                />

                                <ErrorMessage name="eve_fecha" />
                            </div>

                            <div className="col-12 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_hora_id" className="form-label">
                                    Hora
                                </label>
                                <Field
                                    component={TimeInput}
                                    name="eve_hora"
                                    id="eve_hora_id"
                                    style={{ height: "38px" }}
                                    format="HH:mm A"

                                />

                                <ErrorMessage name="eve_hora" />
                            </div>

                            <div className="col-6 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_cupos_limitado_id" className="form-label mb-4">
                                    ¿Cupos limitados?
                                </label>
                                <Field
                                    component={RadioMedeinn}
                                    name="eve_cupos_limitado"
                                    id="eve_cupos_limitado_id"
                                    min={0}
                                    max={10000}
                                    maxLength={6}
                                    placeholder="0"
                                />


                                <ErrorMessage name="eve_cupos_limitado" />
                            </div>
                            {values.eve_cupos_limitado ?

                                <div className="col-6 col-md-6  col-lg-3  " >

                                    <label htmlFor="eve_numero_cupos" className="form-label">
                                        Número de cupos
                                    </label>
                                    <Field
                                        component={Input}
                                        name="eve_numero_cupos"
                                        id="eve_numero_cupos_id"
                                        min={0}
                                        max={10000}
                                        maxLength={6}
                                        placeholder="0"
                                    />
                                    <ErrorMessage name="eve_numero_cupos" />
                                </div>
                                :
                                <div></div>
                            }

                        </div>

                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormEvent;
