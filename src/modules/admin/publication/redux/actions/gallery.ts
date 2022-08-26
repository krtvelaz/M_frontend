import { cms_http } from '../../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../../utils/ui/swalAlert';
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
        const img = values.gal_imagen;
        const data = {
            action: 'insert',
            info: {
                id: -1,
                key: id_publication,
            },
            data: {
                ...values,
                gal_id_hechos_noticias: id_publication,
                gal_nombre_imagen: values.gal_imagen?.name || '',
                gal_nombre_codificado_imagen: '',
                gal_ruta_imagen: '',
            },
        };
        delete data.data.gal_imagen;

        let form = new FormData();
        form.append('data', JSON.stringify(data));
        form.append('img', img);
        try {
            const URI = 'news/imgGallery';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_gallery(res.data.body.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.body.data;
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
export const edit_gallery = (key: number, values: IGalleryInfo) => {
   
    return async (dispatch: any) => {
        dispatch(default_gallery());
        const img = values.gal_imagen;
        const data = {
            action: 'update',
            info: {
                id: values.id,
                key,
            },
            data: {
                ...values,
                gal_nombre_imagen: values.gal_imagen?.name || '',
            },
        };
        console.log(data);
        

        delete data.data.id;
        
        delete data.data.key;
        delete data.data.gal_estado;
        delete data.data.gal_imagen;
        delete data.data.gal_id_hechos_noticias;

        let form: any = new FormData();

        
        
        if (!values.gal_imagen?.id) {
            const img = values.gal_nombre_imagen.id;
            form.append('img', img);
        } else {
            form.append('img', null);
        }
        delete data.data.gal_creado;
        form.append('data', JSON.stringify(data));
        form.append('img', img);
        try {
            const URI = 'news/imgGallery';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_gallery(res.data.body.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.body.data;
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

export const get_gallery_by_id = (id: number) => {
    return async (dispatch: any) => {
        // dispatch(default_gallery());
        try {
            const URI = 'news/gallery/img';
            const res = await cms_http.post(
                URI,
                {
                    id,
                },
                { responseType: 'arraybuffer' }
            );
            // dispatch(success_gallery(res.data));
            return res.data;
        } catch (error) {
            // dispatch(fail_gallery());
            return Promise.reject(error);
        }
    };
};
export const get_list_gallery = (key: number) => {
    return async (dispatch: any) => {
        dispatch(default_list_gallery());

        try {
            const URI = 'news/gallery/list';
            const res = await cms_http.post(URI, {
                key,
            });
            dispatch(success_list_gallery(res.data.body));
            return res.data.body;
        } catch (error) {
            dispatch(fail_list_gallery());
            return Promise.reject('Error');
        }
    };
};

export const delete_gallery = (id: number) => {
    return async (dispatch: any) => {
        dispatch(default_gallery());

        try {
            const URI = `news/gallery/delete/${id}`;
            const res = await cms_http.delete(URI);
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
