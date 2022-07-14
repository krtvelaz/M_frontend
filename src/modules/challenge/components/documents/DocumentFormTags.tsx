import { Tabs } from "antd";
import { FC } from "react";
import { IChallenge, } from "../../custom_types";
import AddDocument from "./AddDocument";

interface DocumentsProps {
  setChallenge: any;
  challenge: IChallenge;
  active_key: string;
}

const DocumentFormTags: FC<DocumentsProps> = ({ setChallenge, challenge, active_key }) => {
  
  
  const { TabPane } = Tabs;
  return (
    <Tabs
      className="w-100 h-100 docs-challenge"
      activeKey={active_key}
      // onChange={callback}
    >
      <TabPane tab="Doc. Generales" key="docs-1">
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="general" title='Agregar documentos generales' seeTable={challenge.documents.general.length > 0 ? true : false} />
      </TabPane>
      <TabPane tab="Doc. Técnicos" key="docs-2" disabled={challenge.documents.general.length === 0}>
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="technicians" title='Agregar documentos técnicos' seeTable={challenge.documents.technical.length > 0 ? true : false} />
      </TabPane>
      <TabPane tab="Doc. Administrativos" key="docs-3" disabled={challenge.documents.general.length === 0}>
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="administrative" title='Agregar documentos adminitrativos' seeTable={challenge.documents.administrative.length > 0 ? true : false} />
      </TabPane>
    </Tabs>
  );
};



export default DocumentFormTags;
