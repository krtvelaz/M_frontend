import {  http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
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
    sexualOrientation_fail,
    GeneratePostulations_default,
    GeneratePostulations_success,
    GeneratePostulations_fail,
    deleteDoc_default,
    deleteDoc_success,
    deleteDoc_fail,
    deleteDocPost_success,
    infoPostulations_default,
    infoPostulations_success,
    infoPostulations_fail,
    infoPostulationsdetail_default,
    infoPostulationsdetail_success,
    infoPostulationsdetail_fail,
    download_default_Documents,
    download_success_Documents,
    download_fail_Documents

} from './slice';
import { jsPDF } from 'jspdf';
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
const create_memberPostulation = (values: any[], id_postulation: number | string) => {
    return async (dispatch: any) => {
        dispatch(members_default());
        try {
            const URI = `postulations/member/${id_postulation}`;
            const res = await http.post(URI, {
                members : [...values]
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
const get__documentDownload = (posarc_id:number) => {
    return async (dispatch: any) => {
        dispatch(download_default_Documents);
        try {
            const URI = `postulations/download/`;

            const res: any = await http.get(URI,{
                params:{
                    id:posarc_id
                },
                headers: {
                     responseType: 'blob',
                },});
            dispatch(download_success_Documents(res.data.data));
            return res.data;
        } catch (error) {
            console.log("error",error)
            dispatch(download_fail_Documents);
            return Promise.reject('Error');
        }
    };
};
const get__postulationInfo = () => {
    return async (dispatch: any) => {
        dispatch(infoPostulations_default);
        try {
            const URI = `postulations`;

            const res: any = await http.get(URI);
            dispatch(infoPostulations_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(infoPostulations_fail);
            return Promise.reject('Error');
        }
    };
};
const get__postulationInfoDetail = (id_postulation: number | string) => {
    return async (dispatch: any) => {
        dispatch(infoPostulationsdetail_default);
        try {
            const URI = `postulations/detail_postulation/${id_postulation}`;
            const res: any = await http.get(URI);
            dispatch(infoPostulationsdetail_success(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(infoPostulationsdetail_fail);
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
const addDocumentPostulation = (file: any, data: any,i: number) => {
    return async (dispatch: any) => {
        dispatch(addDoc_default());

        let form: any = new FormData();
        form.append('file', file);
        form.append('data', JSON.stringify(data));
        try {
            const URI = `postulations/document`;
            const res = await http.post(URI, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
            dispatch(addDoc_success({...res.data.data, i}));
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
const get_documents_challenge = (id: number, type_person: string | number) => {
    return async (dispatch: any) => {
        dispatch(loading_challenge());
        try {
            const URI = `/postulations/documents/${id}/${type_person}`;
            const res = await http.get(URI);
            dispatch(get_challenge(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(fail_challenge());
            return Promise.reject('Error');
        }
    };
};

const generate_settled = (values: any, SaveForP: any) => {
    return async (dispatch: any) => {
        dispatch(GeneratePostulations_default());
        try {
            const URI = `postulations/generate_settled`;
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(GeneratePostulations_success(res.data.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    `<div class="mytext">${res.data.data.infoSettled.pos_settled}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>' +
                    `<div><button id="pdfDownald" class="btn btn-outline-primary">Descargar comprobante</button></div>`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                didOpen: () => {
                    const validatePdf = document.getElementById('pdfDownald');
                    const DownloadHTML = () => {
                        const stringHtml = HtmlStringPdf(SaveForP, res.data.data);
                        const doc = new jsPDF('p', 'pt', 'a4');
                        doc.html(stringHtml, {
                            callback: (pdf) => {
                                pdf.save('postulacion.pdf');
                            },
                        });
                    };
                    if (validatePdf) {
                        validatePdf.onclick = () => {
                            DownloadHTML();
                        };
                    }
                },
            });
            return res.data.data;
        } catch (error: any) {
            dispatch(GeneratePostulations_fail());
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



const HtmlStringPdf = (SaveForP: any, generatePost: any) => {
    return `<table  class="table_postulation">
    <tr>
        <td >Número del Radicado</td>
        <td>${generatePost?.infoSettled?.pos_settled}</td>
    </tr>
    <tr>
        <td >Convocatoria</td>
        <td >${SaveForP.pos_business_name}</td>
    </tr>
    <tr>
        <td >Tipo de documento</td>
        <td >${SaveForP.pos_type_document_id}</td>
    </tr>
    <tr>
        <td >Número de documento</td>
        <td >${SaveForP.pos_documentid}</td>
    </tr>
    <tr>
        <td >Tipo de perfil</td>
        <td >${SaveForP.pos_id_type_competitor}</td>
    </tr>
    <tr>
        <td >Fecha</td>
        <td>${SaveForP.pos_created_at}</td>
    </tr>
</table>`;
};

const deleteDocumentPostulation = (data: any) => {
    return async (dispatch: any) => {
        dispatch(deleteDoc_default());

        try {
            const URI = `postulations/document/${data.filename}/${data.id}`;
            const res = await http.delete(URI);
            dispatch(deleteDocPost_success(data.id));
            dispatch(deleteDoc_success(res.data.data));
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
            dispatch(deleteDoc_fail());
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
const actions = {
    create_main_postulation,
    get__document,
    get__typeNumberContact,
    get__profiles,
    create_memberPostulation,
    get__listSexs,
    addDocumentPostulation,
    get__documentMembers,
    get_documents_challenge,
    get__sexual_orientation,
    generate_settled,
    deleteDocumentPostulation,
    get__postulationInfo,
    get__postulationInfoDetail,
    get__documentDownload
};
export default actions;
