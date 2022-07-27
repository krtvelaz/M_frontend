import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../utils/ui";
import { IIndicator } from "../custom_types";

interface IndicarFormPros {
  innerRef: any;
  onSubmit: (values:any, form?:any) => any;
  indicator?: IIndicator
}
const FormIndicator: FC<IndicarFormPros> = ({ innerRef ,onSubmit, indicator}) => { 

    const initial_values = {
        est_numero_reto:"",
        est_persona_impacto:"",
        est_actores_conectados:"",
        est_solucion_implementada:"",
        est_descripcion_numero_reto:"",
        est_descripcion_persona_impacto:"",
        est_descripcion_actores_conectados:"",
        est_descripcion_solucion_implementada:"",
        ...indicator
    };

    const schema = Yup.object().shape({
        est_numero_reto:Yup.string().required("Campo obligatorio"),
        est_persona_impacto:Yup.string().required("Campo obligatorio"),
        est_actores_conectados:Yup.string().required("Campo obligatorio"),
        est_solucion_implementada:Yup.string().required("Campo obligatorio"),
        est_descripcion_numero_reto:Yup.string().required("Campo obligatorio"),
        est_descripcion_persona_impacto:Yup.string().required("Campo obligatorio"),
        est_descripcion_actores_conectados:Yup.string().required("Campo obligatorio"),
        est_descripcion_solucion_implementada:Yup.string().required("Campo obligatorio"),
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
            <Form >
                <div className="row ">
                <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_numero_reto_id" className="form-label">
                        Número de Retos lanzados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="est_numero_reto_id"
                        name="est_numero_reto"
                        autoComplete="off"
                        min={0}
                        max={999999}
                        onChange={(e:any) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,6}$/;
                            if (regex.test(value.toString())) {
                                handleChange(e);
                            }
                        }
                    }
                        />
                        <ErrorMessage name="est_numero_reto" withCount max={6} />
                    </div>

                    <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_descripcion_numero_reto_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="est_descripcion_numero_reto_id"
                        name="est_descripcion_numero_reto"
                        autoComplete="off"
                        maxLength={48}
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
                        <ErrorMessage name="est_descripcion_numero_reto" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_persona_impacto_id" className="form-label">
                        Número de Personas impactadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="est_persona_impacto_id"
                        name="est_persona_impacto"
                        autoComplete="off"
                        min={0}
                        max={999999}
                        onChange={(e:any) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,6}$/;
                            if (regex.test(value.toString())) {
                                handleChange(e);
                            }
                        }
                    }
                        />
                        <ErrorMessage name="est_persona_impacto" withCount max={6} />
                    </div>

                    <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_descripcion_persona_impacto_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="est_descripcion_persona_impacto_id"
                        name="est_descripcion_persona_impacto"
                        autoComplete="off"
                        maxLength={48}
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
                        <ErrorMessage name="est_descripcion_persona_impacto" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_actores_conectados_id" className="form-label">
                        Número de Actores conectados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="est_actores_conectados_id"
                        name="est_actores_conectados"
                        autoComplete="off"
                        min={0}
                        max={999999}
                        onChange={(e:any) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,6}$/;
                            if (regex.test(value.toString())) {
                                handleChange(e);
                            }
                        }
                    }
                        />
                        <ErrorMessage name="est_actores_conectados" withCount max={6} />
                    </div>

                    <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_descripcion_actores_conectados_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="est_descripcion_actores_conectados_id"
                        name="est_descripcion_actores_conectados"
                        autoComplete="off"
                        maxLength={48}
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
                        <ErrorMessage name="est_descripcion_actores_conectados" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
                    <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_solucion_implementada_id" className="form-label">
                        Número de Soluciones implementadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="est_solucion_implementada_id"
                        name="est_solucion_implementada"
                        autoComplete="off"
                        min={0}
                        max={999999}
                        onChange={(e:any) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,6}$/;
                            if (regex.test(value.toString())) {
                                handleChange(e);
                            }
                        }
                    }
                        />
                        <ErrorMessage name="est_solucion_implementada" withCount max={6} />
                    </div>

                    <div className="col-12 col-md-12  col-lg-6  ">
                        <label htmlFor="est_descripcion_solucion_implementada_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="est_descripcion_solucion_implementada_id"
                        name="est_descripcion_solucion_implementada"
                        autoComplete="off"
                        maxLength={48}
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
                        <ErrorMessage name="est_descripcion_solucion_implementada" withCount max={48} />
                    </div>
              </div>

              
              
            </Form>
          );
        }}
      </Formik>
    );
}

export default FormIndicator