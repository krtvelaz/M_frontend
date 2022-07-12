import { FC } from "react"
import { trash } from "../../../utils/assets/img";
import { swal_error, Table } from "../../../utils/ui"
import { ITestimony } from "../custom_types"
import ModalEditTestimony from "./ModalEditTestimony";
import ModalImgTestimony from "./ModalImgTestimony";

interface IListTestimony {
    data: ITestimony[];
    onEdit:(values:ITestimony, index: number) => any;
    onDelete: (index: number) => void;

}

const ListTestimony: FC<IListTestimony> = ({
    data,
    onEdit,
    onDelete
}) => {
    const table_columns = [
        {
            title:"No.",
            dataIndex:"id",
            align:"center" as "center",
            render: (data: ITestimony, values: any, i: number) => {
                return i + 1;
              },

        },
        {
            title:"Titulo",
            dataIndex:"title",
            align:"left" as "left",

        },
        {
            title:"Descripción",
            dataIndex:"description",
            align:"left" as "left",
        },
        {
            title:"Imagen Empresario",
            dataIndex:"image_entrepreneur",
            align:"left" as "left",
            render: (value: File)=>{
                return value.name
            }
        },
        {
            title:"Imagen Logo",
            dataIndex:"image_logo",
            align:"left" as "left",
            render: (value: File)=>{
                return value.name
            }
        },
        {
            title: "Acciones",
            fixed: "right",
            children: [
                {
                    title:  "Ver",
                    fixed: "right",
                    align: "center" as "center",
                    render: (data: ITestimony)=>{
                        return <ModalImgTestimony document_entrepreneur={data.image_entrepreneur} document_logo={data.image_logo}/>
                    }
                },
                {
                    title: "Editar",
                    fixed: "right",
                    align: "center" as "center",
                    render: (value: ITestimony, _data: ITestimony, index: number )=>{
                        return <ModalEditTestimony onSubmit={ (values) => onEdit(values, index)} data={value}/>
                    }
                   
                },
                {
                    title: "Eliminar",
                    fixed: "right",
                    align: "center" as "center",
                    render: (data: ITestimony, values: any, index: number) => {
                        return (
                          <img
                            src={trash}
                            className="img-fluid"
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={async () => {
                            const result =  await swal_error.fire({
                                title: "Eliminar elemento",
                                html:
                                  '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                                  '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                                showCancelButton: false,
                                showDenyButton: true,
                                confirmButtonText: "Aceptar",
                                denyButtonText: `Cancelar`,
                              });
                              if(result.isConfirmed){
                                onDelete(index);
                              }
                            }}
                          />
                        );
                      },
                },
            ]

        }
    ]
  return (
   <Table columns={table_columns} items ={data} with_pagination={false}/>
  )
}

export default ListTestimony