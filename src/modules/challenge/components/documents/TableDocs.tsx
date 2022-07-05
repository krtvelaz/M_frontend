import { FC } from "react";
import { Table } from "../../../../utils/ui";
import { pencil, trash, watch } from "../../../../utils/assets/img";
interface DocsFormPros {
  documents: any[];
  typeDoc?: "general" | "administrative" | "technicians";
}

const TableDocs: FC<DocsFormPros> = ({ documents, typeDoc }) => {
  const table_columns: any = [
    {
      title: "No.",
      align: "left" as "left",
      render: (values: any) => {
        return values.length
      }
    },
    ...(typeDoc !== 'general' ? [
      {
        title: "Perfil asociado",
        dataIndex: "profile",
        align: "left" as "left",
      },

    ]:
    []),
    
    {
      title: "Tipo de documento",
      dataIndex: "document_type",
      align: "left" as "left",
    },
    {
      title: "Nombre",
      dataIndex: "template",
      align: "left" as "left",
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: (<span style={{fontSize: '9px'}}>Ver</span>),
          dataIndex: "id",
          fixed: "right",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <img
                src={watch}
                className="img-fluid"
                alt=""
              />
            );
          },
        },
        {
          title: (<span style={{fontSize: '9px'}}>Editar</span>),
          dataIndex: "id",
          fixed: "right",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <img
                src={pencil}
                className="img-fluid"
                alt=""
              />
            );
          },
        },
        {
          title: (<span style={{fontSize: '9px'}}>Eliminar</span>),
          dataIndex: "id",
          fixed: "right",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <img
                src={trash}
                className="img-fluid"
                alt=""
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
      items={documents}
      with_pagination={false}
      // count={total_results}
      // change_page={change_page}
      // loading={loading}
    />
  );
};

export default TableDocs;
