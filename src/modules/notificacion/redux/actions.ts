import { http } from '../../../config/axios_instances';
import { notifications_list_default, notifications_list_fail, notifications_list_success } from './slice';

export const get_list_notifications = (filters?: {
    page: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
    is_readed?: boolean;
}) => {
    return async (dispatch: any) => {
        dispatch(notifications_list_default());
        try {
            const URI = '/notifications/list';
            const res = await http.get(URI, {
                params: {
                    ...filters,
                },
            });
            console.log(res.data.data);

            const notifications = {
                results: res.data.data,
                pagination: res.data.meta
            }
            
            dispatch(notifications_list_success(notifications));
            return res.data.data;
        } catch (error) {
            dispatch(notifications_list_fail());
            return Promise.reject(error);
        }
    };
};

const actions = {
    get_list_notifications
};

export default actions;
