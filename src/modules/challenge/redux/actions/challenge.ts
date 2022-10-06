import { http } from '../../../../config/axios_instances';
import { swal_success } from '../../../../utils/ui/swalAlert';
import { IGeneralInformation } from '../../custom_types';
import {
    fail_challenge,
    get_challenge,
    loading_challenge,
    loading_challenges,
    success_challenges,
    fail_challenges,
} from '../slice';


interface filters {
    page: number;
    page_size?: number;
    order_by_key?: string;
    order_by_value?: 'asc' | 'desc';
    is_published?: boolean;
    from?: 'landing';
    is_opened?: boolean;
    is_closed?: boolean;
    dimension?: string;
}

/*----------------Reto---------------------*/

export const create_challenge = (values: IGeneralInformation) => {
    const img = values.cha_imagen_principal;
    const data: IGeneralInformation = {
        ...values,
        cha_id_user: 1,
        cha_principal_image_path: '',
        cha_amount: values.cha_amount || 0,
        cha_name_image: values.cha_imagen_principal?.name || '',
    };
    delete data.cha_imagen_principal;
    delete data.cha_profiles;
    delete data.cha_id_commune;
    let form = new FormData();
    form.append('data', JSON.stringify(data));
    if (values.cha_profiles)
        form.append('profile', values.cha_profiles.toString());
    if (img) form.append('file', img);

    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = '/challenges';
            const res: any = await http.post(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(get_challenge(res.data.data));

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
            dispatch(fail_challenge());
            return Promise.reject('Error');
        }
    };
};

export const update_challenge = (values: IGeneralInformation) => {
    const data: IGeneralInformation = {
        ...values,
        cha_id_user: 1,
        cha_amount: values.cha_amount || 0,
        cha_name_image: values.cha_imagen_principal?.name || '',
    };
    delete data.cha_imagen_principal;
    delete data.cha_profiles;
    delete data.cha_id_commune;
    delete data.cha_commune;
    delete data.cha_created_at;
    delete data.cha_created_at;
    delete data.cha_updated_at;
    delete data.cha_status;
    delete data.cha_documents;
    delete data.cha_informs;
    delete data.cha_total_days;
    delete data.status;
    delete data.cha_dependency;
    delete data.cha_dimension;
    delete data.cha_neighborhood;
    delete data.informs;
    delete data.key;
    delete data.id;
    let form = new FormData();
    form.append('id', JSON.stringify(values.id));
    form.append('data', JSON.stringify(data));
    if (values.cha_profiles)
        form.append('profile', values.cha_profiles.toString());
    if (!values.cha_imagen_principal.id) {
        form.append('file', values.cha_imagen_principal);
    }

    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = '/challenges';
            const res: any = await http.patch(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PATCH',
                },
            });
            dispatch(get_challenge(res.data));
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
            dispatch(fail_challenge());
            return Promise.reject('Error');
        }
    };
};

export const get_detail_challenge = (id: number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `/challenges`;
            const res = await http.get(URI, {
                params: {
                    id,
                },
            });
            dispatch(get_challenge(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_challenge());
            return Promise.reject('Error');
        }
    };
};



export const get_image_principal = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = `challenges/download-image`;
            const res = await http.get(URI, {
                responseType: 'arraybuffer',
                params: {
                    id,
                },
            });
            return res.data;
        } catch (error) {
            return Promise.reject(error);
        }
    };
};

export const get_list_challenges = (filters?: filters) => {
    return async (dispatch: any) => {
        dispatch(loading_challenges());
        try {
            const URI = '/challenges/list';
            const res = await http.get(URI, {
                params: {
                   ...filters
                },
            });
            
            const challenges = {
                results: res.data.data,
                pagination: res.data.meta,
            };

            dispatch(success_challenges(challenges));
            return res.data.data;
        } catch (error) {
            dispatch(fail_challenges());
            return Promise.reject(error);
        }
    };
};

export const publish_challenge = (id: number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `challenges/publish`;
            const res = await http.post(URI, { id });
            dispatch(get_challenge(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">Reto publicado</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error) {
            dispatch(fail_challenge());
            return Promise.reject(error);
        }
    };
};

export const unpublish_challenge = (id: number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `challenges/unpublish`;
            const res = await http.post(URI, { id });
            dispatch(get_challenge(res.data.data));
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
            dispatch(fail_challenge());
            return Promise.reject(error);
        }
    };
};

export const delete_challenge = (id: number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `/challenges`;
            const res = await http.delete(URI, {
                params: {
                    id,
                },
            });
            dispatch(get_challenge(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_challenge());
            return Promise.reject(error);
        }
    };
};




