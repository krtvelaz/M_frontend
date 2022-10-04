import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { IGalleryInfo } from '../../custom_types';
import {
    default_gallery,
    default_list_gallery,
    fail_gallery,
    fail_list_gallery,
    success_gallery,
    success_list_gallery,
} from '../slice';

export const create_gallery = (
    id_publication: number,
    values: IGalleryInfo
) => {
    //
    return async (dispatch: any) => {
        dispatch(default_gallery());
        let form = new FormData();
        form.append('title', values.pubfil_title);
        form.append('description', values.pubfil_description);
        form.append('image', values.pubfil_image);
        form.append('publication_id', `${id_publication}`);
        try {
            const URI = '/publications/gallery';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_gallery(res.data.data));
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
            dispatch(fail_gallery());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error.response?.data?.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};
export const edit_gallery = ( values: IGalleryInfo) => {
    return async (dispatch: any) => {
        dispatch(default_gallery());

        let form = new FormData();
        form.append('title', values.pubfil_title);
        form.append('description', values.pubfil_description);

        form.append('id', `${values?.id}`);

        if (!values.pubfil_image?.id) {
            form.append('image', values.pubfil_image);
        }

        try {
            const URI = '/publications/gallery';
            const res = await cms_http.patch(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_gallery(res.data.data));
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
            dispatch(fail_gallery());
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

export const get_image_gallery = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = '/publications/gallery';
            const res = await cms_http.get(URI, {
                params: {
                    id,
                },
                responseType: 'arraybuffer',
            });
            return res.data;
        } catch (error) {
            return Promise.reject(error);
        }
    };
};

export const get_list_gallery = (filters?: {
    publication_id: number;
    page?: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: string;
    from?: string;
}) => {
    return async (dispatch: any) => {
        dispatch(default_list_gallery());

        try {
            const URI = '/publications/gallery/list';
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });
            dispatch(success_list_gallery(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_list_gallery());
            return Promise.reject('Error');
        }
    };
};

export const delete_gallery = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = `/publications/gallery`;
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
