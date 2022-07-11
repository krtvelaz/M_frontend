import { IRoute } from "../../utils/components/router/custom_types";
import CreateNews from "./views/CreateNews";
import CreatePublication from "./views/CreatePublication";

// import store from '../../config/store';
;

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/publication/create',
            template_props: {
                breadcrumbs: [
                    { name: 'Carrusel principal' },
                ],
            },
            component: CreatePublication,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/news/create',
            template_props: {
                breadcrumbs: [
                    { name: 'Carrusel principal' },
                ],
            },
            component: CreateNews,
        },
    ];
};

export default get_routes;
