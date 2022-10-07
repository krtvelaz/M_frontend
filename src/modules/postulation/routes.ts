
import { IRoute } from "../../utils/components/router/custom_types";
import managePostulations from "./views/managePostulations";
import { guards } from "../home/routes";
import FormPostulation from "./components/FormPostulation";
import CreatePostulation from "./views/CreatePostulation";
import PostulationView from "./views/PostulationView";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.login_admin,
            format: true,
            path: '/list/postulations',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Retos y Postulaciones',
                        to: '/list/postulations',
                    },
                    
                ],
            },
            component: managePostulations,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.landing,
            format: true,
            path: '/postulation-challenge',
            component: CreatePostulation,
            template_props: {
                breadcrumbs: [
                    { name: 'Postulation' },
                    
                ],
            },
            
        },
        {
            exact: true,
            is_private: true,
            can_access:  guards.landing,
            format: true,
            path: '/postulation/challenge/:id',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Detalles del reto',
                        
                    },
                    {
                        name: 'postulación',                        
                    },
                    
                ],
            },
            component: PostulationView,
        },
    ];
};

export default get_routes;