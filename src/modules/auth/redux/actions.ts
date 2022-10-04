import { auth_http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
import { fail_user, loading_user, success_user, logOut } from './slice';

const login = (document: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(loading_user());
        let user = null;
        try {
            const URI = '/auth/login';
            const res_token: any = await auth_http.post(URI, {
                document,
                password,
            });
            if (res_token.data.data.token) {
                const resul_user: any = await auth_http.post(
                    '/auth/verify',
                    {},
                    {
                        headers: {
                            Authorization: res_token.data.data.token,
                        },
                    }
                );
                user = {
                    token: res_token.data.data.token,
                    detail_user: resul_user.data.data.userData,
                    can_access: true,
                };
            }

            dispatch(success_user(user));
            return user;
        } catch (error) {
            dispatch(fail_user());
            return Promise.reject(error);
        }
    };
};

const logout = () => {
    return async (dispatch: any) => {
        dispatch(logOut());
    };
};

const register = (data: any) => {
    return async (dispatch: any) => {
        let user = null;
        try {
            const URI = '/users';
            const res: any = await auth_http.post(URI, {
                ...data,
                state: {
                    name: 'Antioquia',
                    id: data.state
                },
                city: {
                    name: 'Medellin',
                    id: data.city
                },
                society_type: data.society_type || 'N',

            });
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data;
        } catch (error: any) {
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar.</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject(error);
        }
    };
};

const recover_password = (document: string, email: string) => {
    return async (dispatch: any) => {
        try {
            const URI = '/users/recovery-password';
            const res: any = await auth_http.post(URI, {
                document,
                email,
            });
            return res.data.data;
        } catch (error) {
            return Promise.reject(error);
        }
    };
};



const actions = {
    login,
    logout,
    register,
    recover_password,
};

export default actions;
