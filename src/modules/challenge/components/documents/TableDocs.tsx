import { FC, useState } from "react";
import { ModalDetailDocument, swal_error, Table } from "../../../../utils/ui";
import { trash, watch } from "../../../../utils/assets/img";
import { IDocument } from "../../custom_types";
import ModalEditDocument from "./ModalEditDocument";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

interface DocsFormPros {
  documents: IDocument[];
  typeDoc?: "general" | "admin" | "technicians";
  onDelete: (index: number) => void;
  onEdit: (values: IDocument) => void;
  typesDocument: any[];
  editListDocs: (value: number) => void;
  loading: boolean;
}

const TableDocs: FC<DocsFormPros> = ({
  documents,
  typeDoc,
  onDelete,
  onEdit,
  typesDocument,
  editListDocs,
  loading,
}) => {
  const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const dispatch = useDispatch<any>();
  const table_columns: any = [
    {
      title: "No.",
      align: "left" as "left",
      render: (data: IDocument, values: any, i: number) => {
        return i + 1;
      },
    },
    ...(typeDoc !== "general"
      ? [
          {
            title: "Perfil asociado",
            dataIndex: "ret_perfiles",
            align: "left" as "left",
          },
        ]
      : []),

    {
      title: "Tipo de documento",
      dataIndex: "ret_tipo_documento",
      align: "left" as "left",
    },
    {
      title: "Nombre",
      dataIndex: "ret_nombre_plantilla",
      align: "left" as "left",
      render: (name_document: string) => {
        return name_document ? name_document : "Sin plantilla";
      },
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: <span style={{ fontSize: "9px" }}>Ver</span>,
          fixed: "right",
          dataIndex: "id",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <>
                <img
                  src={watch}
                  className="img-fluid"
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    const res = await dispatch(actions.get_document(id));
                    if (res) {
                      const _url = URL.createObjectURL(
                        new Blob([res], {
                          type: "application/pdf",
                        })
                      );

                      setUrl(_url);
                      set_is_visible_doc(true);
                    }
                  }}
                />
                <ModalDetailDocument
                  open={is_visibleDoc}
                  setOpen={set_is_visible_doc}
                  url={url}
                />
              </>
            );
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Editar</span>,
          fixed: "right",
          align: "center" as "center",
          render: (values: IDocument, data: IDocument) => {
            return (
              <ModalEditDocument
                typeDoc={typeDoc}
                doc={values}
                typesDocument={typesDocument}
                onEdit={onEdit}
                editListDocs={editListDocs}
              />
            );
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
      items={documents}
      with_pagination={false}
      loading={loading}
    />
  );
};

export default TableDocs;
