import { Field, Form, Formik } from "formik";
import { FC } from "react";
import Input from "../../../../utils/ui/CurrencyInput";
import DateInput from "../../../../utils/ui/DateInput";
import DocumentInput from "../../../../utils/ui/DocumentInput";
import ErrorMessage from "../../../../utils/ui/ErrorMessage";
import Select from "../../../../utils/ui/Select";
import * as Yup from "yup";
import { IGeneralInformation, IMasters } from "../custom_types";
import moment from "moment";
import { TimeRangePickerProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux";

interface GeneralInformationFormPros {
  disabled?: boolean;
  type?: "view" | "create" | "edit";
  general_?: IGeneralInformation;
  innerRef: any;
  onSubmit: (values: any) => void;
  communes: any;
  dimensions: any;
  dependencies: any;
  profiles: any;
}

const FormGeneral: FC<GeneralInformationFormPros> = ({
  disabled,
  general_,
  innerRef,
  onSubmit,
  communes,
  dimensions,
  dependencies,
  profiles,
}) => {
  const initialValues = {
    ret_nombre: "",
    ret_perfil: [],
    ret_id_dimension: "",
    ret_id_dependencia: "",
    ret_fecha_inicio: "",
    ret_fecha_final: "",
    ret_detalle_poblacion_impactar: "",
    ret_id_comuna: "",
    ret_id_barrio: "",
    ret_detalles: "",
    ret_imagen_principal: {
      name: general_?.ret_nombre_imagen || "",
    },
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
  const neighborhoods: any = useSelector(
    (store: any) => store.challenge.neighborhoods.value
  );
  const dispatch = useDispatch<any>();
  const schema = Yup.object().shape({
    ret_nombre: Yup.string().required("Campo obligatorio"),
    ret_perfil: Yup.array().min(1, "Campo obligatorio"),
    ret_id_dimension: Yup.string().nullable().required("Campo obligatorio"),
    ret_id_dependencia: Yup.number().nullable().required("Campo obligatorio"),
    ret_fecha_inicio: Yup.string().required("Campo obligatorio"),
    ret_fecha_final: Yup.string().required("Campo obligatorio"),
    ret_descripcion: Yup.string().required("Campo obligatorio"),
    ret_id_comuna: Yup.string().nullable().required("Campo obligatorio"),
    ret_id_barrio: Yup.string().nullable().required("Campo obligatorio"),
    ret_imagen_principal: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
    ret_detalle_poblacion_impactar: Yup.string().required("Campo obligatorio"),
    ret_dato_importante: Yup.string().required("Campo obligatorio"),
    ret_resultado_esperado: Yup.string().required("Campo obligatorio"),
    ret_detalles: Yup.string().required("Campo obligatorio"),
    ret_video: Yup.string().url("Por favor ingrese una url"),
    ret_monto: Yup.number().max(10000000000, "El máximo es $10.000.000.000"),
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
        const disabledDate: TimeRangePickerProps["disabledDate"] = (
          current
        ) => {
          return (
            current && current < moment(values?.ret_fecha_inicio).endOf("day")
          );
        };
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
                  maxTagCount="responsive"
                  showArrow
                  dropdownMatchSelectWidth={false}
                  id="ret_perfil_id"
                  name="ret_perfil"
                  className=""
                  options={profiles?.map((profile: any) => ({
                    id: profile?.id,
                    name: profile?.name,
                  }))}
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
                  name="ret_id_dimension"
                  className=""
                  options={dimensions?.map((dimension: any) => ({
                    id: dimension?.id,
                    name: dimension?.maedim_nombre,
                  }))}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_id_dimension" />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="ret_dependencia_id" className="form-label">
                  Dependencia
                </label>
                <Field
                  component={Select}
                  id="ret_dependencia_id"
                  name="ret_id_dependencia"
                  className=""
                  options={dependencies.map((dependency: any) => ({
                    id: dependency?.id,
                    name: dependency?.maedep_nombre,
                  }))}
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_id_dependencia" />
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
                  disabledDate={disabledDate}
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
                />
                <ErrorMessage name="ret_descripcion" withCount max={250} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label
                  htmlFor="ret_detalle_postulacion_id"
                  className="form-label"
                >
                  Detalles del reto
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_detalles_id"
                  name="ret_detalles"
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
                  name="ret_detalles"
                  withCount
                  max={100}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_comuna_id" className="form-label">
                  Lugar del reto
                </label>
                <div className="row">
                  <div className="col-6">
                    <Field
                      style={{ height: "38px" }}
                      component={Select}
                      id="ret_comuna_id"
                      name="ret_id_comuna"
                      className=""
                      options={communes?.map((commune: any) => ({
                        id: commune?.id,
                        name: commune?.commune,
                      }))}
                      extra_on_change={(id_commune: number) => {
                        dispatch(actions.get_neighborhoods(id_commune));
                      }}
                      placeholder="Seleccionar…"
                    />
                    <ErrorMessage name="ret_id_comuna" />
                  </div>
                  <div className="col-6">
                    <Field
                      component={Select}
                      id="ret_barrio_id"
                      name="ret_id_barrio"
                      className=""
                      options={neighborhoods?.map((neighborhood: any) => ({
                        id: neighborhood?.id,
                        name: neighborhood?.neighborhood,
                      }))}
                      placeholder="Seleccionar…"
                    />
                    <ErrorMessage name="ret_id_barrio" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_detalles_poblacion_impactar_id" className="form-label">
                  Detalle población a impactar{" "}
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="ret_detalles_poblacion_impactar_id"
                  name="ret_detalle_poblacion_impactar"
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
                <ErrorMessage name="ret_detalle_poblacion_impactar" withCount max={200} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="ret_imagen_principal_id" className="form-label">
                  Imagen principal
                </label>
                <Field
                  component={DocumentInput}
                  file_type="img"
                  type_image="JPEG"
                  maximum_size={2}
                  type="text"
                  id="ret_imagen_principal_id"
                  name="ret_imagen_principal"
                  className="form-control"
                  placeholder="Seleccionar…"
                />
                <ErrorMessage name="ret_imagen_principal.name" />
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
                <label
                  htmlFor="ret_resultado_esperado_id"
                  className="form-label"
                >
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
                <ErrorMessage
                  name="ret_resultado_esperado"
                  withCount
                  max={500}
                />
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
                  // max={10000000000}
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
