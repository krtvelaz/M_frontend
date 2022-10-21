import { Field, Form, Formik } from 'formik';
import { ErrorMessage } from '../../../utils/ui';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
import { useState } from 'react';
const FormSuscribe = () => {
    const dispatch = useDispatch<any>();
    const [message, setMessage] = useState('');

    const initial_values = {
        email: '',
        number: '',
    };

    const schema = Yup.object().shape({
        email: Yup.string().email('Correo inválido ejemplo: correo@gmail.com').required('Campo obligatorio'),
        number: Yup.string().required('Campo obligatorio').max(10, 'Máximo 10 caracteres'),
    });

    const submit = async (values: any, form: any) => {
        setMessage('')
        try {
            const res = await dispatch(actions.create_bulletin(values));
            setMessage(res?.message);
            setTimeout(() => {
                setMessage('')
              }, 2000)
            form.setSubmitting(false);
            form.resetForm();
        } catch (error: any) {
            if (error?.response?.data?.status === 400) {
                setMessage('Este correo ya se encuentra registrado en nuestros boletines, ingresa uno nuevo.');
                return;
            } 
            setMessage(error?.response?.data?.message);
        }
    };
    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initial_values} validationSchema={schema}>
            {({ values, handleChange }) => {
                //isSubmitting
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-10 col-md-10 col-lg-5">
                                <Field
                                    style={{ border: 'solid 0.5px #DEDEDF', color: '#FFF', background: '#603CE6' }}
                                    type="email"
                                    className="form-control"
                                    id="email_id_boletin"
                                    name="email"
                                    autoComplete="off"
                                    maxLength={70}
                                    placeholder="Digita tu correo electrónico..."
                                />
                                
                                {message ? <span style={{color: `#FFF`}} className="form-error">{message}</span> : 
                                <ErrorMessage color="#FFF" name="email" withCount max={70} />
                                }
                            </div>

                            <div className="col-10 col-md-10 col-lg-5">
                                <Field
                                    style={{ border: ' solid 0.5px #DEDEDF', color: '#DEDEDF', background: '#603CE6' }}
                                    type="text"
                                    className="form-control"
                                    id="number_id_boletin"
                                    name="number"
                                    autoComplete="off"
                                    maxLength={10}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,10}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                    placeholder="Digita tu número de contacto..."
                                />
                                <ErrorMessage color="#FFF" name="number" withCount max={10} />
                            </div>

                            <div className="col text-start ">
                                <button
                                    style={{ border: ' solid 0.5px #DEDEDF' }}
                                    type="submit"
                                    className="btn btn-primary-suscribe "
                                >
                                    Suscríbete ahora
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormSuscribe;
