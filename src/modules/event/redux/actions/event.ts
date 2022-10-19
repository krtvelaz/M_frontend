import { cms_http } from '../../../../config/axios_instances';
import { swal_error } from '../../../../utils/ui';
import { swal_success } from '../../../../utils/ui/swalAlert';

import {
    default_event,
    default_events,
    default_list_event,
    fail_event,
    fail_events,
    fail_list_event,
    success_event,
    success_events,
    success_list_event,
} from '../slice';
import { IEvent } from '../../custom_types';
import moment from 'moment';

interface filter {
    page: number;
    page_size?: number;
    order_by_key?:  string;
    order_by_value?: string;
    is_published?: boolean;
}

export const create_event = (_values: IEvent) => {
    return async (dispatch: any) => {
        dispatch(default_event());

        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            ...values,
            eve_hour: moment(values.eve_hour, 'h:mm:ss A').format('HH:mm:ss'),
            eve_limit_entry: Number(values.eve_limit_entry) || 0,
        };
        let form = new FormData();
        form.append('data', data);
        form.append('action ', 'insert');
        try {
            const URI = '/events';
            const res = await cms_http.post(URI, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_event(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data;
        } catch (error) {
            dispatch(fail_event());
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

export const delete_event = (id: number) => {
    return async (dispatch: any) => {
        // dispatch(default_event());
        try {
            const URI = `/events`;
            const res = await cms_http.delete(URI,{
                params: {
                    id
                }
            });
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            // dispatch(res.data.body.data);
            return res.data;
        } catch (error) {
            // dispatch(fail_event());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject(Error);
        }
    };
};

export const get_list_events = (filter?: filter) => {
    return async (dispatch: any) => {
        dispatch(default_list_event());
        try {
            const URI = `/events/list`;
            const res = await cms_http.get(URI, {
                params: {
                    ...filter,
                },
            });

            const events = {
                results: res.data.data,
                pagination: res.data.meta,
            };
            
            dispatch(success_list_event(events));
            return res.data.data;
        } catch (error) {
            dispatch(fail_list_event());
            return Promise.reject('Error');
        }
    };
};

export const get_event_history = () => {
    return async (dispatch: any) => {
        dispatch(default_events());
        try {
            const URI = 'event/history';
            const res = await cms_http.get(URI);

            dispatch(success_events(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_events());
            return Promise.reject('Error');
        }
    };
};

export const get_event_by_id = (id: number) => {
    return async (dispatch: any) => {
        dispatch(default_event);
        try {
            const URI = `/events`;
            const res = await cms_http.get(URI, {
                params: {
                    id,
                },
            });
            dispatch(success_event(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_event());
            return Promise.reject('Error');
        }
    };
};

export const edit_event = (_values: IEvent) => {
    return async (dispatch: any) => {
        dispatch(default_event());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            ...values,
            eve_hour: moment(values.eve_hour, 'h:mm:ss A').format('HH:mm:ss'),
            eve_limit_entry: values?.eve_limit_entry || 0
        };
        if(!data.eve_with_limit_entry) delete data.eve_limit_entry
        delete data.id;
        delete data.eve_created_at;
        delete data.eve_created_at;
        delete data.eve_updated_at;
        delete data.eve_attendance_limit;
        delete data.eve_attendance_quota;
        delete data.eve_type;
        delete data.eve_status;

        try {
            const URI = '/events';
            const res = await cms_http.patch(URI, data, {
                params: {
                    id: _values?.id,
                },
            });
            dispatch(success_event(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            dispatch(success_event(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_event());
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

export const edit_publication_event = (
    id: number,
    is_public?: 'publish' | 'unpublish'
) => {
    return async (dispatch: any) => {
        dispatch(default_event());
        let form = new FormData();
        form.append('id', `${id}`);
        if (is_public) form.append('status', is_public);
        try {
            const URI = '/events/change-status';
            const res = await cms_http.patch(URI, form);
            dispatch(success_event(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            dispatch(success_event(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_event());
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
