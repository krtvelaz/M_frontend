import { IRoute } from "../../utils/components/router/custom_types";
import EditPublication from "./EditPublication";
import CreatePublication from "./views/CreatePublication";
import ListPublication from "./views/ListPublication";

// import store from '../../config/store';
;

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/publication/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Gestionar publicaciones' },
                ],
            },
            component: ListPublication,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/publication/create',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar publicaciones',
                        to: '/publication/list',
                    },
                    { name: 'Nueva publicación' },
                ],
            },
            component: CreatePublication,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/publication/edit/:id',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Gestionar publicaciones',
                        to: '/publication/list',
                    },
                    { name: 'Editar publicación' },
                ],
            },
            component: EditPublication,
        },
    ];
};

export default get_routes;
