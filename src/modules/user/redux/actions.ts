import { auth_http } from '../../../config/axios_instances';
import { default_list_users, fail_list_users, success_list_users,
    detailRole_default,
    detailRole_success,
    detailRole_fail
} from './slice';

interface filter {
    page?: number;
    page_size?: number;
    order_by_key?:  string;
    order_by_value?: string;
    document?: string;
    role?: string | number;
    is_published?: boolean;
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
                },});
            dispatch(detailRole_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(detailRole_fail);
            return Promise.reject('Error');
        }
    };
};

const actions = {
    get_list_users,
    get__RoleDetail
}

export default actions;