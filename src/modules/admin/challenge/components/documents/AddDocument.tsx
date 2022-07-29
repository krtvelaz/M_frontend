import { FormikProps, FormikValues } from "formik";
import { FC,  useRef,  } from "react";
import {  useSelector } from "react-redux";
import { Card } from "../../../../../utils/ui";
import { IDocument } from "../../custom_types";
import FormAddDocument from "./FormAddDocument";
import TableDocs from "./TableDocs";

interface DocsFormPros {
  typesDocument: any[];
  onAddDocument: (values: IDocument) => void
  onDelete: (index: number) => void;
  onEditDocument: (values: IDocument) => void;
  editListDocs: (value: number) => void;
  typeDoc: "general" | "admin" | "technicians";
  title: string;
}
const AddDocument: FC<DocsFormPros> = ({
  typesDocument,
  onAddDocument,
  onDelete,
  onEditDocument,
  editListDocs,
  typeDoc,
  title,
}) => {
  
  const documents: any = useSelector(
    (store: any) => store.challenge.documents_challenge.value
  );
  const loading: boolean = useSelector(
    (store: any) => store.challenge.documents_challenge.loading
  );
  const form_ref = useRef<FormikProps<FormikValues>>();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title={
              <>
                <span style={{ fontSize: "14px" }}>{title}</span>
              </>
            }
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
                  Agregar documento
                </button>
              </div>,
            ]}
          >
            <FormAddDocument
              innerRef={form_ref}
              onSubmit={onAddDocument}
              typeDoc={typeDoc}
              type='create'
              editListDocs={editListDocs}
              typesDocument={typesDocument}
            />
          </Card>
          {documents.length > 0 && (
            <Card>
              <span className="my-3" style={{ fontSize: "14px" }}>
                Documentos agregados
              </span>
              <TableDocs
                documents={documents}
                onDelete={onDelete}
                onEdit={onEditDocument}
                typeDoc={typeDoc}
                typesDocument={typesDocument}
                editListDocs={editListDocs}
                loading={loading}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
