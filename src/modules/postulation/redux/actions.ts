import { cms_http, http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
import { IPostulation } from '../../postulation/custom_types';
import {
    fail_typeDocuments,
    loading_typeDocuments,
    postulations_default,
    postulations_fail,
    postulations_success,
    members_default,
    members_success,
    members_fail,
    success_typeDocuments,
    loading_typeNumberContact,
    fail_typeNumberContact,
    success_typeNumberContact,
    loading_profiles,
    fail_profiles,
    success_profiles,
    listSex_default,
    listSex_success,
    listSex_fail,
    addDoc_default,
    addDoc_success,
    addDoc_fail,
    loading_typeDocumentsMembers,
    success_typeDocumentsMembers,
    fail_typeDocumentsMembers,
    loading_challenge,
    get_challenge,
    fail_challenge,
    sexualOrientation_default,
    sexualOrientation_success,
    sexualOrientation_fail
} from './slice';

const create_main_postulation = (values: any) => {
    return async (dispatch: any) => {
        dispatch(postulations_default());
        try {
            const URI = 'postulations/';
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch(postulations_success(res.data.data));
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
            dispatch(postulations_fail());
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
const create_memberPostulation = (values: any) => {
    return async (dispatch: any) => {
        dispatch(members_default());
        try {
            const URI = `postulations/member/1`;
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(members_success(res.data.data));
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
            dispatch(members_fail());
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
const get__document = () => {
    return async (dispatch: any) => {
        dispatch(loading_typeDocuments);
        try {
            const URI = `lists/types_documents`;

            const res: any = await http.get(URI);
            dispatch(success_typeDocuments(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_typeDocuments);
            return Promise.reject('Error');
        }
    };
};
const get__documentMembers = () => {
    return async (dispatch: any) => {
        dispatch(loading_typeDocumentsMembers);
        try {
            const URI = `lists/types_documents_members`;

            const res: any = await http.get(URI);
            dispatch(success_typeDocumentsMembers(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_typeDocumentsMembers);
            return Promise.reject('Error');
        }
    };
};
const get__typeNumberContact = () => {
    return async (dispatch: any) => {
        dispatch(loading_typeNumberContact);
        try {
            const URI = `lists/types_number_contact`;

            const res: any = await http.get(URI);
            dispatch(success_typeNumberContact(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_typeNumberContact);
            return Promise.reject('Error');
        }
    };
};
const get__listSexs = () => {
    return async (dispatch: any) => {
        dispatch(listSex_default);
        try {
            const URI = `lists/sex`;

            const res: any = await http.get(URI);
            dispatch(listSex_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(listSex_fail);
            return Promise.reject('Error');
        }
    };
};
const get__sexual_orientation = () => {
    return async (dispatch: any) => {
        dispatch(sexualOrientation_default);
        try {
            const URI = `lists/sexual_orientation`;

            const res: any = await http.get(URI);
            dispatch(sexualOrientation_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(sexualOrientation_fail);
            return Promise.reject('Error');
        }
    };
};
const get__profiles = () => {
    return async (dispatch: any) => {
        dispatch(loading_profiles);
        try {
            const URI = `lists/profiles`;

            const res: any = await http.get(URI);
            dispatch(success_profiles(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(fail_profiles);
            return Promise.reject('Error');
        }
    };
};
const addDocumentPostulation = (values: any) => {
    return async (dispatch: any) => {
        dispatch(addDoc_default());
        try {
            const URI = `postulations/document`;
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(addDoc_success(res.data.data));
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
            dispatch(addDoc_fail());
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
const get_detail_challenge = (id: number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `/postulations/documents/37/3`;
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

const actions = {
    create_main_postulation,
    get__document,
    get__typeNumberContact,
    get__profiles,
    create_memberPostulation,
    get__listSexs,
    addDocumentPostulation,
    get__documentMembers,
    get_detail_challenge,
    get__sexual_orientation
};
export default actions;
