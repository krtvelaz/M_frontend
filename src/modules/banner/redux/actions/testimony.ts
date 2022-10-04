import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { ITestimony } from '../../custom_types';
import {
    testimonials_list_default,
    testimonials_list_fail,
    testimonials_list_success,
    testimony_default,
    testimony_fail,
    testimony_success,
} from '../slice';

export const create_testimony = (values: ITestimony) => {
    return async (dispatch: any) => {
        dispatch(testimony_default());
        const img = values.tes_background_image;
        const logo = values.tes_background_logo;
        const data = {
            ...values,
        };

        delete data.tes_background_image;
        delete data.tes_background_logo;

        let form = new FormData();
        form.append('data', JSON.stringify(data));
        if (img) form.append('img', img);
        if (logo) form.append('logo', logo);

        try {
            const URI = '/testimonials';
            const res = await cms_http.post(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(testimony_success(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">Registro de testimonio creado correctamente</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return res.data.data;
        } catch (error: any) {
            dispatch(testimony_fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};

export const get_list_testimonials = (filters?: {
    page: number;
    page_size: number;
    order_by_key?: string;
    order_by_value?: string;
    from?: string;
}) => {
    return async (dispatch: any) => {
        dispatch(testimonials_list_default());
        try {
            const URI = `testimonials/list`;
            const res = await cms_http.get(URI, {
                params: {
                    ...filters,
                },
            });
            dispatch(testimonials_list_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(testimonials_list_fail());
            return Promise.reject('Error');
        }
    };
};

export const get_testimonial = (id: number) => {
    return async (dispatch: any) => {
        dispatch(testimony_default());
        try {
            const URI = `/testimonials/`;
            const res = await cms_http.get(URI, {
                params: {
                    id,
                },
            });
            dispatch(testimony_success(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(testimony_fail());
            return Promise.reject('Error');
        }
    };
};

export const edit_testimonial = (values: ITestimony, type?: boolean) => {
    return async (dispatch: any) => {
        dispatch(testimony_default());
        const data = {
            ...values,
        };
        let form: any = new FormData();
        form.append('id', JSON.stringify(data.id));
        if (!type) {
            if (!data.tes_background_image.id) {
                const img = values.tes_background_image;
                form.append('img', img);
            } 
            if (!data.tes_background_logo.id) {
                const logo = values.tes_background_logo;
                form.append('logo', logo);
            } 
        }

        delete data.tes_created_at;
        delete data.tes_updated_at;
        delete data.tes_image_buffer;
        delete data.tes_image;
        delete data.tes_image_name;
        delete data.tes_background_image;
        delete data.tes_logo;
        delete data.tes_logo_name;
        delete data.tes_background_logo;
        delete data.id;

        form.append('data', JSON.stringify(data));

        try {
            const URI = '/testimonials';
            const res = await cms_http.patch(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(testimony_success(res.data.data));
            // await swal_success.fire({
            //     title: 'Proceso exitoso',
            //     html:
            //         `<div class="mysubtitle">Actualización completada con exito.</div>` +
            //         '<div class="mytext">De click en aceptar para continuar</div>',
            //     showCancelButton: false,
            //     confirmButtonText: 'Aceptar',
            // });
            return res.data.data;
        } catch (error) {
            dispatch(testimony_fail);
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

export const delete_testimonial = (id: number) => {
    return async (dispatch: any) => {
        try {
            const URI = `/testimonials`;
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
            return res.data.data;
        } catch (error) {
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">error</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return Promise.reject('Error');
        }
    };
};

export const get_document_testimonial = (
    id: number,
    type: 'image' | 'logo'
) => {
    return async (dispatch: any) => {
        try {
            const URI = `/testimonials/download-file/${id}`;
            const res: any = await cms_http.get(URI, {
                params: { type },
                responseType: 'arraybuffer',
            });
            return res.data;
        } catch (error) {
            return Promise.reject('Error');
        }
    };
};
