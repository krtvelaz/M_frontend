import { IRoute } from "../../utils/components/router/custom_types";
import CreatePublication from "./views/CreatePublication";
import ListPublication from "./views/ListPublication";
import EditPublication from "./views/EditPublication";
import { guards } from "../home/routes";
import DetailPublication from "./views/DetailPublication";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.login_admin,
            format: true,
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
            can_access: guards.login_admin,
            format: true,
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
            can_access: guards.login_admin,
            format: true,
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
        {
            exact: true,
            is_private: false,
            can_access: guards.landing,
            format: true,
            path: '/detail-publication/:id',
            template_props: {
                breadcrumbs: [
                    
                    { name: 'Detalles de la publicación' },
                ],
            },
            component: DetailPublication,
        },
    ];
};

export default get_routes;
