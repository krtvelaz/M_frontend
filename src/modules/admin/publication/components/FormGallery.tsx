import { FC } from "react";
import { IGalleryInfo } from "../custom_types";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { DocumentInput, ErrorMessage, Select } from "../../../../utils/ui";


interface GalleryPros {
    innerRef: any;
    onSubmit: (values: any) => void;
    gallery?: IGalleryInfo;
}

const FormGallery: FC<GalleryPros> = ({ innerRef, onSubmit, gallery }) => {
    const initial_values = {
        gal_titulo: "",
        gal_descripcion: "",
        img: "",
        ...gallery,
    };
    const schema = Yup.object().shape({
        gal_titulo: Yup.string().required("Campo obligatorio"),
        img: Yup.string().required("Campo obligatorio"),
        gal_descripcion: Yup.string().required("Campo obligatorio"),

    });

    const submit = (values: any, actions: any) => {
        onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm();
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
                        <div className="row">
                        <div className="col-12 col-md-6 col-lg-6">
                            <label htmlFor="img_id" className="form-label">
                                Imagen
                            </label>
                            <Field
                                component={DocumentInput}
                                maximum_size={2}
                                file_type="img"
                                type="text"
                                id="img_id"
                                name="img"
                                className="form-control"
                                placeholder="Seleccionar…"
                            />
                            <ErrorMessage name="img" />
                        </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="gal_titulo_id" className="form-label">
                                    Título
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="gal_titulo_id"
                                    name="gal_titulo"
                                    autoComplete="off"
                                    maxLength={100}
                                    style={{ height: "38px" }}
                                  
                                />
                                <ErrorMessage name="gal_titulo" withCount max={100} />
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="gal_descripcion_id" className="form-label">
                                Descripción
                            </label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="gal_descripcion_id"
                                name="gal_descripcion"
                                autoComplete="off"
                                maxLength={200}
                                style={{ height: "38px" }}
                            />
                            <ErrorMessage name="gal_descripcion" withCount max={200} />
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default FormGallery