import { Field, Form, Formik } from "formik";
import { FC } from "react";
import Input from "../../../utils/ui/CurrencyInput";
import DateInput from "../../../utils/ui/DateInput";
import DocumentInput from "../../../utils/ui/DocumentInput";
import ErrorMessage from "../../../utils/ui/ErrorMessage";
import Select from "../../../utils/ui/Select";
import * as Yup from "yup";
import { IChallenge, IGeneralInformation } from "../custom_types";
import moment from "moment";

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
    ret_nombre: "",
    ret_perfil: [],
    ret_dimension: "",
    ret_dependencia: "",
    ret_fecha_inicio: "",
    ret_fecha_final: "",
    ret_detalles: "",
    ret_comuna: "",
    ret_barrio: "",
    ret_detalle_postulacion: "",
    ret_ruta_imagen_principal: "",
    ret_nombre_imagen: "",
    ret_video: "",
    ret_dato_importante: "",
    ret_resultado_esperado: "",
    ret_monto: "",
    ret_descripcion: "",
    ret_tipo_impacto: "",
    ...general_,
  };

  const schema = Yup.object().shape({
    ret_nombre: Yup.string().required("Campo obligatorio"),
    ret_perfil: Yup.array().required("Campo obligatorio"),
    ret_dimension: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    ret_dependencia: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    ret_fecha_inicio: Yup.string().required("Campo obligatorio"),
    ret_fecha_final: Yup.string().required("Campo obligatorio"),
    ret_descripcion: Yup.string().required("Campo obligatorio"),
    ret_comuna: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    ret_barrio: Yup.string()
      .nullable()
      .required("Campo obligatorio"),
    ret_ruta_imagen_principal: Yup.string().required("Campo obligatorio"),
    ret_detalles: Yup.string().required("Campo obligatorio"),
    ret_dato_importante: Yup.string().required("Campo obligatorio"),
    ret_resultado_esperado: Yup.string().required("Campo obligatorio"),
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
                <label htmlFor="ret_nombre_id" className="form-label">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="ret_nombre_id"
                  name="ret_nombre"
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
                <ErrorMessage name="ret_nombre" withCount max={80} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_perfil_id" className="form-label">
                  Perfiles
                </label>
                <Field
                  component={Select}
                  id="ret_perfil_id"
                  name="ret_perfil"
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
                <ErrorMessage name="ret_perfil" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="ret_dimension_id" className="form-label">
                  Dimensión
                </label>
                <Field
                  component={Select}
                  id="ret_dimension_id"
                  name="ret_dimension"
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
                <ErrorMessage name="ret_dimension" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="ret_dependencia_id" className="form-label">
                  Dependencia
                </label>
                <Field
                  component={Select}
                  id="ret_dependencia_id"
                  name="ret_dependencia"
                  className=""
                  options={[
                    {
                      name: "Secretaría",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_dependencia" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="ret_fecha_inicio_id" className="form-label">
                  Fecha de inicio
                </label>
                <Field
                  component={DateInput}
                  name="ret_fecha_inicio"
                  id="ret_fecha_inicio_id"
                />

                <ErrorMessage name="ret_fecha_inicio" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="ret_fecha_final_id" className="form-label">
                  Fecha de cierre
                </label>
                <Field
                  component={DateInput}
                  name="ret_fecha_final"
                  id="ret_fecha_final_id"
                  min={moment(values.ret_fecha_inicio).format('YYYY-MM-DD')}
                />
                <ErrorMessage name="ret_fecha_final" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_descripcion_id" className="form-label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_descripcion_id"
                  name="ret_descripcion"
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
                <ErrorMessage name="ret_descripcion" withCount max={250} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_detalle_postulacion_id" className="form-label">
                  Detalles del reto
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_detalle_postulacion_id"
                  name="ret_detalle_postulacion"
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
                  name="ret_detalle_postulacion"
                  withCount
                  max={1000}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3 col-lg-3">
                <label htmlFor="ret_comuna_id" className="form-label">
                  Comuna
                </label>
                <Field
                  style={{ height: "38px" }}
                  component={Select}
                  id="ret_comuna_id"
                  name="ret_comuna"
                  className=""
                  options={[
                    {
                      name: "comuna1",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_comuna" />
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <label htmlFor="ret_barrio_id" className="form-label">
                  Barrio
                </label>
                <Field
                  component={Select}
                  id="ret_barrio_id"
                  name="ret_barrio"
                  className=""
                  options={[
                    {
                      name: "barrio1",
                      id: 1,
                    },
                  ]}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_barrio" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_detalles_id" className="form-label">
                  Detalle población a impactar{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_detalles_id"
                  name="ret_detalles"
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
                  name="ret_detalles"
                  withCount
                  max={200}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_ruta_imagen_principal_id" className="form-label">
                  Imagen principal
                </label>
                <Field
                  component={DocumentInput}
                  tipos_doc="JPG, JPEG."
                  maximum_size={2}
                  file_type="img"
                  type="text"
                  id="ret_ruta_imagen_principal_id"
                  name="ret_ruta_imagen_principal"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_ruta_imagen_principal" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_video_id" className="form-label">
                  Video <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  type="text"
                  id="ret_video_id"
                  name="ret_video"
                  className="form-control"
                  autoComplete="off"
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  URL embebida (YouTube, Vimeo)
                </div>
                <ErrorMessage name="ret_video" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_dato_importante_id" className="form-label">
                  Datos importantes{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="ret_dato_importante_id"
                  name="ret_dato_importante"
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
                <ErrorMessage name="ret_dato_importante" withCount max={500} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_resultado_esperado_id" className="form-label">
                  Resultados esperados{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  style={{ height: "38px" }}
                  id="ret_resultado_esperado_id"
                  name="ret_resultado_esperado"
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
                <ErrorMessage name="ret_resultado_esperado" withCount max={500} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_tipo_impacto_id" className="form-label">
                  Tipo de impacto
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_tipo_impacto_id"
                  name="ret_tipo_impacto"
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
                <ErrorMessage name="ret_tipo_impacto" withCount max={100} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_monto_id" className="form-label">
                  Monto económico
                  <span style={{ fontSize: "10px" }}> - Opcional </span>
                </label>
                <Field
                  component={Input}
                  name="ret_monto"
                  id="ret_monto_id"
                  min={0}
                  max={10000000000}
                  maxLength={14}
                />
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  Máx: $10.000.000.000
                </div>
                <ErrorMessage name="ret_monto" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGeneral;
