import { http } from "../../../../../config/axios_instances";
import { swal_error, swal_success } from "../../../../../utils/ui/swalAlert";
import { IDocument } from "../../custom_types";
import {
  fail_document_challenge,
  fail_get_list_documents,
  get_document_challenge,
  loading_document_challenge,
  loading_get_list_documents,
  success_get_list_documents,
  loading_get_types_documents,
  success_get_types_documents,
  fail_get_types_documents,
} from "../slice";

export const create_challenge_document = (
  values: IDocument,
  key: number,
  type: "general" | "admin" | "technicians"
) => {

  let data = {
    file: values.ret_plantilla,
    id_challenge: key,
    id_document_type: values.ret_tipo_documento,
    name_document_type: values?.ret_plantilla?.name || "",
  };

  let form: any = new FormData();
  form.append("file", !values?.ret_plantilla.name ? null : values?.ret_plantilla );
  form.append("id_challenge", key);
  form.append("id_document_type", values.ret_tipo_documento);
  form.append("name_document_type", values?.ret_plantilla?.name);

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents";

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
      await swal_error.fire({
        title: "Error en el proceso",
        html:
          '<div class="mysubtitle">error</div>' +
          '<div class="mytext">De click en aceptar para continuar.</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return Promise.reject("Error");
    }
  };
};

export const edit_challenge_document = (
  values: IDocument,
  key: number,
  type: "general" | "admin" | "technicians"
) => {
  const data = {
    action: "update",
    info: {
      id: values.id,
      key: key,
    },
    data: {
      ...values,
      ret_nombre_plantilla: values.ret_plantilla?.name || "",
      ret_tipo_formulario:
        type === "general"
          ? 1
          : type === "technicians"
          ? 2
          : type === "admin"
          ? 3
          : 4,
    },
  };

  delete data.data.ret_estado;
  delete data.data.ret_creado;
  delete data.data.key;
  delete data.data.id;

  let form: any = new FormData();

  if (!data.data.ret_plantilla?.id) {
    const pdf = values.ret_plantilla;
    pdf && form.append("file", pdf);
  } else {
    form.append("file", null);
  }

  delete data.data.ret_plantilla;
  form.append("data", JSON.stringify(data));

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents/add/";

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

export const delete_challenge_document = (
  type: "general" | "admin" | "technicians",
  id: number
) => {
  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents";
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

export const get_list_document = (
  type: "general" | "admin" | "technicians",
  key: number,
  { page = 1, pageSize = 10 }
) => {
  return async (dispatch: any) => {
    dispatch(loading_get_list_documents());
    try {
      const URI = `documents/list/${
        type === "general" ? "1" : type === "technicians" ? "2" : "3"
      }/${key}`;
      const { data }: any = await http.get(URI);
      dispatch(success_get_list_documents(data.data));
      return data.data;
    } catch (error) {
      dispatch(fail_get_list_documents());
      return Promise.reject("Error");
    }
  };
};

export const get_document = (id: number, type?: string) => {
  return async (dispatch: any) => {
    // dispatch(loading_document_challenge());
    try {
      const URI =
        type === "report" ? `/informs/pdf/${id}` : `/documents/download/${id}`;

      const res: any = await http.get(URI, { responseType: "arraybuffer" });

      // dispatch(get_document_challenge(res.data.body.data));
      return res.data;
    } catch (error) {
      // dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

export const get_types_documents = (
  type: "general" | "admin" | "technicians",
  profile?: number
) => {
  return async (dispatch: any) => {
    dispatch(loading_get_types_documents());
    try {
      const URI = "/lists/documents";

      const res: any = await http.get(URI, {
        params: {
          ...(profile && {
            profile,
          }),
          ...(type === "technicians"
            ? {
                type: "technical",
              }
            : { type }),

          // ...(type === "technicians"
          //   ? {
          //       type: "technical ",
          //     }
          //   : { type }),
          // ...(profile && {
          //   profile: `${profile}`,
          // }),
        },
      });

      dispatch(success_get_types_documents(res.data.data));
      return res.data.data;
    } catch (error) {
      dispatch(fail_get_types_documents());
      return Promise.reject("Error");
    }
  };
};
