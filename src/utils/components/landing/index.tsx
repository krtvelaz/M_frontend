import { Layout, Menu } from 'antd';
import { FC, useContext } from 'react';
import AppHeader from './header';
import AppFooter from './footer';
import Drawer from 'antd/lib/drawer';
import { TemplateContext } from '../template/templateContext';
import { useNavigate } from 'react-router-dom';
import '../../../utils/assets/styles/landing.scss';
import Breadcrumbs from './breadcrumbs';
import { Breadcrumb } from '../router/custom_types';
import ModalLogin from '../../../modules/auth/components/ModalLogin';

interface ILanding {
    breadcrumbs?: Breadcrumb[];
    show_breadcrumbs?: boolean;
    children: any;
    user: any;
}

const LandingPage: FC<ILanding> = ({ children, show_breadcrumbs, breadcrumbs, user }) => {
    const { Header, Content, Footer } = Layout;
    const context = useContext(TemplateContext);
    const navigate = useNavigate();

    

    return (
        <>
            <ModalLogin open={context.login_modal} toggle={context.toggle_login_modal} is_new_user={true} />
            <Layout className="w-100 h-100">
                <Layout className="site-layout-landing">
                    <Header className="landing-header">
                        <AppHeader collapsible={false} name={user ? `${user?.use_names || ''} ${user?.use_surnames || ''}` : ''} />
                    </Header>
                    <Content>
                        <div className={`deck ${context.drawer_menu_collapsed ? 'active' : ''}`} />
                        <div className="d-flex flex-column w-100">
                            {show_breadcrumbs && (
                                <div
                                    className="d-flex justify-content-between align-items-center bar"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        padding: '4px 24px',
                                        boxShadow: 'inset 0px 5px 3px #00000015',
                                    }}
                                >
                                    <Breadcrumbs breadcrumbs={breadcrumbs as Breadcrumb[]} />
                                </div>
                            )}
                            <div id='scroll-landing' className="content medeinn-main-content overflow-auto">
                                {children}
                                <AppFooter />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Drawer
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                placement="right"
                onClose={context?.drawer_close}
                visible={context?.drawer_collapsed}
                width={300}
                className="user-drawer"
            >
                <div className="drawer-content d-flex flex-column">
                    <div style={{ padding: '16px 0px 16px 16px' }}>
                        <Menu mode="inline" selectedKeys={[]} style={{ paddingLeft: '40px' }}>
                            <Menu.Item
                                style={{
                                    borderBottom: '0.5px solid #00000029',
                                    fontSize: '12px',
                                }}
                                key="Drawer-landing-1"
                                onClick={() => {}}
                            >
                                Nosotros
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    borderBottom: '0.5px solid #00000029',
                                    fontSize: '12px',
                                }}
                                key="Drawer-landing-2"
                                onClick={() => navigate('../our-challenges')}
                            >
                                Nuestros retos
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    borderBottom: '0.5px solid #00000029',
                                    fontSize: '12px',
                                }}
                                key="Drawer-landing-3"
                                onClick={() => {
                                    context.toggle_login_modal();
                                    context.drawer_close();
                                }}
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

LandingPage.defaultProps = {
    show_breadcrumbs: true,
};

export default LandingPage;
