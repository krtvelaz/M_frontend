import { cms_http } from "../../../config/axios_instances";
import { swal_error, swal_success } from "../../../utils/ui/swalAlert";
import { IContact } from "../custom_type";


const send_email = (values: IContact) =>{
    return async (dispatch: any) => {
        // dispatch(default());
        try {
            const URI = 'contact-us';
            const res = await cms_http.post(URI, values,);
            // dispatch(success(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return res.data.data;
        } catch (error: any) {
            // dispatch(fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` ,
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return Promise.reject('Error');
        }
    };
};

const create_bulletin = (values: any) => {
    return async (dispatch: any) => {
        try {
            const URI = '/subscriptions/newsletter';
            const res = await cms_http.post(URI, { 
                sub_email: values.email,
                sub_cellphone_number: values.number
            });
            // await swal_success.fire({
            //     title: 'Proceso exitoso',
            //     html:
            //         `<div class="mysubtitle">${res.data.message}</div>` +
            //         '<div class="mytext">De click en aceptar para continuar</div>',
            //     showCancelButton: false,
            //     confirmButtonText: 'Aceptar'
            // });
            return res.data;
        } catch (error: any) {
            // await swal_error.fire({
            //     title: 'Error en el proceso',
            //     html:
            //         `<div class="mysubtitle">${error?.response?.data?.message}</div>` ,
            //     showCancelButton: false,
            //     confirmButtonText: 'Aceptar'
            // });
            return Promise.reject(error);
        }
    };

}

const actions = {
   send_email,
   create_bulletin,
};
export default actions;
