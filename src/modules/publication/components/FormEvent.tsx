import { Radio, TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import { FC, useState } from "react";
import { ErrorMessage } from "../../../utils/ui";
import Input from "../../../utils/ui/CurrencyInput";
import DateInput from "../../../utils/ui/DateInput";
import { IEvent } from "../custom_types";

interface EventFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    event?: IEvent;
}

const FormEvent: FC<EventFormPros> = ({ innerRef, onSubmit, event }) => {
    const [value_radio, setValue_radio] = useState();
    const onChange = (e: any) => {
        setValue_radio(e.target.value);
    };

    const initial_values = {
        title: "",
        description: "",
        start_date: "",
        start_time: "",
        radiogrou: "",
        number_quotas: "",
        ...event,
    };

    const submit = (values: any, form: any) => {
        onSubmit(values);
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initial_values}
            // validationSchema={schema}
            innerRef={innerRef}
        >
            {({ values, handleChange }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-6">
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

                            <div className={`col-12 col-md-6 `}>
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
                            <div className="col-3">
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

                            <div className="col-3">
                                <label htmlFor="start_time_id" className="form-label">
                                    Hora
                                </label>
                                <Field
                                    component={TimePicker}
                                    name="start_time"
                                    id="start_time_id"
                                    style={{ height: "38px" }}

                                />

                                <ErrorMessage name="start_time" />
                            </div>

                            <div className="col-2 ">
                                <label htmlFor="radiogrou_id" className="form-label mb-4">
                                    ¿Cupos limitados?
                                </label>
                                <Radio.Group name="radiogroup" id="radiogrou_id" onChange={onChange} value={value_radio} >
                                    <Radio value={"si"}>Si</Radio>
                                    <Radio value={"no"}>No</Radio>
                                </Radio.Group>

                                <ErrorMessage name="radiogrou_id" />
                            </div>

                            {value_radio === "no" ?

                                <div >

                                </div>
                                :
                                <div className="col-3 col-md-3  flex-fill " >

                                    <label htmlFor="number_quotas_id" className="form-label">
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
                            }

                        </div>

                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormEvent;
