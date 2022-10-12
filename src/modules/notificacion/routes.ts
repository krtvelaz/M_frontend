import { IRoute } from "../../utils/components/router/custom_types";
import { guards } from "../home/routes";
import ListNotifications from "./views/ListNotifications";

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access:  guards.login_admin,
            format: true,
            path: '/notifications/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Notificaciones' },
                ],
            },
            component: ListNotifications,
        },
        
    ];
};

export default get_routes;