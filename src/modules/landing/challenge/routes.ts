import { IRoute } from "../../../utils/components/router/custom_types";
import DetailChallenge from "./views/DetailChallenge";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/detail-challenge/:id',
            component: DetailChallenge,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
    ];
};

export default get_routes;
