import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { IMainBanner } from '../../custom_types';
import {
    banners_list_default,
    banners_list_fail,
    banners_list_success,
    banner_default,
    banner_fail,
    banner_success,
} from '../slice';

export const create_main_banner = (values: IMainBanner) => {
    return async (dispatch: any) => {
        dispatch(banner_default());
        const img = values.ban_image;
        delete values.ban_image;
        let form = new FormData();
        form.append('data', JSON.stringify(values));
        form.append('file', img);

        try {
            const URI = '/banner/';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(banner_success(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error: any) {
            dispatch(banner_fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
                    '<div class="mytext">Edite o elimine algún elemento existente para ingresar este nuevo registro.</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};

export const edit_banner = (values: IMainBanner, type?: boolean) => {
    return async (dispatch: any) => {
        dispatch(banner_default());
        const data = {
            ...values,
        };
        
        let form: any = new FormData();
        if(!type) {
            if (!data.ban_image.id) {
                const img = data.ban_image;
                form.append('file', img);
            }
        }
        form.append('id', JSON.stringify(data.id));
        delete data.ban_image;
        // delete data.id;
        delete data.ban_updated_at;
        delete data.ban_create_at;
        delete data.cha_image_name;
        delete data.ban_background_image;
        delete data.cha_background_image_buffer;
        form.append('data', JSON.stringify(data));
        try {
            const URI = '/banner';
            const res = await cms_http.patch(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
            dispatch(banner_success(res.data.data));
            if (!type) {
                await swal_success.fire({
                    title: 'Proceso exitoso',
                    html:
                        `<div class="mysubtitle">${res.data.message}</div>` +
                        '<div class="mytext">De click en aceptar para continuar</div>',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                });
            }

            return res.data.data;
        } catch (error) {
            dispatch(banner_fail);
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

export const get_list_banners = (filters?: {
    page: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
    from?: string;
}) => {
    return async (dispatch: any) => {
        dispatch(banners_list_default());
        try {
            const URI = 'banner/list';
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });
            dispatch(banners_list_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(banners_list_fail());
            return Promise.reject(error);
        }
    };
};

export const get_banner_by_id = (id: number) => {
    return async (dispatch: any) => {
        dispatch(banner_default());
        try {
            const URI = `/banner`;
            const res = await cms_http.get(URI, {
                params: {
                    id,
                },
            });
            dispatch(banner_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(banner_fail());
            return Promise.reject('Error');
        }
    };
};

export const get_image_banner = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = `/banner/download-file/${id}`;

            const res: any = await cms_http.get(URI, {
                responseType: 'arraybuffer',
            });

            return res.data;
        } catch (error) {
            return Promise.reject('Error');
        }
    };
};

export const delete_banner = (id: number) => {
    return async (dispatch: any) => {
        dispatch(banner_default());
        try {
            const URI = '/banner';
            const res = await cms_http.delete(URI, {
                params: { id },
            });
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            dispatch(banner_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(banner_fail);
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
