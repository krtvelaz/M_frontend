import { Formik, Form, Field } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { Card, DocumentInput } from "../../../utils/ui";

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
          <Form >
            <div className="row">
              <div className="col-4">
                <Card>

                  <h1>
                    Nombre Documento
                  </h1>
                  <div className="mt-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
                  </div>

                  <div className="col-12 mt-2">
                    <label htmlFor="image_logo" className="form-label">
                      Cargar Formato
                    </label>
                      <Field
                     
                        // type="file"
                        maximum_size={5}
                        component={DocumentInput }
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
                        autoComplete="off"

                      />
                  </div>
                </Card>
              </div>
              <div className="col-4">
                <Card>

                  <h1>
                    Nombre Documento
                  </h1>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
                  </div>

                  <div className="col-12 ">
                    <label htmlFor="image_logo" className="form-label">
                      Cargar Formato
                      <Field
                        type="file"
                        maximum_size={5}
                        // component={Upload }
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
                        autoComplete="off"
                        placeholder="Cargar formato"

                      />
                    </label>
                  </div>
                </Card>
              </div>
              <div className="col-4">
                <Card>

                  <h1>
                    Nombre Documento
                  </h1>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
                  </div>

                  <div className="col-12 ">
                    <label htmlFor="image_logo" className="form-label">
                      Cargar Formato
                      <Field
                        type="file"
                        maximum_size={5}
                        // component={Upload }
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
                        autoComplete="off"
                        placeholder="Cargar formato"

                      />
                    </label>
                  </div>
                </Card>
              </div>

            </div>
            <div className="row">
              <div className="col-4">
                <Card>

                  <h1>
                    Nombre Documento
                  </h1>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
                  </div>

                  <div className="col-12 ">
                    <label htmlFor="image_logo" className="form-label">
                      Cargar Formato
                      <Field
                        type="file"
                        maximum_size={5}
                        // component={Upload }
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
                        autoComplete="off"
                        placeholder="Cargar formato"

                      />
                    </label>
                  </div>
                </Card>
              </div>
              <div className="col-4">
                <Card>

                  <h1>
                    Nombre Documento
                  </h1>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatem non hic esse soluta harum officiis omnis delectus officia.
                  </div>

                  <div className="col-12 ">
                    <label htmlFor="image_logo" className="form-label">
                      Cargar Formato
                      <Field
                        type="file"
                        maximum_size={5}
                        // component={Upload }
                        className="form-control"
                        id="image_logo_id"
                        name="image_logo"
                        autoComplete="off"
                        placeholder="Cargar formato"

                      />
                    </label>
                  </div>
                </Card>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DocumentChallenge