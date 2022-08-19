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
  const img = values.cha_imagen_principal;
  const data: IGeneralInformation = {
    ...values,
    cha_id_user: 1,
    cha_announcement: 1,
    cha_principal_image_path: "",
    cha_amount: values.cha_amount || 0,
  };
  delete data.cha_imagen_principal;
  delete data.cha_profiles;
  delete data.cha_id_commune;
  let form = new FormData();
  form.append("data", JSON.stringify(data));
  if (values.cha_profiles) form.append("profile", values.cha_profiles.toString());
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
      dispatch(get_challenge(res.data.data.info));

      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return res.data.data.info;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

export const update_challenge = (values: IGeneralInformation) => {
  const img = values.cha_principal_image_path;
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
        data: values.cha_profiles,
      },
      ret_monto: values.cha_amount || 0,
    },
  };

  let form = new FormData();
  form.append("data", JSON.stringify(data));
  // form.append("file", img);

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
