import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { IGeneralInfo } from '../../custom_types';
import {
    default_list_publication,
    default_publication,
    fail_list_publication,
    fail_publication,
    success_list_publication,
    success_publication,
} from '../slice';

export const create_publication = (values: IGeneralInfo) => {
    //
    return async (dispatch: any) => {
        dispatch(default_publication());
        const img = values.pub_imagen;
        const data = {
            ...values,
        };
        delete data.pub_imagen;
        let form = new FormData();
        form.append('data', JSON.stringify(data));
        form.append('image', img);
        try {
            const URI = '/publications';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_publication(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error) {
            dispatch(fail_publication());
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
export const get_list_publications = (filters?: {
    page?: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
    type?: string
    from?: string;
    is_published?: boolean;
}) => {
    return async (dispatch: any) => {
        dispatch(default_list_publication());
        try {
            const URI = `/publications/list/`;
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });
            const publication = {
                results: res.data.data,
                pagination: res.data.meta,
            };

            dispatch(success_list_publication(publication));
            return res.data.data;
        } catch (error) {
            dispatch(fail_list_publication());
            return Promise.reject('Error');
        }
    };
};
export const get_publication_by_id = (id: number, from?: 'landing') => {
    return async (dispatch: any) => {
        dispatch(default_publication());
        try {
            const URI = `/publications`;
            const res = await cms_http.get(URI, {
                params: {
                    id,
                    ...(from && {
                        from,
                    }),
                },
            });
            dispatch(success_publication(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_publication());
            return Promise.reject('Error');
        }
    };
};
export const edit_publication = (values: IGeneralInfo) => {
    return async (dispatch: any) => {
        dispatch(default_publication());
        const data = JSON.parse(JSON.stringify(values));
        let form: any = new FormData();

        delete data.pub_status;
        delete data.pub_created_at;
        delete data.pub_updated_at;
        delete data.pub_gallery;
        delete data.pub_image;
        delete data.pub_attendance_quota;
        delete data.pub_attendance_limit;
        delete data.pub_place;
        delete data.pub_subtitle;
        form.append('id', JSON.stringify(data.id));
        delete data.id;

        if (!values?.pub_imagen?.id) {
            form.append('image', values?.pub_imagen);
        }
        delete data.pub_imagen;
        form.append('data', JSON.stringify(data));
        try {
            const URI = '/publications';
            const res = await cms_http.patch(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            dispatch(success_publication(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_publication());
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

export const delete_publication = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = `publications/`;
            const res = await cms_http.delete(URI, {
                params: {
                    id,
                },
            });
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            // dispatch();
            return res.data;
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

export const get_history_publications = (filters?: any) => {
    return async (dispatch: any) => {
        dispatch(default_list_publication());
        try {
            const URI = 'news/history';
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });

            const finalResults = {
                results: res.data.data,
                pagination: res.data.meta,
            };

            dispatch(success_list_publication(finalResults));
            return res.data.data.data;
        } catch (error) {
            dispatch(fail_list_publication());
            return Promise.reject(error);
        }
    };
};

export const edit_published_publication = (
    id: number,
    status?: 'publish' | 'unpublish'
) => {
    return async (dispatch: any) => {
        dispatch(default_publication());
        let form: any = new FormData();
        form.append('id', id);
        form.append('status', status);
        try {
            const URI = '/publications/change-status';
            const res = await cms_http.patch(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_publication(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error) {
            dispatch(fail_publication());
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
