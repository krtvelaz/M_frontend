// import store from '../../config/store';

import { IRoute } from "../../utils/components/router/custom_types";
import CreateMainBanner from "./views/CreateMainBanner";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/banners/create',
            template_props: {
                breadcrumbs: [
                    { name: 'Carrusel principal' },
                ],
            },
            component: CreateMainBanner,
        },
    ];
};

export default get_routes;
