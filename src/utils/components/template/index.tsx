import { Layout } from 'antd';
import { FC, useContext, useState } from 'react';
import AppSider from './sider';
import AppHeader from './header';
import { TemplateContext } from './templateContext';
import Drawer from 'antd/lib/drawer';
import Menu from 'antd/lib/menu';
import Breadcrumbs from './breadcrumbs';
import { Breadcrumb } from '../router/custom_types';
import { useNavigate } from 'react-router-dom';
import { actions as auth_actions } from '../../../modules/auth/redux';
import { useDispatch } from 'react-redux';
import '../../assets/styles/template.scss';

interface ITemplate {
    breadcrumbs?: Breadcrumb[];
    show_breadcrumbs?: boolean;
    user: any;
    roles_user?: any;
    children?: any;
}

const Template: FC<ITemplate> = ({ children, breadcrumbs, show_breadcrumbs, user }) => {
    const { Header, Sider, Content } = Layout;
    const context = useContext(TemplateContext);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [menuSider, setMenuSider] = useState([]);
    const collapsible = context.device === 'md' ? true : false;
    const sider_ops = {
        width: 280,
        style: { backgroundColor: 'white' },
        ...(collapsible
            ? {
                  trigger: null,
                  collapsible,
                  collapsed: context.menu_collapsed,
                  collapsedWidth: 0,
              }
            : {
                  collapsed: false,
              }),
    };

    const goTo = (to: any) => {
        context.drawer_close();
        navigate(to.item.props.path, { state: to.keyPath });
        context.sider_close();
    };

    return (
        <>
            <Layout className="w-100 h-100">
                {context.device !== 'sm' && (
                    <>
                        <Sider {...sider_ops} width={280}>
                            <AppSider width={sider_ops.width} setMenuSider={setMenuSider} />
                        </Sider>
                        {context.sider_collapsed && (
                            <div className="container-modal">
                                <div className="content-modal">
                                    <Menu
                                        style={{ fontSize: '12px', backgroundColor: '#F2F2F2' }}
                                        onSelect={goTo}
                                        items={menuSider}
                                    />
                                </div>
                                <div className="cerrar-modal" onClick={() => context.sider_close()}></div>
                            </div>
                        )}
                    </>
                )}
                <Layout className="site-layout">
                    <Header className="component-header p-0">
                        <AppHeader collapsible={collapsible} name={`${user?.use_names} ${user?.use_surnames}`} />
                    </Header>
                    <Content>
                        <div className={`deck ${context.drawer_menu_collapsed ? 'active' : ''}`} />
                        <div className="d-flex flex-column w-100">
                            {show_breadcrumbs && (
                                <div
                                    className="d-flex justify-content-between align-items-center bar"
                                    style={{
                                        backgroundColor: '#1D98D1',
                                        padding: '4px 24px',
                                        color: 'white',
                                        boxShadow: 'inset 0px 5px 3px #00000015',
                                    }}
                                >
                                    <Breadcrumbs breadcrumbs={breadcrumbs as Breadcrumb[]} />
                                </div>
                            )}
                            <div
                                
                                className="content medeinn-main-content overflow-auto"
                            >
                                {children}
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
                <div
                    className="d-flex justify-content-center align-items-center text-white"
                    style={{
                        backgroundColor: '#1D98D1',
                        borderRight: '1px solid #2ea1fe',
                        height: 180,
                        letterSpacing: '-0.4px',
                    }}
                >
                    <div
                        className="d-flex align-start flex-column text-center"
                        style={{ width: '80%', fontFamily: 'Montserrat-Bold' }}
                    >
                        <span style={{ fontSize: '22px' }}>Luisa María</span>
                        <span style={{ fontSize: '16px' }}>Sánchez Cadavid</span>
                        <span
                            style={{
                                fontWeight: 400,
                                fontSize: '16px !important',
                                lineHeight: '40px',
                                fontFamily: 'Montserrat-Regular',
                            }}
                        >
                            C.C. {new Intl.NumberFormat().format(1007845632)}
                        </span>
                    </div>
                </div>
                <div className="drawer-content d-flex flex-column">
                    <div style={{ padding: '16px 0px 16px 16px' }}>
                        <Menu mode="inline" selectedKeys={[]} style={{ paddingLeft: '40px' }}>
                            <Menu.Item
                                style={{
                                    borderBottom: '0.5px solid #00000029',
                                    fontSize: '12px',
                                }}
                                key="Drawer-1"
                                onClick={() => {
                                    context?.toggle_pass_modal();
                                    context?.drawer_close();
                                }}
                            >
                                Cambiar contraseña
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    borderBottom: '0.5px solid #00000029',
                                    fontSize: '12px',
                                }}
                                key="Drawer-2"
                                onClick={() => {
                                    context?.drawer_close();
                                }}
                            >
                                Editar usuario
                            </Menu.Item>
                        </Menu>
                    </div>
                    {context?.device === 'sm' && (
                        <div className="flex-fill" style={{ overflowY: 'auto' }}>
                            <AppSider width={sider_ops.width} setMenuSider={setMenuSider} />
                        </div>
                    )}
                </div>
                <div
                    className="p-4 session-close"
                    style={{ fontSize: '12px' }}
                    onClick={async () => {
                        await dispatch(auth_actions.logout());
                        navigate('../', { replace: true });
                        context.drawer_close();
                    }}
                >
                    CERRAR SESIÓN
                </div>
            </Drawer>
        </>
    );
};

Template.defaultProps = {
    show_breadcrumbs: true,
};

export default Template;
