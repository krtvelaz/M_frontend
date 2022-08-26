import { FormikProps, FormikValues } from "formik";
import  { useRef } from "react";
import { Card } from "../../../utils/ui";

import FormTeam from "../components/FormTeam";
import { IPostulationTeam } from "../custom_types";

const CreatePostulationTeam = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();

    const addPostulationTeam = (values: IPostulationTeam) => { };
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3 col-md-10">
                            <h5 className="my-5">¡Genial! estas a punto de postularte al reto</h5>
                        </div>
                        <div className="">

                            <Card>
                                <FormTeam innerRef={form_ref} onSubmit={addPostulationTeam} />
                                <FormTeam innerRef={form_ref} onSubmit={addPostulationTeam} />
                                <FormTeam innerRef={form_ref} onSubmit={addPostulationTeam} />

                                <div className="bg-white d-flex flex-row justify-content-between">
                                    <div className="flex-fill" />
                                    <button
                                        type="button"
                                        className="btn btn-outline-add me-4 "
                                        onClick={() => { }}
                                    >
                                        Agregar otro participante
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => { 
                                        form_ref.current?.submitForm();
                                    }}>
                                        Continuar
                                    </button>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreatePostulationTeam