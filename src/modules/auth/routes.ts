import { IRoute } from '../../utils/components/router/custom_types';
import Register from './views/Register';
import ResetPassword from './views/ResetPassword';
import { guards } from '../home/routes';
import ForgotPassword from './views/ForgotPassword';

const get_routes = (): IRoute[] => {
    return [
        // {
        //     exact: true,
        //     is_private: false,
        //     format: false,
        //     path: '/auth/login/',
        //     component: Login,
        // },

        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/auth/register/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Formulario de registro',
                    },
                ],
            },
            component: Register,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/auth/reset-password/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Cambiar contraseña',
                    },
                ],
            },
            component: ResetPassword,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.logOut,
            path: '/auth/forgot-password/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Reestablecer contraseña',
                    },
                ],
            },
            component: ForgotPassword,
        },
    ];
};

export default get_routes;
