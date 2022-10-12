import { Children, FC, useContext } from 'react';
import { TemplateContext } from './templateContext';
import Menu from 'antd/lib/menu';
import logoAlcaldia from '../../../utils/assets/img/logoAlcaldia.svg';
import { useNavigate } from 'react-router-dom';
import { logoMedeinnWhite } from '../../assets/img';

const sider: FC<{ width: number; setMenuSider: any }> = ({ width, setMenuSider }) => {
    const context = useContext(TemplateContext);
    const navigate = useNavigate();

    let retos = [
        {
            path: '/challenge/create',
            label: 'Crear nuevo reto',
        },
        {
            path: '/challenge/list',
            label: 'Consutar y gestionar retos',
        },
    ];
    const publicaciones = [
        {
            path: '/publication/create',
            label: 'Crear publicación',
        },
        {
            path: '/publication/list',
            label: 'Gestionar publicaciones',
        },
    ];
    const eventos = [
        {
            path: '/event/create',
            label: 'Crear nuevo evento',
        },
        {
            path: '/event/list',
            label: 'Gestionar eventos',
        },
        {
            path: '/newsletters/list',
            label: 'Suscripciones al boletín',
        },
    ];
    const postulaciones = [
        {
            path: '/list/postulations',
            label: 'Gestionar postulaciones',
        },
    ];

    const landingPage = [
        {
            path: '/banners/create',
            label: 'Carrusel banners principal',
        },
        {
            path: '/indicator/create',
            label: 'Editar indicadores',
        },
        {
            path: '/testimony/create',
            label: 'Carrusel testimonios',
        },
    ];

    let menu_config: any = [
        {
            label:
                context.device === 'sm' ? (
                    'Página principal'
                ) : (
                    <div>
                        <div
                            style={{
                                paddingLeft: '35px',
                            }}
                            className="principal-silder"
                        >
                            Página principal
                        </div>
                    </div>
                ),
            path: '/home',
        },
        {
            label:
                context.device === 'sm' ? (
                    'Roles y permisos'
                ) : (
                    <div>
                        <div
                            style={{
                                paddingLeft: '35px',
                            }}
                            className="principal-silder"
                        >
                            Roles y permisos
                        </div>
                    </div>
                ),
            path: '/list/users',
        },
        {
            label:
                context.device === 'sm' ? (
                    'Retos'
                ) : (
                    <div>
                        <div style={{ paddingLeft: '35px' }}>Retos</div>
                        <i className="ant-menu-submenu-arrow" />
                    </div>
                ),
            ...(context.device === 'sm' ? { children: retos } : { menu: retos }),
        },
        {
            label:
                context.device === 'sm' ? (
                    'Publicaciones'
                ) : (
                    <div>
                        <div style={{ paddingLeft: '35px' }}>Publicaciones</div>
                        <i className="ant-menu-submenu-arrow" />
                    </div>
                ),
            ...(context.device === 'sm' ? { children: publicaciones } : { menu: publicaciones }),
        },
        {
            label:
                context.device === 'sm' ? (
                    'Landing Page'
                ) : (
                    <div>
                        <div style={{ paddingLeft: '35px' }}>Landing page</div>
                        <i className="ant-menu-submenu-arrow" />
                    </div>
                ),
            ...(context.device === 'sm' ? { children: landingPage } : { menu: landingPage }),
        },

        {
            label:
                context.device === 'sm' ? (
                    'Eventos'
                ) : (
                    <div>
                        <div style={{ paddingLeft: '35px' }}>Eventos</div>
                        <i className="ant-menu-submenu-arrow" />
                    </div>
                ),
            ...(context.device === 'sm' ? { children: eventos } : { menu: eventos }),
        },
        {
            label:
                context.device === 'sm' ? (
                    'Postulaciones'
                ) : (
                    <div>
                        <div style={{ paddingLeft: '35px' }}>Postulaciones</div>
                        <i className="ant-menu-submenu-arrow" />
                    </div>
                ),
            ...(context.device === 'sm' ? { children: postulaciones } : { menu: postulaciones }),
        },
    ];

    menu_config = menu_config.map((m: any, i: any) => {
        return {
            ...m,
            ...(m.children
                ? {
                      children: m.children.map((s: any, j: any) => {
                          return { ...s, key: `s${i}-${j}` };
                      }),
                  }
                : {}),
            key: `p${i}`,
        };
    });

    const goTo = (to: any) => {
        if (to.item.props.menu) {
            setMenuSider(to.item.props.menu);
            context.sider_open();
            return;
        }
        context.sider_close();
        context.drawer_close();

        navigate(to.item.props.path, { state: to.keyPath });
    };

    return (
        <>
            {context.device !== 'sm' && (
                <div
                    className="text-center"
                    style={{
                        backgroundColor: '#1D98D1',
                        borderRight: '1px solid #2ea1fe',
                        marginBottom: '3px',
                    }}
                >
                    <img
                        src={logoAlcaldia}
                        className="img-fluid"
                        alt=""
                        width="60%"
                        style={{ padding: '20px 0 10px 0' }}
                    />
                    <img
                        src={logoMedeinnWhite}
                        className="img-fluid"
                        alt=""
                        width="75%"
                        style={{ padding: '0 0 30px 0' }}
                    />
                </div>
            )}
            <Menu
                style={{ fontSize: '12px' }}
                className={`${context.device === 'sm' ? 'menu-horizontal' : ''}`}
                onClick={goTo}
                items={menu_config}
                mode={context.device === 'sm' ? 'inline' : 'vertical'}
            />
        </>
    );
};

export default sider;
