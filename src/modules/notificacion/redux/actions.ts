import { http } from '../../../config/axios_instances';
import {
    notifications_list_default,
    notifications_list_fail,
    notifications_list_success,
    notification_default,
    notification_fail,
    notification_success,
} from './slice';

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

            const notifications = {
                results: res.data.data,
                pagination: res.data.meta,
            };

            dispatch(notifications_list_success(notifications));
            return res.data.data;
        } catch (error) {
            dispatch(notifications_list_fail());
            return Promise.reject(error);
        }
    };
};
export const status_notification = (id: number) => {
    return async (dispatch: any) => {
        dispatch(notification_default());
        try {
            const URI = '/notifications/read';
            const res = await http.patch(
                URI,
                {},
                {
                    params: {
                        id: id,
                    },
                }
            );
            dispatch(notification_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(notification_fail());
            return Promise.reject(error);
        }
    };
};

const actions = {
    get_list_notifications,
    status_notification,
};

export default actions;
