import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { DocumentInput, ErrorMessage } from "../../../../utils/ui";
// import { ITestimony } from "../../custom_types";

interface BannerFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    testimony?: any;
  }
const DocumentChallenge: FC<BannerFormPros> = ({
    innerRef,
    onSubmit,
    testimony,
}) => {
    const initial_values = {
        image_logo: "",
        image_entrepreneur: "",
        title: "",
        description: "",
        ...testimony,
      };
    
      const schema = Yup.object().shape({
        title: Yup.string().required("Campo obligatorio"),
        
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
           <Form>
            <h1>
                Nombre Documento
            </h1>
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
            </div>
          
            <div className="col-12 col-md-6 col-lg-6">
                <label htmlFor="image_logo" className="form-label">
                  Cargar Formato
                <Field
                  type="file"
                  maximum_size={5}
                //   component={DocumentInput}
                  className="form-control"
                  id="image_logo_id"
                  name="image_logo"
                  autoComplete="off"
                  placeholder="cargar"
                    //   onChange={(e: any) => {
                    //     e.preventDefault();
                    //     const { value } = e.target;
                    //     const regex = new RegExp(
                    //       /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g
                    //     );
                    //     if (regex.test(value.toString())) {
                    //       handleChange(e);
                    //     }
                    //   }}
                />
                </label>
              </div>
            </Form>       
       );   
        }}    
    </Formik>
  );
};

export default DocumentChallenge