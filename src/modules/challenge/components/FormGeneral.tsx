import { Field, Form, Formik } from "formik";
import { FC } from "react";
import Input from "../../../utils/ui/CurrencyInput";
import DateInput from "../../../utils/ui/DateInput";
import DocumentInput from "../../../utils/ui/DocumentInput";
import ErrorMessage from "../../../utils/ui/ErrorMessage";
import Select from "../../../utils/ui/Select";
import * as Yup from "yup";
import { IChallenge, IGeneralInformation } from "../custom_types";

interface GeneralInformationFormPros {
  disabled?: boolean;
  type?: "view" | "create" | "edit";
  general_: IGeneralInformation;
  innerRef: any;
  onSubmit: (values: any) => void;
}

const FormGeneral: FC<GeneralInformationFormPros> = ({
  disabled,
  general_,
  innerRef,
  onSubmit,
}) => {  
  const initialValues = {
    general_information: general_
      ? { ...general_ }
      : {
          challenge_name: "",
          profiles: [],
          dimension: null,
          dependence: null,
          start_date: "",
          closing_date: "",
          description: "",
          commune: null,
          neighborhood: null,
          main_image: "",
          economic_amount: "",
          video_url: "",
          expected_results: "",
          important_data: "",
          population_impact: "",
          challenge_details: "",
          impact_type: "",
        },
  };

  const schema = Yup.object().shape({
    general_information: Yup.object({
      challenge_name: Yup.string().required("Campo obligatorio"),
      profiles: Yup.array().required("Campo obligatorio"),
      dimension: Yup.string().nullable().required("Campo obligatorio"),
      dependence: Yup.string().nullable().required("Campo obligatorio"),
      start_date: Yup.string().required("Campo obligatorio"),
      closing_date: Yup.string().required("Campo obligatorio"),
      description: Yup.string().required("Campo obligatorio"),
      commune: Yup.string().nullable().required("Campo obligatorio"),
      neighborhood: Yup.string().nullable().required("Campo obligatorio"),
      main_image: Yup.string().required("Campo obligatorio"),
      population_impact: Yup.string().required("Campo obligatorio"),
      important_data: Yup.string().required("Campo obligatorio"),
      expected_results: Yup.string().required("Campo obligatorio"),
    }),
  });

  const submit = (values: any, actions: any) => {
    onSubmit(values);
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
      {({ handleChange, values }) => {
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
                  name="general_information.challenge_name"
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
                <ErrorMessage
                  name="general_information.challenge_name"
                  withCount
                  max={80}
                />
              </div>
              <div className="col-6">
                <label htmlFor="profiles_id" className="form-label">
                  Perfiles
                </label>
                <Field
                  component={Select}
                  id="profiles_id"
                  name="general_information.profiles"
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
                <ErrorMessage name="general_information.profiles" />
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
                  name="general_information.dimension"
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
                <ErrorMessage name="general_information.dimension" />
              </div>
              <div className="col-3">
                <label htmlFor="dependence_id" className="form-label">
                  Dependencia
                </label>
                <Field
                  component={Select}
                  id="dependence_id"
                  name="general_information.dependence"
                  className=""
                  options={[
                    {
                      name: "Secretaría",
                      id: "Secretaría",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="general_information.dependence" />
              </div>
              <div className="col-3">
                <label htmlFor="start_date_id" className="form-label">
                  Fecha de inicio
                </label>
                <Field
                  component={DateInput}
                  name="general_information.start_date"
                  id="start_date_id"
                />

                <ErrorMessage name="general_information.start_date" />
              </div>
              
              <div className="col-3">
                <label htmlFor="closing_date_id" className="form-label">
                  Fecha de cierre
                </label>
                <Field
                  component={DateInput}
                  name="general_information.closing_date"
                  id="closing_date_id"
                />
                <ErrorMessage name="general_information.closing_date" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="description_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="description_id"
                  name="general_information.description"
                  autoComplete="off"
                  maxLength={250}
                  style={{ height: "38px" }}
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
                <ErrorMessage
                  name="general_information.description"
                  withCount
                  max={250}
                />
              </div>
              <div className="col-6">
                <label htmlFor="challenge_details_id" className="form-label">
                  Detalles del reto
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="challenge_details_id"
                  name="general_information.challenge_details"
                  autoComplete="off"
                  maxLength={1000}
                  style={{ height: "38px" }}
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
                <ErrorMessage
                  name="general_information.challenge_details"
                  withCount
                  max={1000}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="commune_id" className="form-label">
                  Comuna
                </label>
                <Field
                  style={{ height: "38px" }}
                  component={Select}
                  id="commune_id"
                  name="general_information.commune"
                  className=""
                  options={[
                    {
                      name: "comuna1",
                      id: "comuna1",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="general_information.commune" />
              </div>
              <div className="col-3">
                <label htmlFor="neighborhood_id" className="form-label">
                  Barrio
                </label>
                <Field
                  component={Select}
                  id="neighborhood_id"
                  name="general_information.neighborhood"
                  className=""
                  options={[
                    {
                      name: "barrio1",
                      id: "barrio1",
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="general_information.neighborhood" />
              </div>
              <div className="col-6">
                <label htmlFor="population_impact_id" className="form-label">
                  Detalle población a impactar{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="population_impact_id"
                  name="general_information.population_impact"
                  autoComplete="off"
                  style={{ height: "38px" }}
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
                <ErrorMessage
                  name="general_information.population_impact"
                  withCount
                  max={200}
                />
              </div>
              <div className="col-6">
                <label htmlFor="main_image_id" className="form-label">
                  Imagen principal
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="JPG, JPEG."
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="main_image_id"
                  name="general_information.main_image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="general_information.main_image" />
              </div>
              <div className="col-6">
                <label htmlFor="dimension_id" className="form-label">
                  Video <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="dimension_id"
                  name="general_information.video_url"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Vimeo)
                </div>
                <ErrorMessage name="general_information.video_url" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="important_data_id" className="form-label">
                  Datos importantes{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="important_data_id"
                  name="general_information.important_data"
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
                <ErrorMessage
                  name="general_information.important_data"
                  withCount
                  max={500}
                />
              </div>
              <div className="col-6">
                <label htmlFor="expected_results_id" className="form-label">
                  Resultados esperados{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="expected_results_id"
                  name="general_information.expected_results"
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
                <ErrorMessage
                  name="general_information.expected_results"
                  withCount
                  max={500}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="impact_type_id" className="form-label">
                  Tipo de impacto
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="impact_type_id"
                  name="general_information.impact_type"
                  autoComplete="off"
                  maxLength={100}
                  style={{ height: "38px" }}
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
                <ErrorMessage
                  name="general_information.impact_type"
                  withCount
                  max={100}
                />
              </div>
              <div className="col-6">
                <label htmlFor="economic_amount_id" className="form-label">
                  Monto económico
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  component={Input}
                  name="economic_amount"
                  id="economic_amount_id"
                  min={0}
                  max={10000000000}
                  maxLength={14}
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  Máx: $10.000.000.000
                </div>
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
