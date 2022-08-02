import { http } from "../../../../../config/axios_instances";
import { swal_success } from "../../../../../utils/ui/swalAlert";
import { Informe } from "../../custom_types";
import {
  fail_document_challenge,
  fail_get_list_documents,
  get_document_challenge,
  loading_document_challenge,
  loading_get_list_documents,
  success_get_list_documents,
} from "../slice";

export const create_challenge_report = (values: Informe, key: number) => {
  const pdf = values?.ret_documento;

  let data = {
    action: "insert",
    info: {
      id: -1,
      key: key,
    },
    data: {
      ...values,
      ret_ruta_documento: "",
      ret_nombre_documento: values.ret_documento?.name || "",
    },
  };
  delete data.data.ret_documento;
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
      dispatch(get_document_challenge(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data.body.data;
    } catch (error) {
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

export const edit_challenge_report = (values: Informe, key: number) => {
  let data = {
    action: "update",
    info: {
      id: values.id,
      key: key,
    },
    data: {
      ...values,
      ret_nombre_documento: values.ret_documento?.name || "",
    },
  };
  delete data.data.ret_creado;
  delete data.data.ret_estado;
  delete data.data.ret_reto_general;
  delete data.data.id;
  delete data.data.key;

  let form: any = new FormData();

  if (!data.data.ret_documento?.id) {
    const pdf = values.ret_documento;
    pdf && form.append("file", pdf);
  } else {
    form.append("file", null);
  }

  delete data.data.ret_documento;
  form.append("data", JSON.stringify(data));

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/informs/document";

      const res: any = await http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(get_document_challenge(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data.body.data;
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
    dispatch(loading_get_list_documents());
    try {
      const URI = "/informs/references";
      const { data }: any = await http.post(URI, {
        page: page,
        limit: pageSize,
        key: key,
      });
      dispatch(success_get_list_documents(data.body.data.data));
      return data.body.data.data;
    } catch (error) {
      dispatch(fail_get_list_documents());
      return Promise.reject("Error");
    }
  };
};

export const delete_challenge_report = (id: number) => {
  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/informs/delete";
      const res: any = await http.delete(URI, {
        params: {
          id,
        },
      });
      dispatch(get_document_challenge(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data.body.data;
    } catch (error) {
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};
