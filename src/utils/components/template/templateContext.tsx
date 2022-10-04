import React, { FC, useEffect, useState } from 'react';
import 'moment/locale/es-mx'

type KeyPath = [string, string?];
interface TemplateProps {
    menu_collapsed: boolean;
    drawer_collapsed: boolean;
    menu_toggle: () => void;
    sider_toggle: () => void;
    drawer_open: () => void;
    drawer_close: () => void;
    drawer_menu_collapsed: boolean;
    set_drawer_menu_collapsed: any;
    menu_key_path: KeyPath;
    set_menu_key_path: Function;
    login_modal: boolean;
    percentege: boolean;
    canon_type: string;
    toggle_pass_modal: () => void;
    toggle_percentage_modal: () => void;
    idNode: string;
    set_canon_type: (type: 'inversion' | 'inversion_social' | null) => void;
    device: 'sm' | 'md' | 'lg';
    // width: number;
}

export const TemplateContext = React.createContext<any>(null);

const TemplateProvider: FC<{ children: any;  }> = React.memo(({children}) => {
    const [menu_collapsed, set_menu_collapsed] = useState<boolean>(false);
    const [menu_key_path, set_menu_key_path] = useState<KeyPath>(['p0']);
    const [drawer_collapsed, set_drawer_collapsed] = useState<boolean>(false);
    const [sider_collapsed, set_sider_collapsed] = useState<boolean>(false);
    const [drawer_menu_collapsed, set_drawer_menu_collapsed] = useState<boolean>(false);
    const [login_modal, set_login_modal] = useState<boolean>(false);
    const [percentege, setpercentege] = useState<boolean>(false);
    const [canon_type, setCanon_type] = useState<any>(null);
    const [idNode, set_idNode] = useState<string>('');
    const [docReact, setDocReact] = useState(null);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [device, setDevice] = useState<'sm' | 'md' | 'lg'>('sm');
    const updateDimensions = () => {
        const _width = window.innerWidth;
        let _device: 'sm' | 'md' | 'lg';
        switch (true) {
            case _width <= 767 :
                _device = 'sm';
                break;
            case _width >= 768 && _width < 1024:
                _device = 'md';
                break;
            default:
                _device = 'lg';
                break;
        }
        if (_width !== width) {
            setWidth(_width);
        }
        if (_device !== device) {
            setDevice(_device);
        }
    };


    useEffect(() => {        
        window.addEventListener('resize', updateDimensions.bind(this));
        window.addEventListener('load', updateDimensions.bind(this));
        return () => {
            window.removeEventListener('load', updateDimensions.bind(this));
            window.removeEventListener('resize', updateDimensions.bind(this));
        };
    }, [width]);

    return (
        <TemplateContext.Provider
            value={{
                menu_key_path,
                drawer_menu_collapsed,
                menu_collapsed,
                sider_collapsed,
                drawer_collapsed,
                login_modal,
                percentege,
                canon_type,
                idNode,
                device,
                docReact,
                // width,
                set_menu_key_path,
                set_drawer_menu_collapsed,
                setDocReact,
                menu_toggle: () => set_menu_collapsed((collapsed) => !collapsed),
                sider_open: () => set_sider_collapsed(true),
                sider_close: () => set_sider_collapsed(false),
                drawer_open: () => set_drawer_collapsed(true),
                drawer_close: () => set_drawer_collapsed(false),
                toggle_login_modal: () => set_login_modal((collapsed) => !collapsed),
                toggle_percentage_modal: () => setpercentege((collapsed) => !collapsed),
                set_canon_type: (type: 'inversion' | 'inversion_social' | null) => {
                    setCanon_type(type);
                },
            }}
        >
            {children}
        </TemplateContext.Provider>
    );
});

export default TemplateProvider;
