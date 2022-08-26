
import { IRoute } from "../../utils/components/router/custom_types";
import { guards } from "../home/routes";
import CreatePostulation from "./views/CreatePostulation";
import CreatePostulationTeam from "./views/CreatePostulationTeam";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.success_login,
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
    ];
};

export default get_routes;