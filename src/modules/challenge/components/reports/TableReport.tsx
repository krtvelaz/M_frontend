import moment from "moment";
import { FC } from "react";
import { trash } from "../../../../utils/assets/img";
import { ModalDetailDocument, swal_error, Table } from "../../../../utils/ui";
import { Informe } from "../../custom_types";
import ModalEditReport from "./ModalEditReport";

interface TablePros {
  reports: Informe[];
  onDelete: (index: number) => void;
  onEdit: (values: Informe) => void;
  loading: boolean;
}

const TableReport: FC<TablePros> = ({ onEdit, reports, onDelete }) => {
  const table_columns: any = [
    {
      title: "No.",
      align: "left" as "left",
      render: (data: Informe, values: any, i: number) => {
        return i + 1;
      },
    },
    {
      title: "Titulo del informe",
      dataIndex: "ret_titulo_reporte",
      align: "left" as "left",
    },
    {
      title: "Nombre de documento adjunto",
      dataIndex: "ret_nombre_documento",
      align: "left" as "left",
    },
    {
      title: "Fecha",
      dataIndex: "dataIndex",
      align: "left" as "left",
      render: (date: string) => {
       return moment(date).format("DD/MM/YYYY")
      },
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: <span style={{ fontSize: "9px" }}>Ver</span>,
          fixed: "right",
          dataIndex: "template",
          align: "center" as "center",
          render: (template: File) => {
            return template ? <ModalDetailDocument document={template} /> : "-";
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Editar</span>,
          fixed: "right",
          align: "center" as "center",
          render: (values: Informe, data: Informe) => {
            return <ModalEditReport report={values} onEdit={onEdit} />;
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
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
                    title: "Eliminar documento",
                    html:
                      '<div class="mysubtitle">Se eliminará el documento seleccionado</div>' +
                      '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: "Aceptar",
                    denyButtonText: `Cancelar`,
                  });
                  if (result.isConfirmed) {
                    onDelete(id)
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
      items={reports}
      with_pagination={false}
      //   loading={loading}
    />
  );
};

export default TableReport;
