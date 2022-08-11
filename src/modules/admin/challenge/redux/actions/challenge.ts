import { http } from "../../../../../config/axios_instances";
import { swal_success } from "../../../../../utils/ui/swalAlert";
import { IGeneralInformation } from "../../custom_types";
import {
  fail_challenge,
  get_challenge,
  loading_challenge,
} from "../slice";

/*----------------Reto---------------------*/

export const create_challenge = (values: IGeneralInformation) => {
  const img = values.ret_imagen_principal;
  const data = {
    action: "insert",
    info: {
      id: -1,
      key: -1,
    },
    perfil: {
      data: values.ret_perfil,
    },
    data: {
      ...values,
      ret_codigo_usuario: "123456",
      ret_ruta_imagen_principal: "",
      ret_nombre_imagen: values.ret_imagen_principal?.name || "",
      ret_monto: values.ret_monto || 0,
    },
  };

  delete data.data.ret_imagen_principal;
  delete data.data.ret_perfil;
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

export const update_challenge = (values: IGeneralInformation) => {
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

export const get_detail_challenge = () => {
  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/information/detail/56";
      const res = await http.get(URI);
      dispatch(get_challenge(res.data.body[0]));
      return res.data.body[0];
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};





