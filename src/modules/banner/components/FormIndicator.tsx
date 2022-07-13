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
        number_challenge:"0",
        number_person:"0",
        number_actor:"0",
        number_solution:"0",
        description_challenge:"",
        description_person:"",
        description_actor:"",
        description_solution:"",
        ...indicator
    };

    const schema = Yup.object().shape({
        number_challenge:Yup.string().required("Campo obligatorio"),
        number_person:Yup.string().required("Campo obligatorio"),
        number_actor:Yup.string().required("Campo obligatorio"),
        number_solution:Yup.string().required("Campo obligatorio"),
        description_challenge:Yup.string().required("Campo obligatorio"),
        description_person:Yup.string().required("Campo obligatorio"),
        description_actor:Yup.string().required("Campo obligatorio"),
        description_solution:Yup.string().required("Campo obligatorio"),
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
                <div className="col-6 col-md-6   ">
                        <label htmlFor="number_challenge_id" className="form-label">
                        Número de Retos lanzados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="number_challenge_id"
                        name="number_challenge"
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
                        <ErrorMessage name="number_challenge" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="description_challenge_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="description_challenge_id"
                        name="description_challenge"
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
                        <ErrorMessage name="description_challenge" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-6 col-md-6   ">
                        <label htmlFor="number_person_id" className="form-label">
                        Número de Personas impactadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="number_person_id"
                        name="number_person"
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
                        <ErrorMessage name="number_person" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="description_person_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="description_person_id"
                        name="description_person"
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
                        <ErrorMessage name="description_person" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-6 col-md-6   ">
                        <label htmlFor="number_actor_id" className="form-label">
                        Número de Actores conectados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="number_actor_id"
                        name="number_actor"
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
                        <ErrorMessage name="number_actor" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="description_actor_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="description_actor_id"
                        name="description_actor"
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
                        <ErrorMessage name="description_actor" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
                    <div className="col-6 col-md-6   ">
                        <label htmlFor="number_solution_id" className="form-label">
                        Número de Soluciones implementadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="number_solution_id"
                        name="number_solution"
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
                        <ErrorMessage name="number_solution" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="description_solution_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="description_solution_id"
                        name="description_solution"
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
                        <ErrorMessage name="description_solution" withCount max={48} />
                    </div>
              </div>

              
              
            </Form>
          );
        }}
      </Formik>
    );
}

export default FormIndicator