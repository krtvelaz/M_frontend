import { Layout, Menu } from "antd";
import { FC, useContext } from "react";
import AppHeader from "./header";
import AppFooter from "./footer";
import Drawer from "antd/lib/drawer";
import { TemplateContext } from "../template/templateContext";
import { useNavigate } from "react-router-dom";


interface ILanding {
  children: any;
}

const LandingPage: FC<ILanding> = ({ children }) => {
  const { Header, Content, Footer } = Layout;
  const context = useContext(TemplateContext);
  const navigate = useNavigate();
  return (
    <>
      <Layout className="w-100 h-100">
        <Layout className="site-layout-landing">
          <Header className="landing-header">
            <AppHeader collapsible={false} />
          </Header>
          <Content>
            <div
              className={`deck ${
                context.drawer_menu_collapsed ? "active" : ""
              }`}
            />
            <div className="d-flex flex-column w-100">
              <div className="content medeinn-main-content overflow-auto">
                {children}
                <AppFooter />
               
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Drawer
        maskStyle={{
          backgroundColor: "rgba(6, 100, 144 ,0.71)",
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
                onClick={() => navigate('../our-challenges')}
              >
                Nuestros retos
              </Menu.Item>
              <Menu.Item
                style={{
                  borderBottom: "0.5px solid #00000029",
                  fontSize: "12px",
                }}
                key="Drawer-2"
                onClick={ () => navigate('../auth/login/')}
              >
                Ingresar
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LandingPage;
