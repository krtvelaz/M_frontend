
import { IRoute } from '../../utils/components/router/custom_types';
import AboutUs from './views/AboutUs';
import Home from './views/Home';
import Homepage from './views/Homepage';

export const guards = {
    success_login: (props?: any) => {                
        return !!props?.user?.token;
    },
    logOut: (props?: any) => {              
        return props?.user?.token ? false : true;
    },
};

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            format: true,
            can_access: guards.success_login,
            path: '/home',
            component: Home,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/',
            component: Homepage,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access:  guards.logOut,
            path: '/about-us',
            component: AboutUs,
            template_props: {
                breadcrumbs: [
                    { name: 'Nosotros' },
                ],
            },
        },
    ];
};

export default get_routes;