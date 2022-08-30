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
        // const values = JSON.parse(JSON.stringify(_values));
        const img = values.hec_imagen;

        const data = {
            action: 'insert',
            info: {
                id: -1,
                key: -1,
            },
            data: {
                ...values,
                hec_id_tipo_publicacion: Number(values.hec_id_tipo_publicacion),
                hec_ruta_imagen_principal: '',

                hec_nombre_imagen_principal: values.hec_imagen.name || '',
                hec_nombre_codificado_imagen_principal: '',
            },
        };

        delete data.data.hec_imagen;
        delete data.data.hec_nombre_imagen;
        delete data.data.id;
        let form = new FormData();
        form.append('data', JSON.stringify(data));
        form.append('img', img);
        try {
            const URI = 'news/add';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_publication(res.data.body.data));
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
export const get_list_publications = ({ page = 1, limi = 10 }) => {
    return async (dispatch: any) => {
        dispatch(default_list_publication());
        try {
            const URI = `news/list/${page}/${limi}`;
            const res = await cms_http.get(URI);
            const publication = {
                results: res.data.body.data,
                pagination: res.data.body.meta,
            };
            dispatch(success_list_publication(publication));
            return res.data.body.data;
        } catch (error) {
            dispatch(fail_list_publication());
            return Promise.reject('Error');
        }
    };
};
export const get_publication_by_id = (id: number) => {
    return async (dispatch: any) => {
        dispatch(default_publication());
        try {
            const URI = `news/find/${id}`;
            const res = await cms_http.get(URI);
            dispatch(success_publication(res.data.body.data[0]));
            return res.data.body.data[0];
        } catch (error) {
            dispatch(fail_publication());
            return Promise.reject('Error');
        }
    };
};
export const edit_publication = (values: IGeneralInfo) => {
    //
    return async (dispatch: any) => {
        dispatch(default_publication());

        const data = {
            action: 'update',
            info: {
                id: values.id,
                key: values.id,
            },
            data: {
                ...values,
                // hec_id_tipo_publicacion: Number(values.hec_id_tipo_publicacion),
                // hec_ruta_imagen_principal: "",

                hec_nombre_imagen_principal: values.hec_imagen.name || '',
            },
        };
        delete data.data.id;
        delete data.data.hec_creado;
        delete data.data.hec_estado;
        delete data.data.hec_nombre_imagen;
        delete data.data.hec_publicada;
        delete data.data.hec_imagen;
        let form: any = new FormData();
        delete data.data.id;
        form.append('data', JSON.stringify(data));
        if (!values.hec_imagen.id) {
            const img = values.hec_nombre_imagen;
            form.append('img', img);
        } else {
            form.append('img', null);
        }
        try {
            const URI = 'news/add';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            // dispatch();
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
        dispatch(default_publication());

        try {
            const URI = `news/delete/${id}`;
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

export const get_history_publications = (
    form?: number,
    page_number=1,
) => {
    return async (dispatch: any) => {
        // dispatch(default_list_publication());
        try {
            const URI = 'news/history';
            const res = await cms_http.get(URI, {
                params: {
                    ...(form && {
                        form
                    }),
                    page_number,
                },
            });
            // dispatch(success_list_publication(res.data));
            return res.data.data;
        } catch (error) {
            // dispatch(fail_list_publication());
            return Promise.reject(error);
        }
    };
};

export const edit_published_publication = (
    _values: IGeneralInfo,
    is_public?: any
) => {
    return async (dispatch: any) => {
        dispatch(default_publication());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            action: 'update',
            info: {
                id: values.id,
            },
            data: {
                // eve_numero_cupos: Number(values.eve_numero_cupos) || null,
                hec_publicada: is_public || false,
            },
        };

        try {
            const URI = 'news/add';
            const res = await cms_http.post(URI, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            // dispatch();
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
