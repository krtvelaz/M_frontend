
import { IRoute } from '../../utils/components/router/custom_types';
import CreateChallenge from './views/CreateChallenge';
import ListChallenge from './views/ListChallenge';

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/challenge/create',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar retos',
                        to: '/challenge/list',
                    },
                    { name: 'Crear reto' },
                ],
            },
            component: CreateChallenge,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/challenge/list',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar retos',
                        to: '/challenge/list',
                    },
                    { name: 'Crear reto' },
                ],
            },
            component: ListChallenge,
        },
    ];
};

export default get_routes;
