// import {  TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import { FC } from "react";
import { ErrorMessage } from "../../../../utils/ui";
import Input from "../../../../utils/ui/CurrencyInput";
import DateInput from "../../../../utils/ui/DateInput";
import { IEvent } from "../../custom_types";
import * as Yup from "yup";
import RadioMedeinn from "../../../../utils/ui/Radio";
import TimeInput from "../../../../utils/ui/TimeInput";
import moment from "moment";
import { Tabs } from "antd";


interface EventFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    event?: IEvent;
    type: 'create' | 'edit'

}

const FormEvent: FC<EventFormPros> = ({ innerRef, onSubmit, type, event }) => {


    const initial_values = {
        eve_titulo: "",
        eve_descripcion: "",
        eve_lugar_evento: "",
        eve_fecha: "",
        eve_hora: '',
        eve_cupos_limitado: true,
        eve_numero_cupos: "",
        ...event,
        ...(event && {
            eve_hora: moment(event?.eve_hora,'hh:mm A' ).format('hh:mm A')
        })
    };
    const schema = Yup.object().shape({
        eve_titulo: Yup.string().required("Campo obligatorio"),
        eve_lugar_evento: Yup.string().required("Campo obligatorio"),
        eve_descripcion: Yup.string().required("Campo obligatorio"),
        eve_fecha: Yup.string().required("Campo obligatorio"),
        eve_hora: Yup.string().required("Campo obligatorio"),
        eve_cupos_limitado: Yup.boolean().required("Campo obligatorio"),
        eve_numero_cupos: Yup.number().when("eve_cupos_limitado", {
            is: true,
            then: Yup.number().nullable().required("Campo obligatorio").max(10000, 'Máximo 10.000')
        }),

    });

    const submit = (values: any, form: any) => {
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

            {({ values, handleChange }) => {
                return (
                    <Form>
                        <Tabs>
      
                        </Tabs>
                        <div className="row ">
                        <span
           style={{ fontWeight: "bold",color:"#000000",fontSize: "14px",margin:"0"}}
          >Datos generales del equipo</span>
                            <div style={{display:'flex',padding: "2% 0% 0% 5%",}} className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="title_id" style={{width: '31%',}} className="form-label">
                                Nombre y apellidos:
                                </label>
                                <div style={{display: "flex", }}>
                                <span style={{width: '70%', marginLeft:'7%',}}>Andrea Ceballos Villareal</span>
                                </div>
                            </div>

                            <div
                            style={{    display: "flex",padding: "2% 0% 0% 6%",}}
                            className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_descripcion" className="form-label">
                                Teléfono:
                                </label>
                              <div
                              style={{display: "contents",}}
                              >
                              <span style={{width: '51%', marginLeft:'7%',}} >3006183669</span>
                              </div>
                            </div>
                        </div>
                        <hr
                        style={{width: '18%'}}
                        /><hr
                        style={{width: '23%', position:"absolute",top:"39%",left:"21%"}}
                        /><hr
                        style={{width: '11%', position:"absolute",top:"39%",left:"51%"}} 
                        /><hr
                        style={{width: '23%', position:"absolute",top:"39%",left:"64.5%"}} 
                        />
                        <div className="row">
                            <div
                            style={{    display: "flex",padding: "2% 0% 0% 12%",}}
                            className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_lugar_evento_id" className="form-label">
                                Código:
                                </label>
                                <div
                              style={{display: "contents",}}
                              >
                              <span style={{width: '51%', marginLeft:'8.5%',}} >CC 101719606</span>
                              </div>
                            </div>
                            <div
                            style={{    display: "flex",padding: "2% 0% 0% 1.5%",}}
                            className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_lugar_evento_id" className="form-label">
                                Tipo de persona:
                                </label>
                                <div
                              style={{display: "contents",}}
                              >
                              <span style={{width: '51%', marginLeft:'7%',}} >Persona jurídica</span>
                              </div>
                            </div>
                            <div
                            style={{    display: "flex",padding: "2% 0% 0% 12%",}}
                            className="col-12 col-md-12  col-lg-6  ">
                                <label htmlFor="eve_lugar_evento_id" className="form-label">
                                Correo:
                                </label>
                                <div
                              style={{display: "contents",}}
                              >
                              <span style={{width: '51%', marginLeft:'9%',}} >correo@ejemplo.com</span>
                              </div>
                            </div>
                        </div>
                        <hr
                        style={{width:"16%"}}
                        /><hr
                        style={{width:"16%",left:"20%",position:"absolute",top:"81.5%"}}

                        />
                    </Form>
                );
            }}
        </Formik> 
    );
};

export default FormEvent;
