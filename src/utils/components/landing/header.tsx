import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoAlcaldiaNegro, logoMedeinn } from '../../assets/img';
import bars from '../../assets/img/bars.svg';
import { TemplateContext } from '../template/templateContext';
import { actions as auth_actions } from '../../../modules/auth/redux';

const Header: FC<{ collapsible: boolean; name?: string }> = ({ collapsible, name }) => {
    const context = useContext(TemplateContext);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link
                            to={'/about-us'}
                            className="link-card"
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                                marginRight: '30px',
                                marginTop: '7px',
                            }}
                        >
                            Configurar cuenta
                        </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div
                            onClick={async () => {                                
                                await dispatch(auth_actions.logout());
                                navigate('../', { replace: true });
                                // context.toggle_login_modal();
                            }}
                        >
                            Cerrar sesión
                        </div>
                    ),
                },
            ]}
        />
    );
    return (
        <>
            <img
                src={logoMedeinn}
                className="logo"
                alt=""
                width="50px"
                // style={{ marginTop: "16px" }}
            />
            <div className="d-flex justify-content-end">
                {context.device === 'lg' ? (
                    <>
                        <div
                            className="link-card"
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                                marginRight: '30px',
                                marginTop: '7px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                navigate('../about-us');
                                const landingScroll: any = document.getElementById('scroll-landing');
                                landingScroll.scrollTop = 0;
                            }}
                        >
                            Nosotros
                        </div>
                        <div
                            className="link-card"
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                                marginRight: '30px',
                                marginTop: '7px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                navigate('../our-challenges');
                                const landingScroll: any = document.getElementById('scroll-landing');
                                landingScroll.scrollTop = 0;
                            }}
                        >
                            Nuestros retos
                        </div>
                        {name ? (
                            <Dropdown overlay={menu}>
                                <span
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        marginRight: '30px',
                                        marginTop: '7px',
                                    }}
                                >
                                    Hola, <span style={{fontFamily: 'Montserrat-Medium'}}>{name}{' '}</span> 
                                    <DownOutlined />
                                </span>
                            </Dropdown>
                        ) : (
                            <>
                                <Link
                                    to={'#'}
                                    className="link-card"
                                    onClick={() => {
                                        context.toggle_login_modal();
                                    }}
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        marginRight: '30px',
                                        marginTop: '7px',
                                    }}
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    to={'/auth/register'}
                                    className="link-card"
                                    style={{ marginRight: '30px', marginTop: '7px' }}
                                >
                                    <button type="button" className="btn btn-landing-primary" onClick={() => {}}>
                                        Registrarme
                                    </button>
                                </Link>
                            </>
                        )}

                        <img
                            src={logoAlcaldiaNegro}
                            alt=""
                            width="80px"
                            style={{
                                marginTop: '16px',
                                marginRight: '70px',
                                marginBottom: '16px',
                            }}
                        />
                    </>
                ) : (
                    <img
                        src={bars}
                        alt=""
                        onClick={context?.drawer_open}
                        style={{
                            cursor: 'pointer',
                            marginTop: '40px',
                            marginRight: '20px',
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Header;
