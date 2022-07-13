import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../../utils/ui";
import { ITestimony } from "../../custom_types";

interface BannerFormPros {
  innerRef: any;
  onSubmit: (values:any, form?:any) => any;
  testimony?: ITestimony
}
const FormTestimony : FC<BannerFormPros> = ({ innerRef ,onSubmit, testimony}) => { 

    const initial_values = {
        image_logo:"",
        image_entrepreneur:"",
        title:"",
        description:"",
        ...testimony
    };

    const schema = Yup.object().shape({
        title: Yup.string().required("Campo obligatorio"),
        description: Yup.string().required("Campo obligatorio"),
        image_entrepreneur: Yup.string().required("Campo obligatorio"),
        image_logo: Yup.string().required("Campo obligatorio"), 
    });
  
    const submit = (values: any, form: any) => {
        onSubmit(values);
        form.setSubmitting(false);
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
        {({ values, handleChange }) => {
          return (
            <Form >
                <div className="row ">
                    <div className="col-6">
                        <label htmlFor="title_id" className="form-label">
                        Titulo
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="title_id"
                        name="title"
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
                        <ErrorMessage name="title" withCount max={70} />
                    </div>

                    <div className={`col-12 col-md-6 `}>
                        <label htmlFor="description_id" className="form-label">
                        Descripción
                        </label>
                        <Field
                        as="textarea"
                        style={{ height: "38px" }}
                        className="form-control"
                        id="description_id"
                        name="description"
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
                        <ErrorMessage name="description" withCount max={300} />
                    </div>
              </div>

              <div className="row ">
              <div className="col-6">
                        <label htmlFor="image_entrepreneur" className="form-label">
                        Imagen - Empresario
                        </label>
                        <Field
                        file_type = "img"
                        maximum_size = {2}
                        component = {DocumentInput}
                        className="form-control"
                        id="image_entrepreneur_id"
                        name="image_entrepreneur"
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
                    </div>

                    <div className="col-6">
                        <label htmlFor="image_logo" className="form-label">
                        Imagen - Logo
                        </label>
                        <Field
                        file_type = "img"
                        maximum_size = {2}
                        component = {DocumentInput}
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
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
                    </div>
              </div>
              
            </Form>
          );
        }}
      </Formik>
    );
}

export default FormTestimony