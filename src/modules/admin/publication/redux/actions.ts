import { cms_http } from "../../../../config/axios_instances";
import { swal_error, swal_success } from "../../../../utils/ui/swalAlert";
import { IEvent } from "../custom_types";
import {
    event_default,
    event_list_success,
    fail_event,
    fail_list_event,
    get_list_event,
} from "./slice"

const create_event = (_values: IEvent) => {
    return async (dispatch: any) => {
        dispatch(event_default());
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
        // let form = new FormData();
        // form.append("data", JSON.stringify(data));

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
            // console.log(res.data.body.data)
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

const delete_event = (id: number) => {
    return async (dispatch: any) => {
      dispatch(event_default());
  
      try {
        const URI = `/event/${id}`;
        const res = await cms_http.delete(URI);
        await swal_success.fire({
          title: "Proceso exitoso",
          html:
            `<div class="mysubtitle">${res.data.message}</div>` +
            '<div class="mytext">De click en aceptar para continuar</div>',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        });
        // dispatch();
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

  const get_event = () => {
    return async (dispatch: any) => {
      dispatch(get_list_event());
      try {
        const URI = "statistics/last";
        const res = await cms_http.get(URI);
        dispatch(event_list_success(res.data.body.data[0]));
        return res.data.body.data[0];
      } catch (error) {
        dispatch(fail_list_event());
        return Promise.reject("Error");
      }
    };
  };
  

const actions = {
    create_event,
    delete_event,
}

export default actions;