import { Radio, RadioChangeEvent } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { Card } from '../../../utils/ui';
import FormRegisterPersonaJuridica from '../components/FormRegisterPersonaJuridica';
import FormRegisterPersonaNatural from '../components/FormRegisterPersonaNatural';
import { actions } from '../redux';
import { actions as actionsPostulation } from '../../postulation/redux';

const Register = () => {
    const [radio, setRadio] = useState(1);
    const dispatch = useDispatch<any>();
    const form_ref = useRef<FormikProps<FormikValues>>();
    const context = useContext(TemplateContext);
    const navigate = useNavigate();
    
    const onChange = (e: RadioChangeEvent) => {
        setRadio(e.target.value);
    };

    const on_register = async (values: any, form: any) => {
        try {
            const new_values = {
                ...values,
                society_type: radio === 1 ? 'N' : 'J',
    
            };
            await dispatch(actions.register(new_values));
            navigate('../', { replace: true });
            context.toggle_login_modal();
            
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        dispatch(actions.get_countries());
        dispatch(actionsPostulation.get__document());
    }, []);

    return (
        <div className="box-register">
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="d-flex flex-row m-5 col-md-12">
                        <h5 className="m-5 text-white text-stake">Formulario de registro</h5>
                    </div>

                    <Card actions={[]}>
                        <div className="row container">
                            <h1 className="text-stake">
                                Completa el formulario de registro para participar retos de innovación abierta.
                            </h1>
                            <h1 className="text-stake-mediun mb-4">Recuerda que todos los campos son obligatorios.</h1>

                            <h1 className="text-stake">Datos personales</h1>
                            <hr style={{ border: '1px solid #FF8403' }} />
                            <h1 className="mt-3 text-stake-mediun">Tipo de sociedad</h1>
                            <div className=" mb-3">
                                <Radio.Group name="radiogroup" onChange={onChange} value={radio}>
                                    <div className="d-flex flex-row col-12 ">
                                        <Radio value={1}>Persona Natural</Radio>
                                        <Radio value={2}>Persona Juridica</Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                            {radio === 1 ? (
                                <FormRegisterPersonaNatural type='natural' innerRef={form_ref} onSubmit={on_register} />
                            ) : (
                                <FormRegisterPersonaNatural type='legal' innerRef={form_ref} onSubmit={on_register} />
                                // <FormRegisterPersonaJuridica innerRef={form_ref} />
                            )}
                            <hr />
                            <div className="bg-white d-flex flex-row justify-content-between">
                                <button type="button" className="btn-back me-4 " onClick={() => {
                                    navigate('../', { replace: true });
                                    const landingScroll: any = document.getElementById('scroll-landing');
                                    landingScroll.scrollTop = 0;
                                }}>
                                    Atrás
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-landing-primary"
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                >
                                    Registrarme
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Register;
