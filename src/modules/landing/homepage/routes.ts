import { IRoute } from "../../../utils/components/router/custom_types";
import AboutUs from "./views/AboutUs";
import Homepage from "./views/Homepage";

export const guards = {
    logOut: (props?: any) => {                
        return !props?.user?.token;
    },
};

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.logOut,
            path: '/',
            component: Homepage,
            template_props: {
                breadcrumbs: [
                    { name: 'Inicio' },
                ],
            },
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/about-us',
            component: AboutUs,
            template_props: {
                breadcrumbs: [
                    { name: 'Nosotros' },
                ],
            },
        },
    ];
};

export default get_routes;
