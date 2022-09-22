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
        form.append('img', img);
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
export const get_list_publications = ({ page = 1, limi = 10 }) => {
    return async (dispatch: any) => {
        dispatch(default_list_publication());
        try {
            const URI = `/publications/list/`;
            const res = await cms_http.get(URI,{
                params:{
                    page,
                    limit: limi
                }
            });
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
            const URI = `/news/details`;
            const res = await cms_http.get(URI,{
                params: {
                    id
                }
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
    //
    return async (dispatch: any) => {
        dispatch(default_publication());
        console.log(values);
        
        const data = {
            action: 'update',
            info: {
                id: values.id,
                key: values.id,
            },
            data: {
                ...values,
                
            },
        };
       
        let form: any = new FormData();
        delete data.data.id;
        form.append('data', JSON.stringify(data));
        // if (!values.hec_imagen.id) {
        //     const img = values.hec_imagen;
        //     form.append('img', img);
        // } else {
        //     form.append('img', null);
        // }
        try {
            const URI = '/news';
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
    filters?: any
) => {
    return async (dispatch: any) => {
        dispatch(default_list_publication());
        try {
            const URI = 'news/history';
            const res = await cms_http.get(URI, {
                params: {
                    ...filters
                },
            });
            
            const finalResults = {
                results: res.data.data, 
                pagination: res.data.meta
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
                // eve_numero_cupos: Number(values.eve_numero_cupos) || 10,
                hec_publicada: is_public || false,
            },
        };

        let form: any = new FormData();
        form.append('data', JSON.stringify(data));

        try {
            const URI = '/news';
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
