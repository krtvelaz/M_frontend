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
  general_?: IGeneralInformation;
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
    cha_name: "",
    cha_profile: null,
    cha_dimension: "",
    cha_dependence: "",
    cha_start_date: "",
    cha_end_date: "",
    cha_challenge_detail: "",
    cha_commune: "",
    cha_neighborhood: "",
    cha_population_detail: "",
    cha_principal_image: "",
    cha_principal_image_name: "",
    cha_video: "",
    cha_important_data: "",
    cha_expected_result: "",
    cha_economic_amount: "",
    ...general_,
  };

  const schema = Yup.object().shape({
    cha_name: Yup.string().required("Campo obligatorio"),
    cha_profile: Yup.array().required("Campo obligatorio"),
    cha_dimension: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    cha_dependence: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    cha_start_date: Yup.string().required("Campo obligatorio"),
    cha_end_date: Yup.string().required("Campo obligatorio"),
    description: Yup.string().required("Campo obligatorio"),
    cha_commune: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    cha_neighborhood: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    cha_principal_image: Yup.string().required("Campo obligatorio"),
    cha_population_detail: Yup.string().required("Campo obligatorio"),
    cha_important_data: Yup.string().required("Campo obligatorio"),
    cha_expected_result: Yup.string().required("Campo obligatorio"),
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
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="challenge_name_id" className="form-label">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="challenge_name_id"
                  name="cha_name"
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
                <ErrorMessage name="cha_name" withCount max={80} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="profiles_id" className="form-label">
                  Perfiles
                </label>
                <Field
                  component={Select}
                  id="profiles_id"
                  name="cha_profile"
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
                <ErrorMessage name="cha_profile" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="dimension_id" className="form-label">
                  Dimensión
                </label>
                <Field
                  component={Select}
                  id="dimension_id"
                  name="cha_dimension"
                  className=""
                  options={[
                    {
                      name: "Personas",
                      id: 1,
                    },
                    { name: "Medioambiente", id: 2 },
                    {
                      name: "Gobernanza",
                      id: 3,
                    },
                    {
                      name: "Economía",
                      id: 4,
                    },
                    {
                      name: "Hábitat",
                      id: 5,
                    },
                    {
                      name: "Calidad de vida",
                      id: 6,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="cha_dimension" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="dependence_id" className="form-label">
                  Dependencia
                </label>
                <Field
                  component={Select}
                  id="dependence_id"
                  name="cha_dependence"
                  className=""
                  options={[
                    {
                      name: "Secretaría",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="cha_dependence" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="start_date_id" className="form-label">
                  Fecha de inicio
                </label>
                <Field
                  component={DateInput}
                  name="cha_start_date"
                  id="start_date_id"
                />

                <ErrorMessage name="cha_start_date" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="closing_date_id" className="form-label">
                  Fecha de cierre
                </label>
                <Field
                  component={DateInput}
                  name="cha_end_date"
                  id="closing_date_id"
                />
                <ErrorMessage name="cha_end_date" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="description_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="description_id"
                  name="description"
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
                <ErrorMessage name="description" withCount max={250} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="challenge_details_id" className="form-label">
                  Detalles del reto
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="challenge_details_id"
                  name="cha_challenge_detail"
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
                  name="cha_challenge_detail"
                  withCount
                  max={1000}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3 col-lg-3">
                <label htmlFor="commune_id" className="form-label">
                  Comuna
                </label>
                <Field
                  style={{ height: "38px" }}
                  component={Select}
                  id="commune_id"
                  name="cha_commune"
                  className=""
                  options={[
                    {
                      name: "comuna1",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="cha_commune" />
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <label htmlFor="neighborhood_id" className="form-label">
                  Barrio
                </label>
                <Field
                  component={Select}
                  id="neighborhood_id"
                  name="cha_neighborhood"
                  className=""
                  options={[
                    {
                      name: "barrio1",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="cha_neighborhood" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="population_impact_id" className="form-label">
                  Detalle población a impactar{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="population_impact_id"
                  name="cha_population_detail"
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
                  name="cha_population_detail"
                  withCount
                  max={200}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="cha_principal_image_id" className="form-label">
                  Imagen principal
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="JPG, JPEG."
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="cha_principal_image_id"
                  name="cha_principal_image"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="cha_principal_image" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="dimension_id" className="form-label">
                  Video <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="dimension_id"
                  name="cha_video"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Vimeo)
                </div>
                <ErrorMessage name="cha_video" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="important_data_id" className="form-label">
                  Datos importantes{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="important_data_id"
                  name="cha_important_data"
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
                <ErrorMessage name="cha_important_data" withCount max={500} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="expected_results_id" className="form-label">
                  Resultados esperados{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="expected_results_id"
                  name="cha_expected_result"
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
                <ErrorMessage name="cha_expected_result" withCount max={500} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="impact_type_id" className="form-label">
                  Tipo de impacto
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="impact_type_id"
                  name="impact_type"
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
                <ErrorMessage name="impact_type" withCount max={100} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="economic_amount_id" className="form-label">
                  Monto económico
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  component={Input}
                  name="cha_economic_amount"
                  id="economic_amount_id"
                  min={0}
                  max={10000000000}
                  maxLength={14}
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  Máx: $10.000.000.000
                </div>
                <ErrorMessage name="cha_economic_amount" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGeneral;
