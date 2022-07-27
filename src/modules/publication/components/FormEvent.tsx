// import {  TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import { FC, useState } from "react";
import { ErrorMessage } from "../../../utils/ui";
import Input from "../../../utils/ui/CurrencyInput";
import DateInput from "../../../utils/ui/DateInput";
import { IEvent } from "../custom_types";
import * as Yup from "yup";
import RadioMedeinn from "../../../utils/ui/Radio";
import TimeInput from "../../../utils/ui/TimeInput";


interface EventFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    event?: IEvent;
}

const FormEvent: FC<EventFormPros> = ({ innerRef, onSubmit, event }) => {
  

    const initial_values = {
        title: "",
        description: "",
        start_date: "",
        start_time: "",
        radio: "",
        number_quotas: "",
        ...event,
    };

    const schema = Yup.object().shape({
        title: Yup.string().required("Campo obligatorio"),
        description: Yup.string().required("Campo obligatorio"),
        start_date: Yup.string().required("Campo obligatorio"),
        start_time: Yup.string().required("Campo obligatorio"),
        radio: Yup.string().required("Campo obligatorio"),
        number_quotas: Yup.string().when("radio", {
            is: "si",
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
                                    Titulo
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                    className="form-control"
                                    id="title_id"
                                    name="title"
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
                                <ErrorMessage name="title" withCount max={90} />
                            </div>

                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="description" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                    className="form-control"
                                    id="description_id"
                                    name="description"
                                    autoComplete="off"
                                    maxLength={100}
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
                                <ErrorMessage name="description" withCount max={100} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6  col-lg-6  ">
                                <label htmlFor="start_date_id" className="form-label">
                                    Fecha
                                </label>
                                <Field
                                    component={DateInput}
                                    name="start_date"
                                    id="start_date_id"
                                />

                                <ErrorMessage name="start_date" />
                            </div>

                            <div className="col-12 col-md-6  col-lg-6  ">
                                <label htmlFor="start_time_id" className="form-label">
                                    Hora
                                </label>
                                <Field
                                    component={TimeInput}
                                    name="start_time"
                                    id="start_time_id"
                                    style={{ height: "38px" }}
                                    format="h:mm A"

                                />

                                <ErrorMessage name="start_time" />
                            </div>

                            <div className="col-6 col-md-6  col-lg-6  ">
                                <label htmlFor="radio_id" className="form-label mb-4">
                                    ¿Cupos limitados?
                                </label>
                                <Field
                                        component={RadioMedeinn}
                                        name="radio"
                                        id="radio_id"
                                        min={0}
                                        max={10000}
                                        maxLength={6}
                                        placeholder="0"
                                    />
                                

                                <ErrorMessage name="radio" />
                            </div>

                            {values.radio === "si" ?

                                <div className="col-6 col-md-6  col-lg-6  " >

                                    <label htmlFor="number_quotas" className="form-label">
                                        Número de cupos
                                    </label>
                                    <Field
                                        component={Input}
                                        name="number_quotas"
                                        id="number_quotas_id"
                                        min={0}
                                        max={10000}
                                        maxLength={6}
                                        placeholder="0"
                                    />
                                    <ErrorMessage name="number_quotas" />
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
