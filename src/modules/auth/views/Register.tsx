import { Radio, RadioChangeEvent } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import React, { useRef, useState } from 'react'
import { Card } from '../../../utils/ui';
import FormRegisterPersonaJuridica from '../components/FormRegisterPersonaJuridica';
import FormRegisterPersonaNatural from '../components/FormRegisterPersonaNatural';
import ModalLogin from '../components/ModalLogin';


const Register = () => {
    const [radio, setRadio] = useState(1);
    const form_ref = useRef<FormikProps<FormikValues>>();

    const onChange = (e: RadioChangeEvent) => {
        setRadio(e.target.value);
    };
    return (

        <div className="h-100 d-flex flex-column box-register ">
            <div className="flex-fill overflow-auto" style={{
                paddingBottom: "50px",
            }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                    <div className="d-flex flex-row m-5 col-md-12">
                    <h5 className="m-5 text-white text-stake">Formulario de registro</h5>
                </div>

                        <div className="col-10 ">
                            <Card actions={[]}>
                                <div className="row container px-5" >
                                    <h1 className="text-stake">Completa el formulario de registro para participar retos de innovación abierta.</h1>
                                    <h1 className='text-stake-mediun mb-4'>Recuerda que todos los campos son obligatorios.</h1>

                                    <h1 className='text-stake'>Datos personales</h1>
                                    <hr style={{ border: '1px solid #FF8403' }} />
                                    <h1 className='text-stake-mediun'>Tipo de sociedad</h1>
                                    <div className="col-3 mb-3">
                                        <Radio.Group name="radiogroup" onChange={onChange} value={radio}  >
                                            <div className="d-flex flex-row col-12 ">
                                                <Radio value={1}>Persona Natural</Radio>
                                                <Radio value={2}>Persona Juridica</Radio>
                                            </div>
                                        </Radio.Group>
                                    </div>
                                    {radio === 1 ? <FormRegisterPersonaNatural innerRef={form_ref} /> : <FormRegisterPersonaJuridica innerRef={form_ref} />}
                                    <hr />
                                    <ModalLogin />
                                    <div className="bg-white d-flex flex-row justify-content-between">
                                        <button type="button" className="btn btn-outline-primary me-4 " onClick={() => { }}>
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
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
            </div>
        </div>


    );
}

export default Register