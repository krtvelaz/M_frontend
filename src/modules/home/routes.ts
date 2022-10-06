
import { IRoute } from '../../utils/components/router/custom_types';
import AboutUs from './views/AboutUs';
import CalendarEvents from '../event/compenents/CalendarEvents';
import Home from './views/Home';
import Homepage from './views/Homepage';

export const guards = {
    login_admin: (props?: any) => {                
        return props?.user?.detail_user?.use_role?.id === 1 || props?.user?.detail_user?.use_role?.id === 2;
    },
    login_guest: (props?: any) => {                
        return props?.user?.detail_user?.use_role?.id === 1 || props?.user?.detail_user?.use_role?.id === 2 || props?.user?.detail_user?.use_role?.id === 3;
    },
    login_citizen: (props?: any) => {                
        return props?.user?.detail_user?.use_role?.id === 4 ;
    },
    landing: (props?: any) => {                      
        return !props?.user?.token || props?.user?.detail_user?.use_role?.id === 4;
    },
    
};

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            format: true,
            can_access: guards.login_guest,
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
            can_access: guards.landing,
            path: '/',
            template_props: {
                show_breadcrumbs: false
            },
            
            component: Homepage,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.landing,
            path: '/about-us',
            component: AboutUs,
            template_props: {
                breadcrumbs: [
                    { name: 'Nosotros' },
                ],
            },
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.landing,
            path: '/calendar-events',
            template_props: {
                breadcrumbs: [
                    { name: 'Calendario de eventos' },
                ],
            },
            component: CalendarEvents,
        },
    ];
};

export default get_routes;