
import { IRoute } from '../../../utils/components/router/custom_types';
import Home from './views/Home';

export const guards = {
    success_login: (props?: any) => {               
        return !!props?.user?.token;
    },
};

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.success_login,
            path: '/home',
            component: Home,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
    ];
};

export default get_routes;