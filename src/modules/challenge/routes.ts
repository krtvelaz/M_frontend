
import { IRoute } from '../../utils/components/router/custom_types';
import { guards } from '../home/routes';
import CreateChallenge from './views/CreateChallenge';
import DetailChallenge from './views/DetailChallenge';
import EditChallemge from './views/EditChallemge';
import ListChallenge from './views/ListChallenge';
import OurChallenges from './views/OurChallenges';


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access:  guards.login_guest,
            format: true,
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
            can_access:  guards.login_guest,
            format: true,
            path: '/challenge/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Gestionar retos' },
                ],
            },
            component: ListChallenge,
        },
        {
            exact: true,
            is_private: true,
            can_access:  guards.login_guest,
            format: true,
            path: '/challenge/edit/:id',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar retos',
                        to: '/challenge/list',
                    },
                    { name: 'Editar reto' },
                ],
            },
            component: EditChallemge,
        },
        {
            exact: true,
            is_private: false,
            can_access: guards.landing,
            format: true,
            path: '/detail-challenge/:id',
            component: DetailChallenge,
            template_props: {
                breadcrumbs: [
                    { name: 'Detalles del reto' },
                ],
            },
        },
        {
            exact: true,
            is_private: false,
            can_access: guards.landing,
            format: true,
            path: '/our-challenges',
            component: OurChallenges,
            template_props: {
                breadcrumbs: [
                    { name: 'Retos actuales' },
                ],
            },
        },
       
        
    ];
};

export default get_routes;
