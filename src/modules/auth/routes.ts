import { IRoute } from "../../utils/components/router/custom_types";
import Login from "./views/Login";


const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: false,
            format: false,
            path: '/auth/login/',
            component: Login,
        },
    ];
};

export default get_routes;