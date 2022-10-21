import { Field, Form, Formik } from 'formik';
import { ErrorMessage } from '../../../utils/ui';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';

const FormContact = () => {
    const dispatch = useDispatch<any>();

    const initial_values = {
        subject: '',
        fullname: '',
        email: '',
        content: '',
    };

    const schema = Yup.object().shape({
        subject: Yup.string().required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
        fullname: Yup.string().required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
        email: Yup.string().email('Correo inválido ejemplo: correo@gmail.com').required('Campo obligatorio'),
        content: Yup.string().required('Campo obligatorio').max(500, 'Máximo 500 caracteres'),
    });

    const submit = async (values: any, form: any) => {
        await dispatch(actions.send_email(values));
        form.setSubmitting(false);
        form.resetForm();
    };
    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initial_values} validationSchema={schema}>
            {({ values, handleChange }) => {
                //isSubmitting
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-12 col-md-12 col-lg-6">
                                <div className="">
                                    <label htmlFor="subject_id" className="form-label">
                                        Asunto del mensaje
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="subject_id"
                                        name="subject"
                                        autoComplete="off"
                                        maxLength={50}
                                        placeholder="Título del mensaje que enviará..."
                                    />
                                    <ErrorMessage name="subject" withCount max={50} />
                                </div>

                                <div className="">
                                    <label htmlFor="fullname_id" className="form-label">
                                        Nombre completo
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="fullname_id"
                                        name="fullname"
                                        autoComplete="off"
                                        maxLength={50}
                                        placeholder="Nombre completo..."
                                    />
                                    <ErrorMessage name="fullname" withCount max={50} />
                                </div>

                                <div className="">
                                    <label htmlFor="email_id" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        id="email_id"
                                        name="email"
                                        autoComplete="off"
                                        maxLength={70}
                                        placeholder="Ingresa tu correo electrónico..."
                                    />
                                    <ErrorMessage name="email" withCount max={70} />
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-6">
                                <div className="row">
                                    <div className="">
                                        <label htmlFor="content_id" className="form-label">
                                            Mensaje a enviar
                                        </label>
                                        <Field
                                            style={{ height: '135px', text: 'top' }}
                                            as="textarea"
                                            className="form-control"
                                            id="content_id"
                                            name="content"
                                            autoComplete="off"
                                            maxLength={500}
                                            placeholder="Escribe tu mensaje y pronto estaremos en contacto"
                                        />
                                        <ErrorMessage name="content" withCount max={500} />
                                    </div>
                                </div>
                                <div className="col text-end ">
                                    <button
                                        type="reset"
                                        className="btn btn-primary-contact my-3 me-2"
                                        //    onClick={reset}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-landing-primary my-3">
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormContact;
