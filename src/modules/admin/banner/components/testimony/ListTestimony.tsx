import { Popover } from "antd";
import { FC } from "react";
import { trash } from "../../../../../utils/assets/img";
import { swal_error, Table } from "../../../../../utils/ui";
import { ITestimony } from "../../custom_types";
import ModalEditTestimony from "./ModalEditTestimony";
import ModalImgTestimony from "./ModalImgTestimony";

interface IListTestimony {
  data: ITestimony[];
  onEdit: (values: ITestimony) => any;
  onDelete: (index: number) => void;
}

const ListTestimony: FC<IListTestimony> = ({ data, onEdit, onDelete }) => {  
  const table_columns = [
    {
      title: "No.",
      align: "center" as "center",
      render: (data: ITestimony, values: any, i: number) => {
        return i + 1;
      },
    },
    {
      title: "Título",
      dataIndex: "tes_titulo",
      align: "left" as "left",
      render: (value: string) => {
        return (
          value &&
          (value.length > 24 ? (
            <Popover style={{width: '200px'}} content={value} trigger="click">
              <span
                style={{ cursor: "pointer" }}
                className="popover-span"
              >{`${value.substring(0, 22)}...`}</span>
            </Popover>
          ) : (
            value
          ))
        );
      },
    },
    {
      title: "Descripción",
      dataIndex: "tes_descripcion",
      align: "left" as "left",
    },
    {
      title: "Imagen Empresario",
      dataIndex: "tes_nombre_imagen",
      align: "left" as "left",
    },
    {
      title: "Imagen Logo",
      dataIndex: "tes_nombre_logo",
      align: "left" as "left",
    },
    {
      title: 'Acciones',
      fixed: "right",
      children: [
        {
          title: <span style={{fontFamily: 'Montserrat-Regular', fontSize: '9px', paddingBottom: '0px'}}>ver</span>,
          fixed: "right",
          dataIndex: "id",
          align: "center" as "center",
          render: (id: number) => {
            return <ModalImgTestimony id={id} />;
          },
        },
        {
          title: <span style={{fontFamily: 'Montserrat-Regular', fontSize: '9px'}}>Editar</span>,
          fixed: "right",
          dataIndex: 'id',
          align: "center" as "center",
          render: (id: number) => {
            return <ModalEditTestimony onSubmit={onEdit} id={id} />;
          },
        },
        {
          title: <span style={{fontFamily: 'Montserrat-Regular', fontSize: '9px'}}>Eliminar</span>,
          fixed: "right",
          dataIndex: "id",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <img
                src={trash}
                className="img-fluid"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  const result = await swal_error.fire({
                    title: "Eliminar elemento",
                    html:
                      '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                      '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: "Aceptar",
                    denyButtonText: `Cancelar`,
                  });
                  if (result.isConfirmed) {
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
  return <Table columns={table_columns} items={data} with_pagination={false} />;
};

export default ListTestimony;
