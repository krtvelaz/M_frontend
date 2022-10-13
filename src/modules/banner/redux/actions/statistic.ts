import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { IIndicator } from '../../custom_types';

import {
    statistics_default,
    statistics_fail,
    statistics_success,
} from '../slice';

export const edit_statistics = (_values: IIndicator) => {
    return async (dispatch: any) => {
        dispatch(statistics_default());
        const values = JSON.parse(JSON.stringify(_values));
        delete values.est_created_at;
        delete values.est_updated_ad;
        delete values.key;
        const data = {
            ...values  
        };
        
        try {
            const URI = '/statistics';
            const res = await cms_http.patch(URI, data);            
            dispatch(statistics_success(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">Actualización exitosa</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error) {
            dispatch(statistics_fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};


export const edit_order_statistics = (values: any[]) => {
    return async (dispatch: any) => {
        const data = {
            order: [...values]
        }
        try {
            const URI = '/statistics';
            const res = await cms_http.put(URI, data); 
            return res.data.data;
        } catch (error) {
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};

export const get_statistics = (filters?: {
    page?: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
}) => {
    return async (dispatch: any) => {
        dispatch(statistics_default());
        try {
            const URI = '/statistics/list';
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });
            dispatch(statistics_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(statistics_fail());
            return Promise.reject('Error');
        }
    };
};
