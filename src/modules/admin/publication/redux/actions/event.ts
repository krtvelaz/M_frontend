import { cms_http } from "../../../../../config/axios_instances";
import { swal_error } from "../../../../../utils/ui";
import { swal_success } from "../../../../../utils/ui/swalAlert";
import { IEvent } from "../../custom_types";
import { default_event, default_list_event, fail_event, fail_list_event, success_event, success_list_event } from "../slice";

export const create_event = (_values: IEvent) => {
    return async (dispatch: any) => {
        dispatch(default_event());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            action: "insert",
            info: {
                id: -1,
                key: -1,
            },
            data: {
                ...values,
                eve_numero_cupos: Number(values.eve_numero_cupos) || null,
            },
        };
        try {
            const URI = "event/add";
            const res = await cms_http.post(URI, data, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
            dispatch(success_event(res.data.body.dat));
            await swal_success.fire({
                title: "Proceso exitoso",
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return res.data;
        } catch (error) {
            dispatch(fail_event());
            await swal_error.fire({
                title: "Error en el proceso",
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return Promise.reject("Error");
        }
    };
};

export const delete_event = (id: number) => {
    return async (dispatch: any) => {
        dispatch(default_event());

        try {
            const URI = `/event/event/${id}`;
            const res = await cms_http.delete(URI);
            await swal_success.fire({
                title: "Proceso exitoso",
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            // dispatch(res.data.body.data);
            return res.data.body.data;
        } catch (error) {
            dispatch(fail_event());
            await swal_error.fire({
                title: "Error en el proceso",
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return Promise.reject("Error");
        }
    };
};

export const get_list_events = ({ page = 1, limi = 10 }) => {
    return async (dispatch: any) => {
        dispatch(default_list_event());
        try {
            const URI = `event/list/${page}/${limi}`;
            const res = await cms_http.get(URI);
            const events = {
                results: res.data.body.data,
                pagination: res.data.body.meta,
            }
            dispatch(success_list_event(events));
            return res.data.body.data;
        } catch (error) {
            dispatch(fail_list_event());
            return Promise.reject("Error");
        }
    };
};

export const get_event_by_id = (id: number) => {
    return async (dispatch: any) => {
        dispatch(default_event);
        try {
            const URI = `event/list/${id}`;
            const res = await cms_http.get(URI);
            dispatch(success_event(res.data.body[0]));
            return res.data.body[0];
        } catch (error) {
            dispatch(fail_event());
            return Promise.reject("Error");
        }
    };
};


export const edit_event = (_values: IEvent) => {
    return async (dispatch: any) => {
        dispatch(default_event());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            action: "update",
            info: {
                id: values.id,

            },
            data: {
                ...values,
                eve_numero_cupos: Number(values.eve_numero_cupos) || null,
            },
        };
        delete data.data.id;
        delete data.data.eve_creacion;

        try {
            const URI = "event/add";
            const res = await cms_http.post(URI, data, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
            // dispatch();
            await swal_success.fire({
                title: "Proceso exitoso",
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return res.data;
        } catch (error) {
            dispatch(fail_event());
            await swal_error.fire({
                title: "Error en el proceso",
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return Promise.reject("Error");
        }
    };
};

export const edit_publication_event = (_values: IEvent, is_public?: any) => {
    return async (dispatch: any) => {
        dispatch(default_event());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            action: "update",
            info: {
                id: values.id,

            },
            data: {
                eve_numero_cupos: Number(values.eve_numero_cupos) || null,
                eve_publicada: is_public || false,
            },
        };


        try {
            const URI = "event/add";
            const res = await cms_http.post(URI, data, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
            // dispatch();
            await swal_success.fire({
                title: "Proceso exitoso",
                html:
                    `<div class="mysubtitle">${res.data.message}</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return res.data;
        } catch (error) {
            dispatch(fail_event());
            await swal_error.fire({
                title: "Error en el proceso",
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            });
            return Promise.reject("Error");
        }
    };
};
