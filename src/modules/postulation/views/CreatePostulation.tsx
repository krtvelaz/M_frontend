import { FormikProps, FormikValues } from 'formik';
import { useRef } from 'react';
import FormLocation from '../../../utils/components/location/FormLocation';
import { Card } from '../../../utils/ui';
import { IPostulation } from '../custom_types';
const CreatePostulation = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();

    const addPostulation = (values: IPostulation) => {};
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3 col-md-12">
                            <h5 className="my-5">¡Genial! estas a punto de postularte al reto</h5>
                        </div>
                        <div className="col-10">
                            <Card title=" Ingrese la dirección" actions={[]}>
                                <FormLocation innerRef={form_ref} onSubmit={addPostulation} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white d-flex flex-row justify-content-between">
                <div className="flex-fill" />
                <button type="button" className="btn btn-outline-primary me-4 " onClick={() => {}}>
                    Cancelar
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current?.submitForm();
                    }}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default CreatePostulation;
