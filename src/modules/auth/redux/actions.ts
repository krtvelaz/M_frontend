import Swal from 'sweetalert2';
import { auth_http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
import {
    fail_user,
    loading_user,
    success_user,
    logOut,
    loading_countries,
    success_countries,
    fail_countries,
    loading_states,
    success_states,
    fail_states,
    loading_cities,
    success_cities,
    fail_cities,
} from './slice';

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
        } catch (error:any) {
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
        const final_data = {
            ...data,
            state: data?.state || data?.country,
            city: data?.city || data?.country,
            neighborhood: data?.neighborhood || data?.country,
            
        }
        delete final_data.commune;
        delete final_data.radioPolitica;
        try {
            const URI = '/users';
            const res: any = await auth_http.post(URI, final_data);
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
            await Swal.fire({
                icon: 'success',
                title: 'Recuperar contraseña',
                html:
                    '<div class="mytext"></div>' +
                    `<div class="mysubtitle">${res.data?.message}</div>` +
                    `<div class="mysubtitle">De click en aceptar para continuar</div>`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                width: '500px'
            });
            return res.data.data;
        } catch (error: any) {
            await Swal.fire({
                icon: 'error',
                title: 'Recuperar contraseña',
                html:
                    '<div class="mytext"></div>' +
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
                    `<div class="mysubtitle">De click en aceptar para continuar</div>`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                width: '500px'
            });
            return Promise.reject(error);
        }
    };
};
const change_password = (
    document: string,
    provisional_password: string,
    new_password: string
) => {
    return async (dispatch: any) => {
        try {
            const URI = '/users/update-password';
            const res: any = await auth_http.patch(URI, {
                document,
                provisional_password,
                new_password,
            });
            return res.data.data;
        } catch (error) {
            return Promise.reject(error);
        }
    };
};

const get_countries = () => {
    return async (dispatch: any) => {
        dispatch(loading_countries());
        try {
            const URI = '/lists/countries';
            const res: any = await auth_http.get(URI);
            dispatch(success_countries(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_countries());
            return Promise.reject(error);
        }
    };
};
const get_states = () => {
    return async (dispatch: any) => {
        dispatch(loading_states());
        try {
            const URI = '/lists/states';
            const res: any = await auth_http.get(URI);
            dispatch(success_states(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_states());
            return Promise.reject(error);
        }
    };
};
const get_cities = (id_state: string) => {
    return async (dispatch: any) => {
        dispatch(loading_cities());
        try {
            const URI = '/lists/cities';
            const res: any = await auth_http.get(URI, {
                params: {
                    id_state,
                },
            });
            dispatch(success_cities(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_cities());
            return Promise.reject(error);
        }
    };
};

const actions = {
    login,
    logout,
    register,
    recover_password,
    change_password,
    get_countries,
    get_states,
    get_cities,
};

export default actions;
