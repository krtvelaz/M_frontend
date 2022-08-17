import { Tabs } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { IChallenge, IDocument, IMasters } from "../../custom_types";

import AddDocument from "./AddDocument";

interface DocumentsProps {
  onAddDocument: any;
  onDelete: (index: number) => void;
  onEditDocument: (values: IDocument) => any;
  typeDoc: "general" | "admin" | "technicians";
  challenge: IChallenge;
  active_key: string;
}

const DocumentFormTags: FC<DocumentsProps> = ({
  onAddDocument,
  onDelete,
  onEditDocument,
  typeDoc,
  challenge,
  active_key,
}) => {
  const { TabPane } = Tabs;

  

    return (
    <Tabs className="w-100 h-100 docs-challenge" activeKey={active_key}>
      <TabPane tab="Doc. Generales" key="docs-1">
        <AddDocument
          typesDocument={[]}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
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
          typesDocument={[]}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
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
          typesDocument={[]}
          onAddDocument={onAddDocument}
          onDelete={onDelete}
          onEditDocument={onEditDocument}
          typeDoc={typeDoc}
          title="Agregar documentos adminitrativos"
        />
      </TabPane>
    </Tabs>
  );
};

export default DocumentFormTags;
