import { cms_http } from "../../../../config/axios_instances";
import { swal_error, swal_success } from "../../../../utils/ui/swalAlert";
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
  testimony_success,
} from "./slice";

/*----------------banner---------------------*/
const create_main_banner = (values: IMainBanner) => {
  return async (dispatch: any) => {
    dispatch(banner_default());

    const img = values.car_imagen;
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        car_codigo_usuario: "123456",
        car_nombre_imagen: values.car_imagen?.name || "",
        car_ruta_imagen: "",
        car_nombre_imagen_codificado: "",
      },
    };
    delete data.data.car_imagen;

    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("file", img);

    try {
      const URI = "banner/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      return res.data.body.data;
    } catch (error: any) {
      dispatch(banner_fail());
      await swal_error.fire({
        title: "Error en el proceso",
        html:
        `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
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

const edit_banner = (values: IMainBanner, id: number) => {
  return async (dispatch: any) => {
    dispatch(banner_default());

    const data = {
      action: "update",
      info: {
        id: values.id,
      },
      data: {
        ...values,
        car_codigo_usuario: "123456",
        car_nombre_imagen: values.car_imagen?.name || '',
      },
    };

    let form: any = new FormData();

    if(!data.data.car_imagen.id){
      const img = values.car_imagen;
      form.append("file", img); 
    }else{
      form.append("file", null)
    }
    delete data.data.car_imagen;
    delete data.data.id;
    delete data.data.key;
    delete data.data.car_creado;
    form.append("data", JSON.stringify(data));

    try {
      const URI = "banner/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      return res.data.body.data;
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
};

const delete_banner = (id: number) => {
  return async (dispatch: any) => {
    dispatch(banner_default());

    try {
      const URI = "banner/delete";
      const res = await cms_http.delete(URI, {
        params: { id },
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
};

/*-----------------------------statistics---------------------*/

const create_statistics = (_values: IIndicator) => {
  return async (dispatch: any) => {
    dispatch(statistics_default());
    const values = JSON.parse(JSON.stringify(_values));
    const data = {
      action: "insert",
      info: {
        id: -1,
      },
      data: {
        ...values,
        est_numero_reto: Number(values.est_numero_reto),
        est_persona_impacto: Number(values.est_persona_impacto),
        est_actores_conectados: Number(values.est_actores_conectados),
        est_solucion_implementada: Number(values.est_solucion_implementada),
      },
    };
    delete data.data.est_creacion;
    delete data.data.est_estado;
    delete data.data.id;
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
      const URI = "statistics/last";
      const res = await cms_http.get(URI);
      dispatch(statistics_success(res.data.body.data[0]));
      return res.data.body.data[0];
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
    const img = values.tes_imagen;
    const logo = values.tes_logo;
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        tes_ruta_imagen: "",
        tes_imagen_codificado: "",
        tes_ruta_logo: "",
        tes_logo_codificado: "",
        tes_nombre_imagen: values.tes_imagen.name || "",
        tes_nombre_logo: values.tes_logo.name || "",
      },
    };

    delete data.data.tes_imagen;
    delete data.data.tes_logo;

    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("img", img);
    form.append("logo", logo);

    try {
      const URI = "/testimony/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(testimony_success(res.data.body.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">Registro de testimonio creado correctamente</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return res.data;
    } catch (error: any) {
      dispatch(testimony_fail());
      await swal_error.fire({
        title: "Error en el proceso",
        html:
          `<div class="mysubtitle">${error?.response?.data?.message}</div>` +
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
      const URI = `testimony/list/1/4`;
      const res = await cms_http.get(URI);
      dispatch(testimonials_list_success(res.data.body.data));
      return res.data.body.data;
    } catch (error) {
      dispatch(testimonials_list_fail());
      return Promise.reject("Error");
    }
  };
};

const get__testimonial = (id: number) => {
  return async (dispatch: any) => {
    dispatch(testimony_default());
    try {
      const URI = `testimony/list/${id}`;
      const res = await cms_http.get(URI);      
      dispatch(testimony_success(res.data.body.data[0]));
      return res.data.body.data[0];
    } catch (error) {
      dispatch(testimony_fail());
      return Promise.reject("Error");
    }
  };
};

const edit_testimonial = (values: ITestimony) => {
  return async (dispatch: any) => {
    dispatch(testimony_default());
    const data = {
      action: "update",
      info: {
        id: values.id,
      },
      data: {
        ...values,
        tes_nombre_imagen: values.tes_imagen.name || "",
        tes_nombre_logo: values.tes_logo.name || "",
      },
    };

    let form: any = new FormData();

    if (!data.data.tes_imagen.id) {
      const img = values.tes_imagen;
      form.append("img", img);
    } else {
      form.append("img", null);
    }
    if (!data.data.tes_logo.id) {
      const logo = values.tes_logo;
      form.append("logo", logo);
    } else {
      form.append("logo", null);
    }

    delete data.data.tes_imagen;
    delete data.data.tes_logo;
    delete data.data.key;
    delete data.data.id;

    form.append("data", JSON.stringify(data));

    try {
      const URI = "/testimony/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });      
      dispatch(testimony_success(res.data.body.data));
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



const delete_testimonial = (id: number) => {
  return async (dispatch: any) => {
    // dispatch(testimony_default());

    try {
      const URI = `/testimony/delete/${id}`;
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
    } catch (error: any) {      
      dispatch(testimony_fail);
      await swal_error.fire({
        title: "Error en el proceso",
        html:
          `<div class="mysubtitle">error</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return Promise.reject("Error");
    }
  };
};

const get_document_testimonial = (id: number, type: "img" | "logo") => {
  return async (dispatch: any) => {
    try {
      const URI = `/testimony/img`;
      const res: any = await cms_http.post(URI, {
        type,
        id
      }, { responseType: "arraybuffer" });
      return res.data;
    } catch (error) {
      return Promise.reject("Error");
    }
  };
};

const get_image_banner = (id: number) => {
  return async (dispatch: any) => {
    try {
      const URI = `banner/img/${id}`;

      const res: any = await cms_http.get(URI, { responseType: "arraybuffer" });
      
      return res.data;
    } catch (error) {
      return Promise.reject("Error");
    }
  };
};

const actions = {
  create_main_banner,
  get_list_banners,
  edit_banner,
  delete_banner,
  create_statistics,
  get_statistics,
  create_testimony,
  get__testimonial,
  get_list_testimonials,
  edit_testimonial,
  delete_testimonial,
  get_document_testimonial,
  get_image_banner,
};
export default actions;
