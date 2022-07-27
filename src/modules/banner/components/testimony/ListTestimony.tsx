import { FC } from "react"
import { trash } from "../../../../utils/assets/img";
import { swal_error, Table } from "../../../../utils/ui"
import { ITestimony } from "../../custom_types"
import ModalEditTestimony from "./ModalEditTestimony";
import ModalImgTestimony from "./ModalImgTestimony";

interface IListTestimony {
    data: ITestimony[];
    onEdit:(values:ITestimony ) => any;
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
            align:"center" as "center",
            render: (data: ITestimony, values: any, i: number) => {
                return i + 1;
              },

        },
        {
            title:"Titulo",
            dataIndex:"tes_titulo",
            align:"left" as "left",

        },
        {
            title:"Descripción",
            dataIndex:"tes_descripcion",
            align:"left" as "left",
        },
        {
            title:"Imagen Empresario",
            dataIndex:"tes_nombre_imagen",
            align:"left" as "left",
        },
        {
            title:"Imagen Logo",
            dataIndex:"tes_nombre_logo",
            align:"left" as "left",
        },
        {
            title: "Acciones",
            fixed: "right",
            children: [
                {
                    title:  "Ver",
                    fixed: "right",
                    dataIndex: 'id',
                    align: "center" as "center",
                    render: (id: number)=>{
                        return <ModalImgTestimony id={id} />
                    }
                },
                {
                    title: "Editar",
                    fixed: "right",
                    align: "center" as "center",
                    render: (value: ITestimony, _data: ITestimony )=>{
                      
                        
                        return <ModalEditTestimony onSubmit={ onEdit } data={value}/>
                    }
                   
                },
                {
                    title: "Eliminar",
                    fixed: "right",
                    dataIndex:"id",
                    align: "center" as "center",
                    render: (id: number) => {
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
                                onDelete(id);
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