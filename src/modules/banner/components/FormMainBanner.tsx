import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import { FC, MutableRefObject } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "../../../utils/ui";

interface BannerFormPros {
  innerRef?: MutableRefObject<FormikProps<FormikValues>>;
}

const FormMainBanner: FC<BannerFormPros> = ({ innerRef }) => {
  const initial_values = {};

  const schema = Yup.object().shape({});

  const submit = (values: any, form: any) => {};

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
            <div className={`col-12 col-md-6`}>
              <label htmlFor="name_id" className="form-label">
                Titulo
              </label>
              <Field
                type="text"
                className="form-control"
                id="name_id"
                name="name"
                autoComplete="off"
                maxLength={47}
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
              <ErrorMessage name="name" withCount max={47} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormMainBanner;
