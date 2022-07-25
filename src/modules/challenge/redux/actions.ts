import { http } from "../../../config/axios_instances";
import { swal_success } from "../../../utils/ui/swalAlert";
import {
  IDocument,
  IGeneralInformation,
  Informe,
} from "../custom_types";
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
  const img = values.ret_ruta_imagen_principal;
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
      ret_nombre_imagen: "",
      ret_monto: values.ret_monto || 0,
    },
  };

  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("file", img);

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
      ret_ruta_imagen_principal: "",
      ret_nombre_imagen: "",
      ret_monto: values.ret_monto || 0,
    },
  };

  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("file", img);

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
  const pdf = values.ret_ruta_plantilla;
  let data = {
    action: "insert",
    info: {
      id: -1,
      key: key,
    },
    data: {
      ...values,
      ret_ruta_plantilla: "",
      ret_tipo_formulario:
        type === "general"
          ? 1
          : type === "technicians"
          ? 2
          : type === "admin" && 3,
    },
  };
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("file", pdf);

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents/add";

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
      ret_ruta_plantilla: "",
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

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/documents/add";

      const res: any = await http.post(URI, data);
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
  { page = 1, pageSize = 10 }
) => {
  return async (dispatch: any) => {
    dispatch(loading_get_list_documents());
    try {
      const URI = `/documents/list`;
      const { data }: any = await http.post(URI, {
        page: page,
        limit: pageSize,
        code_user: "123456",
        typeForm: type === "general" ? 1 : type === "technicians" ? 2 : 3,
      });
      dispatch(success_get_list_documents(data.body.data));
      return data.body.data;
    } catch (error) {
      dispatch(fail_get_list_documents());
      return Promise.reject("Error");
    }
  };
};

/*----------------informes---------------------*/

const create_challenge_report = (values: Informe, key: number) => {
  const pdf = values.ret_ruta_documento;

  let data = {
    action: "insert",
    info: {
      id: -1,
      key: key,
    },
    data: {
      ...values,
      ret_ruta_documento: "",
    },
  };

  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("file", pdf);

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
      ret_ruta_documento: "",
    },
  };
  delete data.data.ret_creado;
  delete data.data.ret_estado;
  delete data.data.ret_reto_general;
  delete data.data.id;
  delete data.data.key;

  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI = "/informs/document";

      const res: any = await http.post(URI, data);
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

const get_list_challenge_report = ({ page = 1, pageSize = 10 }) => {
  return async (dispatch: any) => {
    dispatch(loading_get_list_documents());
    try {
      const URI = "/informs/list";
      const { data }: any = await http.post(URI, {
        page: page,
        limit: pageSize,
        code_user: "123456",
      });
      dispatch(success_get_list_documents(data.body.data));
      return data.body.data;
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
};

export default actions;
