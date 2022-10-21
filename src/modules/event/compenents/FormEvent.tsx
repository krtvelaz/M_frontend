// import {  TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import moment from "moment";
import { IEvent } from "../custom_types";
import { ErrorMessage } from "../../../utils/ui";
import DateInput from "../../../utils/ui/DateInput";
import TimeInput from "../../../utils/ui/TimeInput";
import RadioMedeinn from "../../../utils/ui/Radio";
import Input from "../../../utils/ui/CurrencyInput";



interface EventFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    event?: IEvent;
    type: 'create' | 'edit'

}

const FormEvent: FC<EventFormPros> = ({ innerRef, onSubmit, type, event }) => {


    const initial_values = {
        eve_title: "",
        eve_description: "",
        eve_place: "",
        eve_date: "",
        eve_hour: '',
        eve_with_limit_entry: event?.eve_attendance_limit,
        eve_limit_entry: event?.eve_attendance_quota || "",
        ...event,
        ...(event && {
            eve_hour: moment(event?.eve_hour,'hh:mm A' ).format('hh:mm A')
        })
    };
    const schema = Yup.object().shape({
        eve_title: Yup.string().required("Campo obligatorio"),
        eve_place: Yup.string().required("Campo obligatorio"),
        eve_description: Yup.string().required("Campo obligatorio"),
        eve_date: Yup.string().required("Campo obligatorio"),
        eve_hour: Yup.string().required("Campo obligatorio"),
        eve_with_limit_entry: Yup.boolean().required("Campo obligatorio"),
        eve_limit_entry: Yup.number().when("eve_with_limit_entry", {
            is: true,
            then: Yup.number().nullable().required("Campo obligatorio").max(10000, 'Máximo 10.000')
        }),

    });

    const submit = (values: any, form: any) => {
        console.log("Valores: ", values);
        
        onSubmit(values);
        if(type === 'create') {
            form.resetForm();
          }
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >

            {({ values, handleChange,errors,touched  }) => {
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
                                     className={`form-control ${(errors.eve_title && touched.eve_title) && 'error-input'}`}
                                    id="eve_titulo_id"
                                    name="eve_title"
                                    autoComplete="off"
                                    maxLength={60}
                                />
                                <ErrorMessage name="eve_title" withCount max={60} />
                            </div>

                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_description" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                     className={`form-control ${(errors.eve_description && touched.eve_description) && 'error-input'}`}
                                    id="eve_descripcion_id"
                                    name="eve_description"
                                    autoComplete="off"
                                    maxLength={100}
                                />
                                <ErrorMessage name="eve_description" withCount max={100} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_lugar_evento_id" className="form-label">
                                    Lugar
                                </label>
                                <Field
                                    as="textarea"
                                    style={{ height: "38px" }}
                                     className={`form-control ${(errors.eve_place && touched.eve_place) && 'error-input'}`}
                                    id="eve_lugar_evento_id"
                                    name="eve_place"
                                    autoComplete="off"
                                    maxLength={50}
                                />
                                <ErrorMessage name="eve_place" withCount max={50} />
                            </div>

                            <div className="col-12 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_fecha_id" className="form-label">
                                    Fecha
                                </label>
                                <Field
                                    component={DateInput}
                                    className={`form-control ${(errors.eve_date && touched.eve_date) && 'error-input'}`}
                                    name="eve_date"
                                    id="eve_fecha_id"
                                />

                                <ErrorMessage name="eve_date" />
                            </div>

                            <div className="col-12 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_hora_id" className="form-label">
                                    Hora
                                </label>
                                <Field
                                    component={TimeInput}
                                    name="eve_hour"
                                    id="eve_hora_id"
                                    style={{ height: "38px" }}
                                    

                                />

                                <ErrorMessage name="eve_hour" />
                            </div>
                        </div>

                        <div className="row">


                            <div className="col-6 col-md-6  col-lg-3  ">
                                <label htmlFor="eve_cupos_limitado_id" className="form-label mb-4">
                                    ¿Cupos limitados?
                                </label>
                                <Field
                                    component={RadioMedeinn}
                                    options={[
                                        {
                                            value: true,
                                            name: "Sí"
                                        },
                                        {
                                            value: false,
                                            name: "No"
                                        }
                                    ]}
                                    name="eve_with_limit_entry"
                                    id="eve_cupos_limitado_id"
                                    min={0}
                                    max={10000}
                                    maxLength={6}
                                    placeholder="0"
                                />


                                <ErrorMessage name="eve_with_limit_entry" />
                            </div>
                            {values.eve_with_limit_entry ?

                                <div className="col-6 col-md-6  col-lg-3  " >

                                    <label htmlFor="eve_limit_entry" className="form-label">
                                        Número de cupos
                                    </label>
                                    <Field
                                        component={Input}
                                        className={`${(errors.eve_limit_entry && touched.eve_limit_entry) && 'error-input'}`}
                                        name="eve_limit_entry"
                                        id="eve_numero_cupos_id"
                                        min={0}
                                        max={10000}
                                        maxLength={7}
                                        placeholder="0"
                                    />
                                    <ErrorMessage name="eve_limit_entry" />
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
