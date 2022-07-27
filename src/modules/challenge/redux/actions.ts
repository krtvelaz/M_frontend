import { http } from "../../../config/axios_instances";
import { swal_error, swal_success } from "../../../utils/ui/swalAlert";
import { IDocument, IGeneralInformation, Informe } from "../custom_types";
import {
  fail_challenge,
  fail_document_challenge,
  fail_get_list_documents,
  get_challenge,
  get_document_challenge,
  loading_challenge,
  loading_document_challenge,
  loading_get_list_documents,
  success_get_list_documents,
} from "./slice";

/*----------------Reto---------------------*/

const create_challenge = (values: IGeneralInformation) => {
  const img = values.ret_imagen_principal;
  const data = {
    action: "insert",
    info: {
      id: -1,
      key: -1,
    },
    data: {
      ...values,
      ret_codigo_usuario: "123456",
      ret_perfil: {
        data: values.ret_perfil,
      },
      ret_ruta_imagen_principal: "",
      ret_nombre_imagen: values.ret_imagen_principal?.name || "",
      ret_monto: values.ret_monto || 0,
    },
  };

  delete data.data.ret_imagen_principal;
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  if (img) form.append("file", img);

  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/information/general";
      const res: any = await http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(get_challenge(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return res.data.body;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

const update_challenge = (values: IGeneralInformation) => {
  const img = values.ret_ruta_imagen_principal;
  const data = {
    action: "update",
    info: {
      id: values.id,
      key: values.key,
    },
    data: {
      ...values,
      ret_codigo_usuario: "123456",
      ret_perfil: {
        data: values.ret_perfil,
      },
      ret_monto: values.ret_monto || 0,
    },
  };

  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("file", img);

  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/information/general/kjhgefjgfg";
      const res: any = await http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(get_challenge(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return res.data.body;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

const get_challenge_by_id = (id: any) => {
  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/pokemon?limit=10&offset=0";
      const res = await http.get(URI);
      dispatch(get_challenge(res.data));
      return res.data;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

/*----------------Documentos del reto---------------------*/

const create_challenge_document = (
  values: IDocument,
  key: number,
  type: "general" | "admin" | "technicians"
) => {
  const pdf = values.ret_plantilla;
  let data = {
    action: "insert",
    info: {
      id: -1,
      key: key,
    },
    data: {
      ...values,
      ret_ruta_plantilla: "",
      ret_nombre_plantilla: values.ret_plantilla?.name || "",
      ret_tipo_formulario:
        type === "general"
          ? 1
          : type === "technicians"
          ? 2
          : type === "admin" && 3,
    },
  };
  delete data.data.ret_plantilla;
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  if (pdf) form.append("file", pdf);

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents/add";

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

const edit_challenge_document = (
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

const delete_challenge_document = (
  type: "general" | "admin" | "technicians",
  id: number
) => {
  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents/delete";
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

const get_list_document = (
  type: "general" | "admin" | "technicians",
  key: number,
  { page = 1, pageSize = 10 }
) => {
  return async (dispatch: any) => {
    dispatch(loading_get_list_documents());
    try {
      const URI = `/documents/references`;
      const { data }: any = await http.post(URI, {
        page: page,
        limit: pageSize,
        key: key,
        type: type === "general" ? 1 : type === "technicians" ? 2 : 3,
      });
      dispatch(success_get_list_documents(data.body.data.data));
      return data.body.data.data;
    } catch (error) {
      dispatch(fail_get_list_documents());
      return Promise.reject("Error");
    }
  };
};

/*----------------informes---------------------*/

const create_challenge_report = (values: Informe, key: number) => {
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

const edit_challenge_report = (values: Informe, key: number) => {
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

const get_list_challenge_report = (
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

const delete_challenge_report = (id: number) => {
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

/*----------------Documents---------------------*/

const get_document = (id: number, type?: string) => {
  return async (dispatch: any) => {
    // dispatch(loading_document_challenge());
    try {
      const URI =
        type === "report" ? `/informs/pdf/${id}` : `/documents/pdf/${id}`;

      const res: any = await http.get(URI, { responseType: "arraybuffer" });

      // dispatch(get_document_challenge(res.data.body.data));
      return res.data;
    } catch (error) {
      // dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

const actions = {
  get_challenge_by_id,
  create_challenge,
  update_challenge,
  create_challenge_document,
  edit_challenge_document,
  get_list_document,
  delete_challenge_document,
  create_challenge_report,
  edit_challenge_report,
  get_list_challenge_report,
  delete_challenge_report,
  get_document,
};

export default actions;
