import { IRoute } from "../../utils/components/router/custom_types";
import { guards } from "../home/routes";
import ListUser from "./views/ListUser";

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.login_admin,
            format: true,
            path: '/list/users',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar usuarios',
                        to: '/list/users',
                    },
                   
                ],
            },
            component: ListUser,
        },
    ]
}

export default get_routes;