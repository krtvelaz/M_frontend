import { Field, Form, Formik } from "formik";
import { FC } from "react";
import Input from "../../../utils/ui/CurrencyInput";
import DateInput from "../../../utils/ui/DateInput";
import DocumentInput from "../../../utils/ui/DocumentInput";
import ErrorMessage from "../../../utils/ui/ErrorMessage";
import Select from "../../../utils/ui/Select";
import * as Yup from "yup";

const FormGeneral: FC<{ innerRef?: any }> = ({ innerRef }) => {
  const initialValues = {
    challenge_name: "",
    profiles: "",
    dimension: "",
    dependence: "",
    start_date: "",
    closing_date: "",
    commune: "",
    neighborhood: "",
    main_image: "",
    economic_amount: "",
  };

  const schema = Yup.object().shape({
    challenge_name: Yup.string()
      .required("Campo obligatorio")
      .max(80, "El nombre debe tener máximo 80 caracteres"),
    profiles: Yup.string().required("Campo obligatorio"),
    dimension: Yup.string().required("Campo obligatorio"),
    dependence: Yup.string().required("Campo obligatorio"),
    start_date: Yup.string().required("Campo obligatorio"),
    closing_date: Yup.string().required("Campo obligatorio"),
    commune: Yup.string().required("Campo obligatorio"),
    neighborhood: Yup.string().required("Campo obligatorio"),
    main_image: Yup.string().required("Campo obligatorio"),
    economic_amount: Yup.number()
      .min(0, "El minimo es 0")
      .max(99999999999, "El máximo 11 es caracteres"),
  });

  const submit = (values: any, actions: any) => {
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ handleChange }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-6">
                <label htmlFor="challenge_name_id" className="form-label">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="challenge_name_id"
                  name="challenge_name"
                  className="form-control"
                  aria-describedby="nombre del reto"
                  autoComplete="off"
                  maxLength={80}
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
                <ErrorMessage name="challenge_name" withCount max={80} />
              </div>
              <div className="col-6">
                <label htmlFor="profiles_id" className="form-label">
                  Perfiles
                </label>
                <Field
                  component={Select}
                  id="profiles_id"
                  name="profiles"
                  className=""
                  options={[
                    {
                      name: "Grupo de investigación",
                      id: "Grupo de investigación",
                    },
                    { name: "Persona jurídica", id: "Persona jurídica" },
                    {
                      name: "Equipo de innovadores",
                      id: "Equipo de innovadores",
                    },
                  ]}
                  placeholder="Seleccione uno o más perfiles…"
                  mode="multiple"
                  showSearch
                  filterOption={(input: any, option: any) => {
                    return (
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                />
                <ErrorMessage name="profiles" />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="dimension_id" className="form-label">
                  Dimensión
                </label>
                <Field
                  component={Select}
                  id="dimension_id"
                  name="dimension"
                  className=""
                  options={[
                    {
                      name: "Personas",
                      id: "Personas",
                    },
                    { name: "Medioambiente", id: "Medioambiente" },
                    {
                      name: "Gobernanza",
                      id: "Gobernanza",
                    },
                    {
                      name: "Economía",
                      id: "Economía",
                    },
                    {
                      name: "Hábitat",
                      id: "Hábitat",
                    },
                    {
                      name: "Calidad de vida",
                      id: "Calidad de vida",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="dimension" />
              </div>
              <div className="col-3">
                <label htmlFor="dependence_id" className="form-label">
                  Dependencia
                </label>
                <Field
                  component={Select}
                  id="dependence_id"
                  name="dependence"
                  className=""
                  options={[
                    {
                      name: "Secretaría",
                      id: "Secretaría",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="dependence" />
              </div>
              <div className="col-3">
                <label htmlFor="start_date_id" className="form-label">
                  Fecha de inicio
                </label>
                <Field
                  component={DateInput}
                  name="start_date"
                  id="start_date_id"
                />
                <ErrorMessage name="start_date" />
              </div>
              <div className="col-3">
                <label htmlFor="closing_date_id" className="form-label">
                  Fecha de cierre
                </label>
                <Field
                  component={DateInput}
                  name="closing_date"
                  id="closing_date_id"
                />
                <ErrorMessage name="closing_date" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="dimension_id" className="form-label">
                  Detalles del reto
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="tenure_id"
                  name="now.tenure"
                  autoComplete="off"
                  maxLength={1000}
                  style={{ height: "32px" }}
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
                <ErrorMessage name="now.tenure" withCount max={1000} />
              </div>
              <div className="col-3">
                <label htmlFor="commune_id" className="form-label">
                  Comuna
                </label>
                <Field
                  style={{ height: "32px" }}
                  component={Select}
                  id="commune_id"
                  name="commune"
                  className=""
                  options={[
                    {
                      name: "comuna1",
                      id: "comuna1",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="commune" />
              </div>
              <div className="col-3">
                <label htmlFor="neighborhood_id" className="form-label">
                  Barrio
                </label>
                <Field
                  component={Select}
                  id="neighborhood_id"
                  name="neighborhood"
                  className=""
                  options={[
                    {
                      name: "barrio1",
                      id: "barrio1",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="neighborhood" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="population_id" className="form-label">
                  Detalle población a impactar - Opcional
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="population_id"
                  name="population"
                  autoComplete="off"
                  style={{ height: "32px" }}
                  maxLength={200}
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
                <ErrorMessage name="population" withCount max={200} />
              </div>
              <div className="col-6">
                <label htmlFor="main_image_id" className="form-label">
                  Imagen principal
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="PNG, JPG."
                  maximum_size={2}
                  type="text"
                  id="main_image_id"
                  name="main_image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="main_image" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="dimension_id" className="form-label">
                  Video - Opcional
                </label>
                <Field
                  type="text"
                  id="dimension_id"
                  name="dimension"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="now.tenure" />
              </div>
              <div className="col-6">
                <label htmlFor="important_data_id" className="form-label">
                  Datos importantes - Opcional
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "32px" }}
                  id="important_data_id"
                  name="important_data"
                  autoComplete="off"
                  maxLength={500}
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
                <ErrorMessage name="important_data" withCount max={500} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="expected_results_id" className="form-label">
                  Resultados esperados - Opcional
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "32px" }}
                  id="expected_results_id"
                  name="expected_results"
                  autoComplete="off"
                  maxLength={500}
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
                <ErrorMessage name="expected_results" withCount max={500} />
              </div>
              <div className="col-6">
                <label htmlFor="economic_amount_id" className="form-label">
                  Monto económico
                </label>
                <Field
                  component={Input}
                  name="economic_amount"
                  id="economic_amount_id"
                  min={0}
                  max={99999999999}
                  maxLength={14}
                />
                <ErrorMessage name="economic_amount" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGeneral;
