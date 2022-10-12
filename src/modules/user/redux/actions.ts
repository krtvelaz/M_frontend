import { auth_http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';

import {
    default_list_users,
    fail_list_users,
    success_list_users,
    detailRole_default,
    detailRole_success,
    detailRole_fail,
    changeRole_default,
    changeRole_success,
    changeRole_fail,
} from './slice';

interface filter {
    page?: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
    document?: string;
    role?: string | number;
    is_published?: boolean;
    from?: string;
}

const get_list_users = (filter?: filter) => {
    return async (dispatch: any) => {
        dispatch(default_list_users());
        try {
            const URI = `/users/list`;
            const res = await auth_http.get(URI, {
                params: {
                    ...filter,
                },
            });

            const users = {
                results: res.data.data,
                pagination: res.data.meta,
            };
            dispatch(success_list_users(users));
            return res.data.data;
        } catch (error) {
            dispatch(fail_list_users());
            return Promise.reject('Error');
        }
    };
};

const get__RoleDetail = (id: any) => {
    return async (dispatch: any) => {
        dispatch(detailRole_default);
        try {
            const URI = `/roles`;
            const res: any = await auth_http.get(URI, {
                params: {
                    id,
                },
            });
            dispatch(detailRole_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(detailRole_fail);
            return Promise.reject('Error');
        }
    };
};

    const change_RoleUser = (id: any, id_role: any,
    set_is_visible: React.Dispatch<React.SetStateAction<boolean>>
        
        ) => {

    return async (dispatch: any) => {
        dispatch(changeRole_default);
        try {
            const URI = `/users/change-role`;
            const res: any = await auth_http.patch(
                URI,
                {},
                {
                    params: {
                        id,
                        id_role,
                    },
                }
            );
            dispatch(changeRole_success(res.data.message));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">Se asignó con éxito el rol ${res.data.data.use_role.rol_name}</div>` +
                    '<div class="mytext">A continuación serás dirigido a roles y permisos.</div>',
                showCancelButton: false,

                confirmButtonText: 'Aceptar',
            })
            .then((confirm) => {
                if (confirm.isConfirmed) {
                    set_is_visible(false);
                }
            });
            return res.data;
        } catch (error) {
            dispatch(changeRole_fail);
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">Ha ocurrido un error inesperado</div>` +
                    '<div class="mytext">El usuario ya tiene este rol asignado o existe un error en el sistema por favor intente mas tarde.</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};

const actions = {
    get_list_users,
    get__RoleDetail,
    change_RoleUser,
};

export default actions;
