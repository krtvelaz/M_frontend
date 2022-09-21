import { cms_http, http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
import {IPostulation} from '../../postulation/custom_types'
import {
 
    fail_typeDocuments,
    loading_typeDocuments,
    postulations_default,
    postulations_fail,
    postulations_success,
    success_typeDocuments,
    loading_typeNumberContact,
    fail_typeNumberContact,
    success_typeNumberContact,
    loading_profiles,
    fail_profiles,
    success_profiles
   
} from './slice';


const create_main_postulation = (values: IPostulation) => {
    return async (dispatch: any) => {
        dispatch(postulations_default());

        const img = values.car_imagen;
        const data = {
            action: 'insert',
            info: {
                id: -1,
                key: -1
            },
            data: {
                ...values,
                car_codigo_usuario: '123456',
                car_nombre_imagen: values.car_imagen?.name || '',
                car_ruta_imagen: '',
                car_nombre_imagen_codificado: ''
            }
        };
        delete data.data.car_imagen;

        let form = new FormData();
        form.append('data', JSON.stringify(data));
        form.append('file', img);

        try {
            const URI = 'postulations/';
            const res = await http.post(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(postulations_success(res.data.body.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return res.data.body.data;
        } catch (error: any) {
            dispatch(postulations_fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
                    '<div class="mytext">Edite o elimine algún elemento existente para ingresar este nuevo registro.</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return Promise.reject('Error');
        }
    };
};
const get__document = () => {
    
        return async (dispatch: any) => {
            dispatch(loading_typeDocuments)
            try {
                const URI = `lists/types_documents`;
    
                const res: any = await http.get(URI)
    dispatch(success_typeDocuments(res.data.data))
                return res.data;
            } catch (error) {
                dispatch(fail_typeDocuments)
                return Promise.reject('Error');
            }
        };
    
};
const get__typeNumberContact = () => {
    
    return async (dispatch: any) => {
        dispatch(loading_typeNumberContact)
        try {
            const URI = `lists/types_number_contact`;

            const res: any = await http.get(URI)
dispatch(success_typeNumberContact(res.data.data))
            return res.data;
        } catch (error) {
            dispatch(fail_typeNumberContact)
            return Promise.reject('Error');
        }
    };

};
const get__profiles = () => {
    
    return async (dispatch: any) => {
        dispatch(loading_profiles)
        try {
            const URI = `lists/profiles`;

            const res: any = await http.get(URI)
dispatch(success_profiles(res.data.data))
            return res.data;
        } catch (error) {
            dispatch(fail_profiles)
            return Promise.reject('Error');
        }
    };

};
const actions = {
    create_main_postulation,
    get__document,
    get__typeNumberContact,
    get__profiles
};
export default actions;