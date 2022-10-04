import { auth_http } from '../../../config/axios_instances';
import { default_list_users, fail_list_users, success_list_users } from './slice';

interface filter {
    page: number;
    page_size?: number;
    order_by_key?:  string;
    order_by_value?: string;
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


const actions = {
    get_list_users,

}

export default actions;