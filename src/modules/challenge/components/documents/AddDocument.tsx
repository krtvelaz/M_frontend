import { FormikProps, FormikValues } from "formik";
import React, { FC, useRef, useState } from "react";
import { Card } from "../../../../utils/ui";
import { IChallenge, IDocuments } from "../../custom_types";
import FormAddDocument from "./FormAddDocument";
import TableDocs from "./TableDocs";

interface DocsFormPros {
  typeDoc?: "general" | "administrative" | "technicians";
  setChallenge: any;
  challenge: IChallenge;
  title: string;
}
const AddDocument: FC<DocsFormPros> = ({ setChallenge, typeDoc, challenge, title }) => {
  const form_ref = useRef<FormikProps<FormikValues>>();


  const onAddDocument = (values: any) => {
    setChallenge((data: any) => {
      return {
        ...data,
        documents: {
          general : [
            ...data.documents.general, values
          ]
        }
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title={
              <span style={{ fontSize: "14px" }}>
               {title}
              </span>
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
          <Card
          >
             <span className="my-3" style={{ fontSize: "14px"}}>Documentos agregados</span>
            <TableDocs documents={challenge.documents.general} typeDoc={typeDoc} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
