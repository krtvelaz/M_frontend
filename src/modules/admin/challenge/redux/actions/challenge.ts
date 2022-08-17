import { http } from "../../../../../config/axios_instances";
import { swal_success } from "../../../../../utils/ui/swalAlert";
import { IGeneralInformation } from "../../custom_types";
import {
  fail_challenge,
  get_challenge,
  loading_challenge,
  loading_challenges,
  success_challenges,
  fail_challenges,
} from "../slice";

/*----------------Reto---------------------*/

export const create_challenge = (values: IGeneralInformation) => {
  const img = values.ret_imagen_principal;
  const data: IGeneralInformation = {
    ...values,
      ret_id_usuario: 1,
      ret_convocatoria: 1,
      ret_ruta_imagen_principal: "",
      ret_nombre_imagen: values.ret_imagen_principal?.name || "",
      ret_monto: values.ret_monto || 0,
  };  
  delete data.ret_imagen_principal;
  delete data.ret_perfil;
  delete  data.ret_id_comuna;
  delete data.ret_tipo_impacto;
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("profile", values.ret_perfil.toString());
  if (img) form.append("file", img);

  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/challenges";
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
      const URI = "/challenges/detail/2";
      const res = await http.get(URI);
      dispatch(get_challenge(res.data.data));
      return res.data.data;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};


export const get_four_challenge = () => {
  return async (dispatch: any) => {
    dispatch(loading_challenges());
    try {
      const URI = "/challenges/lastFour";
      const res = await http.get(URI);
      dispatch(success_challenges(res.data.data));
      return res.data.data;
    } catch (error) {
      dispatch(fail_challenges());
      return Promise.reject("Error");
    }
  };
};







