import { FormikProps, FormikValues } from "formik"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "../../../utils/ui"
import { swal, swal_error, swal_success } from "../../../utils/ui/swalAlert"
import FormTestimony from "../components/testimony/FormTestimony"
import ListTestimony from "../components/testimony/ListTestimony"
import { ITestimony } from "../custom_types"
import { actions } from "../redux"


const CreateTestimony = () => {
  const testimonials: ITestimony = useSelector((store:any) => store.banner.testimonials.value);
  const [data, setData] = useState<ITestimony[]>([]);
  const dispatch = useDispatch<any>();

    const form_ref = useRef<FormikProps<FormikValues>>()
    const addTestimony = async (values:ITestimony) =>{
    await dispatch(actions.create_testimony(values));

        if (data.length > 3) {
            await swal_error.fire({
            title: "Ha llegado al máximo de elementos",
            html:
              '<div class="mysubtitle">Máximo de 4 testimonios</div>' +
              '<div class="mytext">Se debe eliminar un elemento para poder publicar uno nuevo.</div>',
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
          return 
        }
        setData([...data, values]);
         
    }


    const editTetimony = (values:ITestimony, index: number) => {
        setData((data)=>{
            data[index]= values;
            return [
                ...data
            ]
        })
        
    }

  const onDelete = (index: number) => {
    const updatedItems = data.filter((_values, i) => i !== index);
    return setData(updatedItems);
  };

  const get_testimonals = async () =>{
    
     await dispatch(actions.get_list_testimonials());
     console.log(testimonials)
  }
  useEffect(() => {
    get_testimonals();
    
  }, [])
  

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5 className="">Carrusel Testimonios</h5>
            </div>
            <div className="col-md-12">
              <Card
                title="Agregar elemento"
                actions={[
                  <div
                    className="d-flex justify-content-end"
                    style={{ padding: "20px" }}
                  >
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
                ]}
              >
                <FormTestimony innerRef={form_ref} onSubmit={addTestimony} />
              </Card>
              {data.length > 0 && (
                <Card>
                  <h4>Elementos Agregados</h4>
                  <ListTestimony
                    data={data}
                    onEdit={editTetimony}
                    onDelete={onDelete}
                  />
                </Card>
              )}
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
          onClick={() => {}}
        >
          Atrás
        </button>
        <div className="flex-fill" />
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateTestimony;
