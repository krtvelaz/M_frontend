import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IChallenge, IDocument } from "../../custom_types";
import useDocument from "../../hooks/useTypeDocs";
import { actions } from "../../redux";
import AddDocument from "./AddDocument";

interface DocumentsProps {
  typesDocument: any
  onAddDocument: any
  onDelete: (index: number) => void;
  onEditDocument: (values: IDocument) => any;
  editListDocs: (value: number) => void;
  typeDoc: "general" | "admin" | "technicians";
  challenge: IChallenge;
  active_key: string;
}

const DocumentFormTags: FC<DocumentsProps> = ({
  typesDocument,
  onAddDocument,
  onDelete,
  onEditDocument,
  editListDocs,
  typeDoc,
  challenge,
  active_key,
}) => {

  const { TabPane } = Tabs;
  
  return (
    <Tabs
      className="w-100 h-100 docs-challenge"
      activeKey={active_key}
    >
      <TabPane tab="Doc. Generales" key="docs-1">
        <AddDocument
          typesDocument={typesDocument}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
          editListDocs={editListDocs}
          typeDoc={typeDoc}
          title="Agregar documentos generales"
        />
      </TabPane>
      <TabPane
        tab="Doc. Técnicos"
        key="docs-2"
        disabled={challenge.documents.general.length === 0}
      >
        <AddDocument
          typesDocument={typesDocument}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
          editListDocs={editListDocs}
          typeDoc={typeDoc}
          title="Agregar documentos técnicos"
        />
      </TabPane>
      <TabPane
        tab="Doc. Administrativos"
        key="docs-3"
        disabled={challenge.documents.general.length === 0}
      >
        <AddDocument
          typesDocument={typesDocument}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
          editListDocs={editListDocs}
          typeDoc={typeDoc}
          title="Agregar documentos adminitrativos"
        />
      </TabPane>
    </Tabs>
  );
};

export default DocumentFormTags;
