// import store from '../../config/store';

import { IRoute } from "../../utils/components/router/custom_types";
import CreateMainBanner from "./views/CreateMainBanner";
import CreateTestimony from "./views/CreateTestimony";


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

        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/testimony/create',
            template_props: {
                breadcrumbs: [
                    { name: 'Carrusel principal' },
                ],
            },
            component: CreateTestimony,
        },
    ];
};

export default get_routes;
