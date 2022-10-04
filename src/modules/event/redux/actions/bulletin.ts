import { cms_http } from '../../../../config/axios_instances';
import {
    default_list_bulletin,
    fail_list_bulletin,
    success_list_bulletin,
} from '../slice';

export const get_list_bulletin = (filter?: any) => {
    return async (dispatch: any) => {
        dispatch(default_list_bulletin());
        try {
            const URI = `/subscriptions/list`;
            const res = await cms_http.get(URI, {
                params: {
                    ...filter,
                },
            });

            const newsletters = {
                results: res.data.data,
                pagination: res.data.meta,
            };

            dispatch(success_list_bulletin(newsletters));
            return res.data.data;
        } catch (error) {
            dispatch(fail_list_bulletin());
            return Promise.reject('Error');
        }
    };
};

export const export_data = (data: { from: any; to: any }) => {
    return async (dispatch: any) => {
        try {
            const URI = `/subscriptions/export-excel`;
            const res = await cms_http.post(URI, data, {
                responseType: 'blob',
            });
            const archivo = new Blob([res.data]);
            const url = window.URL.createObjectURL(archivo);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'Inscripciones a boletines.xlsx');
            document.body.appendChild(link);
            link.click();
            return res.data;
        } catch (error) {
            return Promise.reject('Error');
        }
    };
};
