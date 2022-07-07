import { FormikProps, FormikValues } from "formik";
import React, { FC, useRef, useState } from "react";
import { Card } from "../../../../utils/ui";
import { IChallenge, IDocuments } from "../../custom_types";
import FormAddDocument from "./FormAddDocument";
import TableDocs from "./TableDocs";

interface DocsFormPros {
  typeDoc: "general" | "administrative" | "technicians" | "report";
  setChallenge: any;
  challenge: IChallenge;
  title: string;
}
const AddDocument: FC<DocsFormPros> = ({
  setChallenge,
  typeDoc,
  challenge,
  title,
}) => {
  const form_ref = useRef<FormikProps<FormikValues>>();

  const onAddDocument = (values: any) => {
    setChallenge((data: IChallenge) => {
       return {
        ...data,
        documents: {
          ...data.documents,
          ...(typeDoc === "general"
            ? { general: [...data.documents.general, values] }
            : typeDoc === "technicians"
            ? { technical: [...data.documents.technical, values] }
            : typeDoc === "administrative" && {
                administrative: [...data.documents.administrative, values],
              }),
        },
        ...(typeDoc === "report" && {
          reports: [...data.reports, values],
        }),
      };
    });
  };

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
              <div className="d-flex justify-content-end pe-4 ps-4">
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
            />
          </Card>
          <Card>
            <span className="my-3" style={{ fontSize: "14px" }}>
              Documentos agregados
            </span>
            <TableDocs
              documents={
                typeDoc === "general"
                  ? challenge.documents.general
                  : typeDoc === "technicians"
                  ? challenge.documents.technical
                  : typeDoc === "administrative"
                  ? challenge.documents.administrative
                  : challenge.reports
              }
              setChallenge={setChallenge}
              typeDoc={typeDoc}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
