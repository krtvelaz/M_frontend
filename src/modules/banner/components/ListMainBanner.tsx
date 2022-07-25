import { FC } from "react";
import { trash } from "../../../utils/assets/img";
import { swal_error, Table } from "../../../utils/ui";
import ModalDetailDocument from "../../../utils/ui/ModalDetailDocument";
import { IMainBanner } from "../custom_types";
import ModalEditMainBanner from "./ModalEditMainBanner";

interface BannerFormPros {
  data: IMainBanner[];
  onSubmit: (values: IMainBanner, index: number) => any;
  onDelete: (id: number) => any;
}

const ListMainBanner: FC<BannerFormPros> = ({ data, onSubmit, onDelete}) => {
    const table_columns: any = [
        {
            title: 'No.',
            dataIndex: 'id',
            align: 'center' as 'center',
            render: (data: IMainBanner, values: any, i: number) => {
              return i + 1;
            },
        },
        {
            title: 'Titulo',
            dataIndex: 'car_titulo',
            align: 'left' as 'left',
        },
        {
            title: 'Descripción',
            dataIndex: 'car_descripcion',
            align: 'left' as 'left',
        },
        // {
        //     title: 'Imagen',
        //     dataIndex: 'car_nombre_imagen',
        //     responsive: ['md'],
        //     align: 'left' as 'left',
        //     render: (value: File) => {
        //       return value.name;
        //     },
        // },
        {
            title: "Acciones",
            fixed: "right",
            children: [
              {
                title: <span style={{ fontSize: "9px" }}>Ver</span>,
                fixed: "right",
                dataIndex: "car_nombre_imagen",
                align: "center" as "center",
                render: (value: File) => {
                  // return  <ModalDetailDocument document={value} />;
                },
              },
              {
                title: <span style={{ fontSize: "9px" }}>Editar</span>,
                fixed: "right",
                align: "center" as "center",
                render: (values: IMainBanner, data: any, index: number) => {
                  return  <ModalEditMainBanner data_image={values} onSubmit={ (value) => onSubmit(value, index)}/ >;
                },
              },
              {
                title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
                dataIndex: "id",
                fixed: "right",
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
            ],
          },
        
    ];
  return (
    <Table
      columns={table_columns}
      items={data}
      with_pagination={false}
    />
  );
};

export default ListMainBanner;
