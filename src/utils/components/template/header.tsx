import React, { FC, useContext } from 'react';
import { TemplateContext } from './templateContext';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import bars from '../../assets/img/bars.svg';
import DropdownNotification from '../../../modules/notificacion/views/DropdownNotification';


const Header: FC<{ collapsible: boolean; name: string }> = ({ collapsible, name }) => {
    const context = useContext(TemplateContext);
    return (
        <div className="bar">
            <div className="d-flex justify-content-between align-items-center">
                <span>
                    {collapsible
                        ? React.createElement(context.menu_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                              className: 'trigger',
                              onClick: () => {
                                  context.menu_toggle();
                                  context.sider_close();
                              },
                          })
                        : context.device === 'lg'
                        ? 'Secretaría de innovación digital, MedeInn laboratorio de innovación'
                        : ''}
                </span>

                <span className="d-flex align-items-center c-fill">
                    <div className="c-fill">
                        <img src={''} className="img-fluid" alt="" width="116" style={{ marginTop: '16px' }} />
                        <span className="header-name" style={{ fontSize: '10px' }}>
                            Hola, <span style={{ fontFamily: 'Montserrat-Bold' }}>{name}</span>
                        </span>
                    </div>

                    <DropdownNotification />
                    <img src={bars} alt="" onClick={context?.drawer_open} style={{ cursor: 'pointer' }} />
                </span>
            </div>
        </div>
    );
};

export default Header;
