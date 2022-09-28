
import { IRoute } from "../../utils/components/router/custom_types";
import managePostulations from "./views/managePostulations";
import { guards } from "../home/routes";
import FormPostulation from "./components/FormPostulation";
import CreatePostulation from "./views/CreatePostulation";
import CreatePostulationTeam from "./views/CreatePostulationTeam";
import PostulationView from "./views/PostulationView";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.success_login,
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
            can_access: guards.logOut,
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
            can_access: true,
            format: true,
            path: '/postulation-team-challenge',
            component: CreatePostulationTeam,
            template_props: {
                breadcrumbs: [
                    { name: 'Team' },
                ],
            },
            
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.logOut,
            format: true,
            path: '/postulation/challenge/:id',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Retos y Postulaciones',
                        to: '/postulation/challenge',
                    },
                    
                ],
            },
            component: PostulationView,
        },
    ];
};

export default get_routes;