import { Tabs } from "antd";
import { FC, useEffect } from "react";
import { IChallenge, } from "../../custom_types";
import AddDocument from "./AddDocument";

interface DocumentsProps {
  setChallenge: any;
  challenge: IChallenge;
  active_key: string;
}

const DocumentFormTags: FC<DocumentsProps> = ({ setChallenge, challenge, active_key }) => {
  
  
  useEffect(()=> {
    console.log('cambio', active_key);
    
  },[active_key])
  const { TabPane } = Tabs;
  return (
    <Tabs
      className="w-100 h-100 docs-challenge"
      activeKey={active_key}
      // onChange={callback}
    >
      <TabPane tab="Doc. Generales" key="docs-1">
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="general" title='Agregar documentos generales' />
      </TabPane>
      <TabPane tab="Doc. Técnicos" key="docs-2">
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="technicians" title='Agregar documentos técnicos' />
      </TabPane>
      <TabPane tab="Doc. Administrativos" key="docs-3">
        <AddDocument setChallenge={setChallenge} challenge={challenge} typeDoc="administrative" title='Agregar documentos adminitrativos' />
      </TabPane>
    </Tabs>
  );
};



export default DocumentFormTags;
