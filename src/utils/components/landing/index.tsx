import { Layout, Menu } from "antd";
import { FC, useContext } from "react";
import AppHeader from "./header";
import Drawer from "antd/lib/drawer";
import { TemplateContext } from "../template/templateContext";
import { logoAlcaldiaNegro } from "../../assets/img";

interface ILanding {
  children: any;
}

const LandingPage: FC<ILanding> = ({ children }) => {
  const { Header, Content, Footer } = Layout;
  const context = useContext(TemplateContext);
  return (
    <>
      <Layout className="w-100 h-100">
        <Header className="landing-header p-0">
          <AppHeader collapsible={false} />
        </Header>
        <Content>
          <div className="d-flex flex-column w-100">
            <div className="content overflow-auto">{children}</div>
          </div>
        </Content>
        <Footer className="footer-landing">
          <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row mb-3"></div>
                  <div className="col-md-12">
                    <div className="d-flex flex-row justify-content-between" style={{backgroundColor: '#3366CC'}}>alcaldia de medellin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
      <Drawer
        maskStyle={{
          backgroundColor: "rgba(6, 100, 144 ,0.8)",
        }}
        placement="right"
        onClose={context?.drawer_close}
        visible={context?.drawer_collapsed}
        width={300}
        className="user-drawer"
      >
        <div className="drawer-content d-flex flex-column">
          <div style={{ padding: "16px 0px 16px 16px" }}>
            <Menu
              mode="inline"
              selectedKeys={[]}
              style={{ paddingLeft: "40px" }}
            >
              <Menu.Item
                style={{
                  borderBottom: "0.5px solid #00000029",
                  fontSize: "12px",
                }}
                key="Drawer-1"
                onClick={() => {}}
              >
                Nosotros
              </Menu.Item>
              <Menu.Item
                style={{
                  borderBottom: "0.5px solid #00000029",
                  fontSize: "12px",
                }}
                key="Drawer-2"
                onClick={() => {}}
              >
                Nuestros retos
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LandingPage;
