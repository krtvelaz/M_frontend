import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../../utils/ui";
import { ITestimony } from "../../custom_types";

interface TestimonyFormPros {
  innerRef: any;
  onSubmit: (values: any, form?: any) => any;
  testimony?: ITestimony;
}
const FormTestimony: FC<TestimonyFormPros> = ({
  innerRef,
  onSubmit,
  testimony,
}) => {
  const initial_values = {
    mas_title: "",
    mas_description: "",
    mas_image: "",
    mas_logo: "",
    ...testimony,
  };

  const schema = Yup.object().shape({
    mas_title: Yup.string().required("Campo obligatorio"),
    mas_description: Yup.string().required("Campo obligatorio"),
    mas_image: Yup.string().required("Campo obligatorio"),
    mas_logo: Yup.string().required("Campo obligatorio"),
  });

  const submit = (values: any, form: any) => {
    onSubmit(values);
    form.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initial_values}
      validationSchema={schema}
      innerRef={innerRef}
    >
      {({ values, handleChange, isSubmitting }) => {
       
        
        return (
          <Form>
            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="mas_title_id" className="form-label">
                  Titulo
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="mas_title_id"
                  name="mas_title"
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
                <ErrorMessage name="mas_title" withCount max={70} />
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="mas_description_id" className="form-label">
                  Descripción
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="mas_description_id"
                  name="mas_description"
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
                <ErrorMessage name="mas_description" withCount max={300} />
              </div>
            </div>

            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="mas_image_id" className="form-label">
                  Imagen - Empresario
                </label>
                <Field
                  file_type="img"
                  maximum_size={2}
                  component={DocumentInput}
                  className="form-control"
                  id="mas_id"
                  name="mas_image"
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
                <ErrorMessage name="mas_image" />
                
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="mas_logo_id" className="form-label">
                  Imagen - Logo
                </label>
                <Field
                  file_type="img"
                  maximum_size={2}
                  component={DocumentInput}
                  className="form-control"
                  id="mas_logo_id"
                  name="mas_logo"
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
                <ErrorMessage name="mas_logo"  />

              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormTestimony;
