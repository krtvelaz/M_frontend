import { IRoute } from "../../utils/components/router/custom_types";
import Homepage from "./views/Homepage";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/',
            component: Homepage,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
    ];
};

export default get_routes;
