import { FormikProps, FormikValues } from "formik"
import { useRef, } from "react"
import { Card } from "../../../utils/ui"
import FormIndicator from "../components/FormIndicator"
import { IIndicator } from "../custom_types"


const CreateIndicator = () => {
    const form_ref = useRef<FormikProps<FormikValues>>()
    
    const addIndicator = (values:IIndicator) =>{
    }

  return (
    <div className="h-100 d-flex flex-column">
    <div className="flex-fill overflow-auto">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="d-flex flex-row mb-3">
                    <h5 className="">Estadísticas</h5>
                </div>
                <div className="col-md-12">
                    <Card title='Editar estadísticas  - Página inicio' actions={[ 
                  
                ]}>
                        <FormIndicator innerRef={form_ref} onSubmit={addIndicator}/>
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
            onClick={ () => { 
            }}
        >
            Guardar
        </button>
    </div>
</div>
  )
}

export default CreateIndicator