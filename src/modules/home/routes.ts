
import { IRoute } from '../../utils/components/router/custom_types';
import Home from './views/Home';

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/',
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