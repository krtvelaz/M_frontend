import { cms_http } from '../../../../config/axios_instances';
import { swal_error, swal_success } from '../../../../utils/ui/swalAlert';
import { IIndicator } from '../../custom_types';

import {
    statistics_default,
    statistics_fail,
    statistics_success,
} from '../slice';

export const create_statistics = (_values: IIndicator) => {
    return async (dispatch: any) => {
        dispatch(statistics_default());
        const values = JSON.parse(JSON.stringify(_values));
        const data = {
            action: 'insert',
            info: {
                id: -1
            },
            data: {
                ...values,
                est_numero_reto: Number(values.est_numero_reto),
                est_persona_impacto: Number(values.est_persona_impacto),
                est_actores_conectados: Number(values.est_actores_conectados),
                est_solucion_implementada: Number(
                    values.est_solucion_implementada
                )
            }
        };
        delete data.data.est_creacion;
        delete data.data.est_estado;
        delete data.data.id;
        try {
            const URI = '/statistics';
            const res = await cms_http.post(URI, data);
            // dispatch(statistics_success(res.data.body.data));
            await swal_success.fire({
                title: 'Proceso exitoso',
                html:
                    `<div class="mysubtitle">Actualización exitosa</div>` +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return res.data.body.data;
        } catch (error) {
            dispatch(statistics_fail());
            await swal_error.fire({
                title: 'Error en el proceso',
                html:
                    '<div class="mysubtitle">error</div>' +
                    '<div class="mytext">De click en aceptar para continuar</div>',
                showCancelButton: false,
                confirmButtonText: 'Aceptar'
            });
            return Promise.reject('Error');
        }
    };
};

export const get_statistics = () => {
    return async (dispatch: any) => {
        dispatch(statistics_default());
        try {
            const URI = 'statistics/last';
            const res = await cms_http.get(URI);
            dispatch(statistics_success(res.data.body.data[0]));
            return res.data.body.data[0];
        } catch (error) {
            dispatch(statistics_fail());
            return Promise.reject('Error');
        }
    };
};