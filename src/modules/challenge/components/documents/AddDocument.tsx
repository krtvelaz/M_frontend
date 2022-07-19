import { FormikProps, FormikValues } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../utils/ui";
import { IChallenge } from "../../custom_types";
import useDocument from "../../hooks/useTypeDocs";
import { actions } from "../../redux";
import FormAddDocument from "./FormAddDocument";
import TableDocs from "./TableDocs";

interface DocsFormPros {
  typeDoc: "general" | "administrative" | "technicians" | "report";
  setChallenge: any;
  challenge: IChallenge;
  title: string;
  seeTable: boolean;
}
const AddDocument: FC<DocsFormPros> = ({
  setChallenge,
  typeDoc,
  challenge,
  title,
  seeTable,
}) => {
  const dispatch = useDispatch<any>();
  const documents: any = useSelector((store: any) => store.challenge.documents_challenge.value);
  const loading: boolean = useSelector((store: any) => store.challenge.documents_challenge.loading);
  const form_ref = useRef<FormikProps<FormikValues>>();
  const { typesDocument, onAddDocument, onDelete, editListDocs } = useDocument(
    typeDoc,
    setChallenge,
    challenge
  );
  const get_documents = async () => {
    await dispatch(actions.get_list_document(typeDoc, {}));
  }

  useEffect(() => {
   get_documents();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title={
              <>
                <span style={{ fontSize: "14px" }}>{title}</span>
                {typeDoc === "report" && (
                  <span style={{ color: "#AD0808", fontSize: "10px" }}>
                    {" "}
                    - Todos los campos son obligatorios
                  </span>
                )}
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
                setChallenge={setChallenge}
                onDelete={onDelete}
                typeDoc={typeDoc}
                typesDocument={typesDocument}
                editListDocs={editListDocs}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
