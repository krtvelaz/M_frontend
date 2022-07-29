import { useRef } from "react"
import { Card } from "../../../../utils/ui"
import FormEvent from "../components/FormEvent"
import { IEvent } from "../custom_types"
import { FormikProps, FormikValues } from "formik"



const CreateEvent = () => {
    const form_ref = useRef<FormikProps<FormikValues>>()

    const addIndicator = (values: IEvent) => {
    }

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5 className="">Crear evento</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title='Detalles nuevo evento' actions={[

                            ]}>
                                <FormEvent innerRef={form_ref} onSubmit={addIndicator} />
                            </Card >

                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, marginBottom: 60, borderTop: "1px solid #ccc" }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current?.submitForm();
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    )
}

export default CreateEvent