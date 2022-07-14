import { IRoute } from "../../../utils/components/router/custom_types";
import CreatePostulation from "./views/CreatePostulation";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/postulation-challenge',
            component: CreatePostulation,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
    ];
};

export default get_routes;
