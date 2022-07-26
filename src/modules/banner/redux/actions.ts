import { cms_http, master_http } from "../../../config/axios_instances";
import { swal_error, swal_success } from "../../../utils/ui/swalAlert";
import { IIndicator, IMainBanner, ITestimony } from "../custom_types";
import {
  banners_list_default,
  banners_list_fail,
  banners_list_success,
  banner_default,
  banner_fail,
  statistics_default,
  statistics_fail,
  statistics_success,
  testimonials_list_default,
  testimonials_list_fail,
  testimonials_list_success,
  testimony_default,
  testimony_fail,
} from "./slice";

/*----------------banner---------------------*/
const create_main_banner = (values: IMainBanner) => {
  return async (dispatch: any) => {
    dispatch(banner_default());

    const img = values.car_ruta_imagen;
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        car_codigo_usuario: "123456",
        car_ruta_imagen: "",

      },
    };

    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("file", img);

    try {
      const URI = "banner/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }

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
      return res.data.body.data;
    } catch (error) {
      dispatch(banner_fail());
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

const get_list_banners = () => {
  return async (dispatch: any) => {
    dispatch(banners_list_default());
    try {
      const URI = "banner/list";
      const res = await cms_http.get(URI);
      dispatch(banners_list_success(res.data.body.data));
      return res.data.body.data;
    } catch (error) {
      dispatch(banners_list_fail());
      return Promise.reject("Error");
    }
  };
};

const edit_banner = (data: ITestimony, id: number) => {

  return async (dispatch: any) => {
    // dispatch(banner_default());
    let values = JSON.parse(JSON.stringify(data));
    values.car_codigo_usuario = "12345";
    values.car_nombre_imagen = "";
    values.car_ruta_imagen = "";
    // values.mas_status = true; // averiguar si se debe quitar
    delete values.created_at;
    delete values.id;
    delete values.updated_at;
    delete values.key;
    try {
      const URI = `banners${id}`;//agregar url correcta
      const res = await master_http.put(URI, values);// corregir master_http
      // dispatch();
      // await swal_success.fire({
      //   title: "Proceso exitoso",
      //   html:
      //     `<div class="mysubtitle">${res.data.message}</div>` +
      //     '<div class="mytext">De click en aceptar para continuar</div>',
      //   showCancelButton: false,
      //   confirmButtonText: "Aceptar",
      // });
      return res.data;
    } catch (error) {
      // dispatch(banner_fail); 
      // await swal_error.fire({
      //   title: "Error en el proceso",
      //   html:
      //     '<div class="mysubtitle">error</div>' +
      //     '<div class="mytext">De click en aceptar para continuar</div>',
      //   showCancelButton: false,
      //   confirmButtonText: "Aceptar",
      // });
      return Promise.reject("Error");
    }
  };
}

const delete_banner = (id: number) => {

  return async (dispatch: any) => {
    dispatch(banner_default());

    try {
      const URI = 'banner/delete';
      const res = await cms_http.delete(URI, {
        params: { id }
      });
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
      dispatch(banner_fail);
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
}

/*-----------------------------statistics---------------------*/

const create_statistics = (values: IIndicator) => {
  return async (dispatch: any) => {
    dispatch(statistics_default());
    const data = {
      action: "insert",
      info: {
        id: -1,
      },
      data: {
        ...values,
        est_numero_reto: Number(values.est_numero_reto),
        est_persona_impacto : Number(values.est_persona_impacto),
        est_actores_conectados : Number(values.est_actores_conectados),
        est_solucion_implementada: Number(values.est_solucion_implementada),
      },
    };
    console.log(JSON.stringify(data))
    try {
      const URI = "statistics/add";
      const res = await cms_http.post(URI, data);
      // dispatch();
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
      dispatch(statistics_fail());
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

const get_statistics = () => {
  return async (dispatch: any) => {
    dispatch(statistics_default());
    try {
      const URI = "statistics/list/1/3";
      const res = await cms_http.get(URI);
      dispatch(statistics_success(res.data.body.data[res.data.body.data.length - 1]));
       return res.data.body.data[res.data.body.data.length - 1];
    } catch (error) {
      dispatch(statistics_fail());
      return Promise.reject("Error");
    }
  };
};

/*-----------------------------testimony-------------------------------------*/
const create_testimony = (values: ITestimony) => {
  return async (dispatch: any) => {
    dispatch(testimony_default());
    const img = values.mas_image;
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        // car_codigo_usuario: "123456",//  ---> Agregar los values correctos
        // car_ruta_imagen: "",

      },
    };

    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("file", img);
    // let values = JSON.parse(JSON.stringify(data));
    // values.mas_image = "";
    // values.mas_logo = "";
    // values.mas_status = true;

    try {
      const URI = "testimonials/testimonial";
      const res = await master_http.post(URI,  form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
      return res.data;
    } catch (error) {
      dispatch(testimony_fail);
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

const get_list_testimonials = () => {
  return async (dispatch: any) => {
    dispatch(testimonials_list_default());
    try {
      const URI = "testimonials/listTestimonials";// Cambiar la ruta tetimonials
      const res = await cms_http.get(URI);
      dispatch(testimonials_list_success(res.data.body.data));
      return res.data.body.data;
    } catch (error) {
      dispatch(testimonials_list_fail());
      return Promise.reject("Error");
    }
  };
};

const edit_testimonial = (data: ITestimony, id: number) => {

  return async (dispatch: any) => {
    dispatch(testimony_default());
    let values = JSON.parse(JSON.stringify(data));
    values.mas_image = "";
    values.mas_logo = "";
    values.mas_status = true;
    delete values.created_at;
    delete values.id;
    delete values.updated_at;
    delete values.key;
    try {
      const URI = `testimonials/testimonial/${id}`;
      const res = await master_http.put(URI, values);
      // dispatch();
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
      dispatch(testimony_fail);
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
}

const delete_testimonial = (id: number) => {

  return async (dispatch: any) => {
    dispatch(testimony_default());

    try {
      const URI = `testimonials/testimonial/${id}`;
      const res = await master_http.delete(URI);
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
      dispatch(testimony_fail);
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
}

const actions = {
  create_main_banner,
  get_list_banners,
  edit_banner,
  delete_banner,
  create_statistics,
  get_statistics,
  create_testimony,
  get_list_testimonials,
  edit_testimonial,
  delete_testimonial,
};
export default actions;
