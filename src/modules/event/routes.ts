import { IRoute } from "../../utils/components/router/custom_types";
import { guards } from "../home/routes";
import CreateEvent from "./views/CreateEvent";
import ListEvent from "./views/ListEvent";
import ListNewsletters from "./views/ListNewsletters";



const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access:   guards.login_admin,
            format: true,
            path: '/newsletters/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Notificaciones' },
                ],
            },
            component: ListNewsletters,
        },
        {
            exact: true,
            is_private: true,
            can_access:  guards.login_admin,
            format: true,
            path: '/event/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Gestionar eventos' },
                ],
            },
            component: ListEvent,
        },
        {
            exact: true,
            is_private: true,
            can_access:  guards.login_admin,
            format: true,
            path: '/event/create',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar eventos',
                        to: '/event/list',
                    },
                       { name: 'Crear evento',}
                ],
            },
            component: CreateEvent,
        },
    ];
};

export default get_routes;