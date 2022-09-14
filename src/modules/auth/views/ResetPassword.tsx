import { FormikProps, FormikValues } from 'formik';
import React, { useRef } from 'react'
import { Card } from '../../../utils/ui';
import FormLostPassword from '../components/FormLostPassword';
import FormResetPassword from '../components/FormResetPassword';

const ResetPassword = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();

  return (
    <div className="h-100 d-flex flex-column box-resetPaswword  ">
    <div className="flex-fill overflow-auto">
        <div style={{marginTop:'110'}}  className="container-fluid">
            <div className="row justify-content-center">
                <div className="d-flex flex-row m-5 col-md-12">
                    <h5 className="m-5 text-white">¿Olvidó su contraseña?</h5>
                </div>

                <div className="col-10">
                    <Card actions={[]}>
                        <div className="row container " >
                            <h1 className='mb-4' style={{font:'normal normal bold 18px Montserrat' }}>Completa los campos para iniciar el proceso de recuperación de su contraseña</h1>

                            <h1  style={{font:'normal normal  18px Montserrat', }}>Ingrese sus datos</h1>
                            <hr style={{ border: '1px solid #FF8403' }} />
                            <div className="col-3 mb-3">
                               
                            </div>
                            {/* <FormLostPassword innerRef={form_ref}/> */}
                            <FormResetPassword innerRef={form_ref}/>
                            <hr />
                            <div className="text-end">
                              
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                >
                                    Restablecer contraseña
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ResetPassword