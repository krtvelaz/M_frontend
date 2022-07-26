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
        mas_challenges_number:"",
        mas_impacted_people:"",
        mas_connected_actors:"",
        mas_implemented_solutions:"",
        mas_description_challenges_number:"",
        mas_description_impacted_people:"",
        mas_description_connected_actors:"",
        mas_description_implemented_solutions:"",
        ...indicator
    };

    const schema = Yup.object().shape({
        mas_challenges_number:Yup.string().required("Campo obligatorio"),
        mas_impacted_people:Yup.string().required("Campo obligatorio"),
        mas_connected_actors:Yup.string().required("Campo obligatorio"),
        mas_implemented_solutions:Yup.string().required("Campo obligatorio"),
        mas_description_challenges_number:Yup.string().required("Campo obligatorio"),
        mas_description_impacted_people:Yup.string().required("Campo obligatorio"),
        mas_description_connected_actors:Yup.string().required("Campo obligatorio"),
        mas_description_implemented_solutions:Yup.string().required("Campo obligatorio"),
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
                        <label htmlFor="mas_challenges_number_id" className="form-label">
                        Número de Retos lanzados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="mas_challenges_number_id"
                        name="mas_challenges_number"
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
                        <ErrorMessage name="mas_challenges_number" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="mas_description_challenges_number_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="mas_description_challenges_number_id"
                        name="mas_description_challenges_number"
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
                        <ErrorMessage name="mas_description_challenges_number" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-6 col-md-6   ">
                        <label htmlFor="mas_impacted_people_id" className="form-label">
                        Número de Personas impactadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="mas_impacted_people_id"
                        name="mas_impacted_people"
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
                        <ErrorMessage name="mas_impacted_people" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="mas_description_impacted_people_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="mas_description_impacted_people_id"
                        name="mas_description_impacted_people"
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
                        <ErrorMessage name="mas_description_impacted_people" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-6 col-md-6   ">
                        <label htmlFor="mas_connected_actors_id" className="form-label">
                        Número de Actores conectados
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="mas_connected_actors_id"
                        name="mas_connected_actors"
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
                        <ErrorMessage name="mas_connected_actors" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="mas_description_connected_actors_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="mas_description_connected_actors_id"
                        name="mas_description_connected_actors"
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
                        <ErrorMessage name="mas_description_connected_actors" withCount max={48} />
                    </div>
              </div>

              <div className="row ">
                    <div className="col-6 col-md-6   ">
                        <label htmlFor="mas_implemented_solutions_id" className="form-label">
                        Número de Soluciones implementadas
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="mas_implemented_solutions_id"
                        name="mas_implemented_solutions"
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
                        <ErrorMessage name="mas_implemented_solutions" withCount max={6} />
                    </div>

                    <div className={`col-6 col-md-6  `}>
                        <label htmlFor="mas_description_implemented_solutions_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="mas_description_implemented_solutions_id"
                        name="mas_description_implemented_solutions"
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
                        <ErrorMessage name="mas_description_implemented_solutions" withCount max={48} />
                    </div>
              </div>

              
              
            </Form>
          );
        }}
      </Formik>
    );
}

export default FormIndicator