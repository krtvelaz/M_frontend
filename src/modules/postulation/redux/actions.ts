import { http } from '../../../config/axios_instances';
import { swal_error, swal_success } from '../../../utils/ui/swalAlert';
import {
    fail_typeDocuments,
    loading_typeDocuments,
    postulation_default,
    postulation_fail,
    postulation_success,
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
    infoPostulationsdetail_default,
    infoPostulationsdetail_success,
    infoPostulationsdetail_fail,
    download_default_Documents,
    download_success_Documents,
    download_fail_Documents,
    revisateInfoPostulations_default,
    revisateInfoPostulations_success,
    revisateInfoPostulations_fail,
    GeneratePostulationsReport_default,
    GeneratePostulationsReport_success,
    GeneratePostulationsReport_fail,


    postulations_list_default,
    postulations_list_success,
    postulations_list_fail,


} from './slice';
import { jsPDF } from 'jspdf';
import fileDownload from 'js-file-download';
import { successAlert } from '../../../utils/assets/img';
import moment from 'moment';

const create_main_postulation = (values: any) => {
    return async (dispatch: any) => {
        dispatch(postulation_default());
        try {
            const URI = 'postulations/';
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch(postulation_success(res.data.data));
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
            dispatch(postulation_fail());
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

const create_memberPostulation = (
    values: any[],
    id_postulation: number | string
) => {
    return async (dispatch: any) => {
        dispatch(members_default());
        try {
            const URI = `postulations/member/${id_postulation}`;
            const res = await http.post(URI, {
                members: [...values],
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

const get__documentDownload = (posarc_id: number) => {
    return async (dispatch: any) => {
        dispatch(download_default_Documents);
        try {
            const URI = `postulations/download/`;

            const res: any = await http.get(URI, {
                params: {
                    id: posarc_id,
                },
                headers: {
                    responseType: 'blob',
                },
            });
            dispatch(download_success_Documents(res.data.data));
            return res.data;
        } catch (error) {
            dispatch(download_fail_Documents);
            return Promise.reject('Error');
        }
    };
};

const get_list_postulation = (filters?: {
    page: number;
    page_size: number;
    cha_name?: string;
    cha_announcement?: number;
    pos_status?: string;
}) => {
    return async (dispatch: any) => {
        dispatch(postulations_list_default());
        try {
            const URI = `/postulations/list`;

            const res: any = await http.get(URI, {
                params: {
                    ...filters,
                },
            });
            const postulations = {
                results: res.data.data,
                pagination: res.data.meta
            }
            dispatch(postulations_list_success(postulations));
            return res.data.data;
        } catch (error) {
            dispatch(postulations_list_fail());
            return Promise.reject('Error');
        }
    };
};
const get__postulationInfoDetail = (id_postulation: number | string) => {
    return async (dispatch: any) => {
        dispatch(infoPostulationsdetail_default());
        try {
            const URI = `postulations/detail_postulation/${id_postulation}`;
            const res: any = await http.get(URI);
            dispatch(infoPostulationsdetail_success(res.data.data[0]));
            return res.data.data[0];
        } catch (error) {
            dispatch(infoPostulationsdetail_fail());
            return Promise.reject('Error');
        }
    };
};
const get__postulationReportDetail = (
    convocatoria: number | string,
    estadoPostulacion: number | string
) => {
    return async (dispatch: any) => {
        dispatch(GeneratePostulationsReport_default);
        try {
            const URI = `postulations/report/${convocatoria}/${estadoPostulacion}`;
            const res: any = await http.get(URI, {
                responseType: 'blob',
            });
            dispatch(GeneratePostulationsReport_success(res.data));
            if (res.data) {
                fileDownload(res.data, 'Reporte Postulaciones.xlsx');
            }

            return res.data;
        } catch (error) {
            dispatch(GeneratePostulationsReport_fail);
            return Promise.reject('Error');
        }
    };
};

const get__RevisatePostulationInfoDetail = (
    id_postulation: number | string,
    set_is_visible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return async (dispatch: any) => {
        dispatch(revisateInfoPostulations_default);
        try {
            const URI = `postulations/status_reviewed/${id_postulation}`;
            const res: any = await http.get(URI);
            dispatch(revisateInfoPostulations_success(res.data.data));
            await swal_success
                .fire({
                    title: 'Proceso exitoso',
                    html:
                        `<div class="mysubtitle">${res.data.message}</div>` +
                        '<div class="mytext">De click en aceptar para continuar</div>',
                    showCancelButton: true,
                    cancelButtonText: 'Seguir viendo',
                    confirmButtonText: 'Ir a Lista Postulaciones',
                })
                .then((confirm) => {
                    if (confirm.isConfirmed) {
                        set_is_visible(false);
                    }
                });
            return res.data;
        } catch (error) {
            dispatch(revisateInfoPostulations_fail);
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
const addDocumentPostulation = (file: any, data: any) => {
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
            dispatch(addDoc_success({ ...res.data.data }));
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

const generate_settled = (values: any) => {
    return async (dispatch: any) => {
        dispatch(GeneratePostulations_default());
        try {
            const URI = `postulations/generate_settled`;
            const res = await http.post(URI, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // const res = {
            //     data: {
            //         data: {
            //             infoSettled: {
            //                 pos_settled: 4522,
            //             },
            //         },
            //     },
            // };
            dispatch(GeneratePostulations_success(res.data.data));
            await swal_success.fire({
                html:
                    `<div class="pt-3"> <div class="mysubtitle">
                    <img src='${successAlert}' width='80px' alt="imagen" />
                    </div>` +
                    `<div class="titleRadicado">¡Fantástico! Se ha postulado con éxito</div>` +
                    `<div class="numberRadicado">No. de radicado ${res.data.data.infoSettled.pos_settled}</div>` +
                    `<div class="mysubtitle p-3">Se registraron con éxito sus datos y se ha enviado a su correo electrónico el comprobante con el cual puede hacer seguimiento a su postulación.</div>` +
                    '<div class="continueRadicado my-3">A continuación serás dirigido a la pagina de inicio.</div> </div>',
                showCancelButton: false,
                showDenyButton: true,
                confirmButtonText: 'Continuar',
                denyButtonText: `<div id="pdfDownald">Descargar comprobante</button>`,
                // confirmButtonText: '<button id="pdfDownald" class="btn btn-landing-primary ">Continuar</button>',
                didOpen: () => {
                    const validatePdf = document.getElementById('pdfDownald');
                    const DownloadHTML = () => {
                        const stringHtml = HtmlStringPdf(res.data.data);
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

const HtmlStringPdf = (generatePost: any) => {
    return `<table  class="table_postulation">
    <tr>
        <td >Número del Radicado</td>
        <td>${generatePost?.infoSettled?.pos_settled}</td>
    </tr>
    <tr>
        <td >Nombre del reto</td>
        <td >${generatePost?.infoSettled?.cha_name}</td>
    </tr>
    <tr>
        <td >Nombre o razón social</td>
        <td >${generatePost?.infoSettled?.pos_business_name}</td>
    </tr>
    <tr>
        <td >Tipo de documento</td>
        <td >${generatePost?.infoSettled?.pos_type_document_id}</td>
    </tr>
    <tr>
        <td >Número de documento</td>
        <td >${generatePost?.infoSettled?.pos_documentid}</td>
    </tr>
    <tr>
        <td >Tipo de perfil</td>
        <td >${generatePost?.infoSettled?.pos_id_type_competitor}</td>
    </tr>
    <tr>
        <td >Fecha</td>
        <td>${moment(generatePost?.infoSettled?.pos_updated_at).format('DD/MM/YYYY')}</td>
    </tr>
</table>`;
};

export const get_document_challenge = (id: number, type?: string) => {
    return async (dispatch: any) => {
        try {
            const URI =
                type === 'report'
                    ? `/informs/pdf/${id}`
                    : `/documents/download/${id}`;
            const res: any = await http.get(URI, { responseType: 'blob' });
            return res.data;
        } catch (error) {
            return Promise.reject('Error');
        }
    };
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
    get_document_challenge,
    get_list_postulation,
    get__postulationInfoDetail,
    get__documentDownload,
    get__RevisatePostulationInfoDetail,
    get__postulationReportDetail,
};
export default actions;
