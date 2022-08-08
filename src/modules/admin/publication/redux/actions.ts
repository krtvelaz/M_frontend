import { cms_http } from "../../../../config/axios_instances";
import { swal_error, swal_success } from "../../../../utils/ui/swalAlert";
import { IEvent, IGalleryInfo, IGeneralInfo } from "../custom_types";
import {
  default_event,
  success_event,
  fail_event,
  default_list_event,
  success_list_event,
  fail_list_event,
  default_publication,
  success_publication,
  fail_publication,
  default_list_publication,
  success_list_publication,
  fail_list_publication,
  fail_gallery,
  success_gallery,
  default_gallery,
  fail_list_gallery,
  default_list_gallery,
  success_list_gallery,
} from "./slice"

const create_event = (_values: IEvent) => {
  return async (dispatch: any) => {
    dispatch(default_event());
    const values = JSON.parse(JSON.stringify(_values));
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        eve_numero_cupos: Number(values.eve_numero_cupos) || null,
      },
    };
    try {
      const URI = "event/add";
      const res = await cms_http.post(URI, data, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
      });
      dispatch(success_event(res.data.body.dat));
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
      dispatch(fail_event());
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

const delete_event = (id: number) => {
  return async (dispatch: any) => {
    dispatch(default_event());

    try {
      const URI = `/event/event/${id}`;
      const res = await cms_http.delete(URI);
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      // dispatch(res.data.body.data);
      return res.data.body.data;
    } catch (error) {
      dispatch(fail_event());
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

const get_list_events = ({ page = 1, limi = 10 }) => {
  return async (dispatch: any) => {
    dispatch(default_list_event());
    try {
      const URI = `event/list/${page}/${limi}`;
      const res = await cms_http.get(URI);
      const events = {
        results: res.data.body.data,
        pagination: res.data.body.meta,
      }
      dispatch(success_list_event(events));
      return res.data.body.data;
    } catch (error) {
      dispatch(fail_list_event());
      return Promise.reject("Error");
    }
  };
};

const get_event_by_id = (id: number) => {
  return async (dispatch: any) => {
    dispatch(default_event);
    try {
      const URI = `event/list/${id}`;
      const res = await cms_http.get(URI);
      dispatch(success_event(res.data.body[0]));
      return res.data.body[0];
    } catch (error) {
      dispatch(fail_event());
      return Promise.reject("Error");
    }
  };
};


const edit_event = (_values: IEvent) => {
  return async (dispatch: any) => {
    dispatch(default_event());
    const values = JSON.parse(JSON.stringify(_values));
    const data = {
      action: "update",
      info: {
        id: values.id,

      },
      data: {
        ...values,
        eve_numero_cupos: Number(values.eve_numero_cupos) || null,
      },
    };
    delete data.data.id;
    delete data.data.eve_creacion;

    try {
      const URI = "event/add";
      const res = await cms_http.post(URI, data, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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
      return res.data;
    } catch (error) {
      dispatch(fail_event());
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

const edit_publication_event = (_values: IEvent, is_public?: any) => {
  return async (dispatch: any) => {
    dispatch(default_event());
    const values = JSON.parse(JSON.stringify(_values));
    const data = {
      action: "update",
      info: {
        id: values.id,

      },
      data: {
        eve_numero_cupos: Number(values.eve_numero_cupos) || null,
        eve_publicada: is_public || false,
      },
    };


    try {
      const URI = "event/add";
      const res = await cms_http.post(URI, data, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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
      return res.data;
    } catch (error) {
      dispatch(fail_event());
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

const create_publication = (values: IGeneralInfo) => { //
  return async (dispatch: any) => {
    dispatch(default_publication());
    // const values = JSON.parse(JSON.stringify(_values));
    const img = values.hec_nombre_imagen_principal;

    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        hec_id_tipo_publicacion: Number(values.hec_id_tipo_publicacion),
        hec_ruta_imagen_principal: "",

        hec_nombre_imagen_principal: values.hec_nombre_imagen_principal.name || "",
        hec_nombre_codificado_imagen_principal: "",
      },
    };

    delete data.data.hec_nombre_imagen_principal
    let form = new FormData();;
    delete data.data.id;
    form.append("data", JSON.stringify(data));
    form.append("img", img);
    try {
      const URI = "news/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
      });
      // dispatch(success_publication(res.data.body.data));
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
      dispatch(fail_publication());
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
const get_list_publications = ({ page = 1, limi = 10 }) => {
  return async (dispatch: any) => {
    dispatch(default_list_publication());
    try {
      const URI = `news/list/${page}/${limi}`;
      const res = await cms_http.get(URI);
      const events = {
        results: res.data.body.data,
        pagination: res.data.body.meta,
      }
      dispatch(success_list_publication(events));
      return res.data.body.data;
    } catch (error) {
      dispatch(fail_list_publication());
      return Promise.reject("Error");
    }
  };
};
const edit_publication = (values: IGeneralInfo) => { //
  return async (dispatch: any) => {
    dispatch(default_publication());
    // const values = JSON.parse(JSON.stringify(_values));
    const img = values.hec_nombre_imagen_principal;

    const data = {
      action: "update",
      info: {
        id: values.id,
      },
      data: {
        ...values,
        // hec_id_tipo_publicacion: Number(values.hec_id_tipo_publicacion),
        // hec_ruta_imagen_principal: "",

        // hec_nombre_imagen_principal: values.hec_nombre_imagen_principal.name || "",
        // hec_nombre_codificado_imagen_principal: "",
      },
    };
    delete data.data.id;
    // delete data.data.eve_creacion;
    let form = new FormData();;
    delete data.data.id;
    form.append("data", JSON.stringify(data));
    form.append("img", img);
    try {
      const URI = "news/add";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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
      dispatch(fail_publication());
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

const delete_publication = (id: number) => {
  return async (dispatch: any) => {
    dispatch(default_publication());

    try {
      const URI = `news/delete/${id}`;
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
    } catch (error) {
      dispatch(fail_publication());
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
const edit_published_publication = (_values: IGeneralInfo, is_public?: any) => {
  return async (dispatch: any) => {
    dispatch(default_publication());
    const values = JSON.parse(JSON.stringify(_values));
    const data = {
      action: "update",
      info: {
        id: values.id,

      },
      data: {
        
        // eve_numero_cupos: Number(values.eve_numero_cupos) || null,
        hec_publicada: is_public || false,
      },
    };

    try {
      const URI = "news/add";
      const res = await cms_http.post(URI, data, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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
      dispatch(fail_publication());
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

const create_gallery = (values: IGalleryInfo) => { //
  return async (dispatch: any) => {
    dispatch(default_gallery());
    const img = values.gal_nombre_imagen;
    const data = {
      action: "insert",
      info: {
        id: -1,
        key: -1,
      },
      data: {
        ...values,
        gal_nombre_imagen: values.gal_nombre_imagen?.name || "",
        gal_nombre_codificado_imagen: "",
        gal_ruta_imagen: "",
      },
    };
    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("img", img);
    try {
      const URI = "news/imgGallery";
      const res = await cms_http.post(URI, form, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
      });
      dispatch(success_gallery(res.data.body.data));
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
      dispatch(fail_gallery());
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

const get_gallery_by_id = (id: number) => {
  return async (dispatch: any) => {
    dispatch(default_gallery());
    try {
      const URI = `galery/list/${id}`;
      const res = await cms_http.get(URI);
      dispatch(success_gallery(res.data.body.data[0]));
      return res.data.body.data[0];
    } catch (error) {
      dispatch(fail_gallery());
      return Promise.reject("Error");
    }
  };
};
const get_list_gallery = (key: number) => {
  return async (dispatch: any) => {
    dispatch(default_list_gallery());
   
    try {
      const URI = "news/galery/list";
      const res = await cms_http.post(URI, {
        key
        
      });
      dispatch(success_list_gallery(res.data.body.data));
      return res.data.body.data;
    } catch (error) {
      dispatch(fail_list_gallery());
      return Promise.reject("Error");
    }
  };
};



const actions = {
  create_event,
  delete_event,
  get_list_events,
  get_event_by_id,
  edit_event,
  edit_publication_event,
  create_publication,
  get_list_publications,
  edit_publication,
  delete_publication,
  edit_published_publication,
  create_gallery,
  get_gallery_by_id,
  get_list_gallery,

}

export default actions;