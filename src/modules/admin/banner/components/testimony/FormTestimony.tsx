import { Formik, Form,  Field } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../../../utils/ui";
import { ITestimony } from "../../custom_types";

interface TestimonyFormPros {
  innerRef: any;
  onSubmit: (values: any, form?: any) => any;
  testimony?: ITestimony;
  type: 'create' | 'edit'
}
const FormTestimony: FC<TestimonyFormPros> = ({
  innerRef,
  onSubmit,
  testimony,
  type,
}) => {
  const initial_values = {
    tes_titulo: "",
    tes_descripcion: "",
    tes_imagen: {
      name: testimony?.tes_nombre_imagen || "",
      id: testimony?.id,
    },
    tes_logo: {
      name: testimony?.tes_nombre_logo || "",
      id: testimony?.id,
    },
    ...testimony,
    

  };
  

  const schema = Yup.object().shape({
    tes_titulo: Yup.string().required("Campo obligatorio"),
    tes_descripcion: Yup.string().required("Campo obligatorio"),
    tes_imagen: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
    tes_logo: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
    }).nullable(),
  });
  

  const submit = async (values: any, form: any) => {
    await onSubmit(values);
    // form.setSubmitting(false);
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
      {({ values, handleChange, errors, touched, setFieldValue, isSubmitting }) => {  
         
        return (
          <Form>
            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="tes_titulo_id" className="form-label">
                  Titulo
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="tes_titulo_id"
                  name="tes_titulo"
                  autoComplete="off"
                  maxLength={70}
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
                <ErrorMessage name="tes_titulo" withCount max={70} />
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="tes_descripcion_id" className="form-label">
                  Descripción
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="tes_descripcion_id"
                  name="tes_descripcion"
                  autoComplete="off"
                  maxLength={300}
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
                <ErrorMessage name="tes_descripcion" withCount max={300} />
              </div>
            </div>

            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="tes_imagen_id" className="form-label">
                  Imagen - Empresario
                </label>
                <Field
                  file_type="img"
                  maximum_size={2}
                  component={DocumentInput}
                  className="form-control"
                  id="tes_imagen_id"
                  name="tes_imagen"
                  autoComplete="off"
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
                <ErrorMessage name="tes_imagen.name" />
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="tes_logo_id" className="form-label">
                  Imagen - Logo
                </label>
                <Field
                  file_type="img"
                  maximum_size={2}
                  component={DocumentInput}
                  className="form-control"
                  id="tes_logo_id"
                  name="tes_logo"
                  autoComplete="off"
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
                <ErrorMessage name="tes_logo.name" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormTestimony;
