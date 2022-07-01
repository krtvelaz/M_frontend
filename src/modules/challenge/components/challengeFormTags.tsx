import { Tabs } from "antd";
import CreateGeneral from "./CreateGeneral";

const ChallengeFormTags = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <div className="h-100 d-flex flex-column">
        <div className="flex-fill overflow-auto">
          <div className="d-flex flex-column h-100">
            <div className="bg-white d-flex flex-row pt-3 ps-4">
              <span
                style={{ fontSize: "14px", fontFamily: "Montserrat-SemiBold" }}
              >
                Crear nuevo reto
              </span>
            </div>
            <div className="">
              <Tabs
                // activeKey={active_key}
                className="w-100 h-100 "
                // onChange={callback}
              >
                <TabPane tab="Información general" key="1">
                  <CreateGeneral />
                </TabPane>
                <TabPane tab="Documentos" key="2" disabled></TabPane>
                <TabPane tab="Informes" key="3" disabled></TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <div
          className="bg-white d-flex flex-row justify-content-between"
          style={{ padding: 16, marginBottom: 60, borderTop: "1px solid #ccc" }}
        >
          <button
            type="button"
            className="btn btn-outline-primary"
          >
            Atrás
          </button>
          <div className="flex-fill" />
          <button
            type="button"
            className="btn btn-primary"
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
};

export default ChallengeFormTags;
