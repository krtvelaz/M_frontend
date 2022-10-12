import { IRoute } from '../../utils/components/router/custom_types';
import Register from './views/Register';
import { guards } from '../home/routes';
import RecoverPassword from './views/RecoverPassword';
import ChangePassword from './views/ChangePassword';

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
            can_access: true,
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
            can_access: guards.landing,
            path: '/auth/change-password/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Cambiar contraseña',
                    },
                ],
            },
            component: ChangePassword,
        },
        {
            exact: true,
            is_private: false,
            format: true,
            can_access: guards.landing,
            path: '/auth/recover-password/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Recuperar contraseña',
                    },
                ],
            },
            component: RecoverPassword,
        },
    ];
};

export default get_routes;
