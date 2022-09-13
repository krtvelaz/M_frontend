import { IRoute } from "../../utils/components/router/custom_types";
import Login from "./views/Login";
import Register from "./views/Register";
import ResetPassword from "./views/ResetPassword";
import { guards } from "../home/routes";



const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: false,
            format: false,
            path: '/auth/login/',
            component: Login,
        },
    
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/auth/register/',
            component: Register,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/auth/reset-password/',
            component: ResetPassword,
        },
    ];
};

export default get_routes;