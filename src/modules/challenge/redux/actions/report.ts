import { http } from "../../../../config/axios_instances";
import { swal_success } from "../../../../utils/ui/swalAlert";
import { Informe } from "../../custom_types";
import {
  fail_document_challenge,
  fail_reports,
  get_document_challenge,
  loading_document_challenge,
  loading_reports,
  success_reports,
} from "../slice";

export const create_challenge_report = (values: Informe, key: number) => {
  const pdf = values?.retinf_documento;

  let data = {
      ...values,
      retinf_estado: true,
      retinf_id_reto: key, 
  };
  delete data.retinf_documento;
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  if (pdf) form.append("file", pdf);

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/informs/document";

      const res: any = await http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(get_document_challenge(res.data.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data.data;
    } catch (error) {
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

export const edit_challenge_report = (values: Informe, key: number) => {
  let data = {
      ...values,
      retinf_id_reto: key,
      ret_nombre_documento: values.retinf_documento?.name || "",
  };
  
  delete data.retinf_nombre_archivo;
  delete data.retinf_ruta_archivo;
  delete data.id;

  let form: any = new FormData();

  if (!data.retinf_documento?.id) {
    const pdf = values.retinf_documento;
    pdf && form.append("file", pdf);
  } 

  delete data.retinf_documento;
  delete data.retinf_creado;
  delete data.retinf_modificado;
  delete data.key;
  delete data.ret_nombre_documento;
  form.append("data", JSON.stringify(data));

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = `/informs/update/${values.id}`;

      const res: any = await http.put(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(get_document_challenge(res.data.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data.data;
    } catch (error) {
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

export const get_list_challenge_report = (
  key: number,
  { page = 1, pageSize = 10 }
) => {
  return async (dispatch: any) => {
    dispatch(loading_reports());
    try {
      const URI = `/informs/lists/${page}/${pageSize}/${key}`;
      const res: any = await http.get(URI);      
      const reports = {
        results: res.data.data.data,
        pagination: res.data.data.meta,
      }
      dispatch(success_reports(reports));
      return res.data.data.data;
    } catch (error) {
      dispatch(fail_reports());
      return Promise.reject("Error");
    }
  };
};

export const delete_challenge_report = (id: number) => {
  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = `/informs/delete/${id}`;
      const res: any = await http.delete(URI);
      dispatch(get_document_challenge(res.data));
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
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};
