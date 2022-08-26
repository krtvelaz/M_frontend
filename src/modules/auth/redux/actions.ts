import { auth_http } from '../../../config/axios_instances';
import { fail_user, loading_user, success_user, logOut } from './slice';

const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(loading_user());
        let user = null;
        try {
            const URI = '/auth/login';
            const res_token: any = await auth_http.post(URI, {
                email,
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
                    detail_user: resul_user.data.data.user[0],
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
        console.log('cerar sesion');
        
        dispatch(logOut());        
    };
};

const actions = {
    login,
    logout
};

export default actions;
