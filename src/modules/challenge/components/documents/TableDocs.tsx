import { FC } from "react";
import { swal_error, Table } from "../../../../utils/ui";
import { trash } from "../../../../utils/assets/img";
import { IChallenge, IDocument } from "../../custom_types";
import ModalEditDocument from "./ModalEditDocument";
import ModalDetailDocument from "../../../../utils/ui/ModalDetailDocument";
import moment from "moment";
import Swal from "sweetalert2";
interface DocsFormPros {
  documents: IDocument[];
  setChallenge: any;
  typeDoc?: "general" | "administrative" | "technicians" | "report";
  onDelete: (index: number) => void;
  typesDocument: any[];
  editListDocs: (value: string) => void;
}

const TableDocs: FC<DocsFormPros> = ({ documents, typeDoc, setChallenge, onDelete, typesDocument, editListDocs }) => {

  const table_columns: any = [
    {
      title: "No.",
      align: "left" as "left",
      render: (data: IDocument, values: any, i: number) => {
        return i + 1;
      },
    },
    ...(typeDoc !== "general" && typeDoc !== "report"
      ? [
          {
            title: "Perfil asociado",
            dataIndex: "cha_profile",
            align: "left" as "left",
          },
        ]
      : []),

    {
      title: typeDoc === "report" ? "Titulo del informe" : "Tipo de documento",
      dataIndex: typeDoc === "report" ? "cha_document_name" : "cha_document_type",
      align: "left" as "left",
    },
    {
      title: typeDoc === "report" ? "Nombre de documento adjunto" : "Nombre",
      dataIndex: "template",
      align: "left" as "left",
      render: (template: File) => {
        return template ? template.name : "Sin plantilla";
      },
    },
    ...(typeDoc === "report"
      ? [
          {
            title: "Fecha",
            align: "left" as "left",
            render: () => {
              return moment(new Date().getTime()).format("DD / MM / YYYY");
            },
          },
        ]
      : []),
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
          render: (values: IDocument, data: IDocument, index: number) => {
            return (
              <ModalEditDocument
                typeDoc={typeDoc}
                doc={values}
                indexDoc={index}
                setChallenge={setChallenge}
                typesDocument={typesDocument}
                editListDocs={editListDocs}
              />
            );
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
          fixed: "right",
          align: "center" as "center",
          render: (data: IDocument, values: any, index: number) => {
            return (
              <img
                src={trash}
                className="img-fluid"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={async () => {
                const result =  await swal_error.fire({
                    title: "Eliminar documento",
                    html:
                      '<div class="mysubtitle">Se eliminará el documento seleccionado</div>' +
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
      ],
    },
  ];
  return (
    <Table columns={table_columns} items={documents} with_pagination={false} />
  );
};

export default TableDocs;
