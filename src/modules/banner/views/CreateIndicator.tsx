import { FormikProps, FormikValues } from "formik"
import { useRef, useState } from "react"
import { Card } from "../../../utils/ui"
import FormIndicator from "../components/FormIndicator"
import ListTestimony from "../components/ListTestimony"
import { ITestimony } from "../custom_types"


const CreateIndicator = () => {
     const [data, setData] = useState<ITestimony[]>([])

    const form_ref = useRef<FormikProps<FormikValues>>()
    const addTestimony = (values:ITestimony) =>{
        setData([...data, values])
    }

    const editTetimony = (values:ITestimony, index: number) => {
        setData((data)=>{
            data[index]= values;
            return [
                ...data
            ]
        })
        
    }

    const onDelete = (index: number ) => {

        const updatedItems = data.filter((_values, i) => i !== index);
         return setData(updatedItems);
    }
    
  return (
    <div className="h-100 d-flex flex-column">
    <div className="flex-fill overflow-auto">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="d-flex flex-row mb-3">
                    <h5 className="">Carrusel testimonios</h5>
                </div>
                <div className="col-md-12">
                    <Card title='Agregar elemento' actions={[ 
                    <div className="d-flex justify-content-end pe-4 ps-4">
                        
                    <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        form_ref.current?.submitForm();
                    }}
                    >
                    Agregar
                     </button>
                     </div>,
                ]}>
                        <FormIndicator innerRef={form_ref} onSubmit={addTestimony}/>
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
            }}
        >
            Guardar
        </button>
    </div>
</div>
  )
}

export default CreateIndicator