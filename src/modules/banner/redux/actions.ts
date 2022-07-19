// import types from './types';
// import service from './service';
// import { request_dispatch } from '../../../utils';

import { master_http } from "../../../config/axios_instances";
import { swal_error, swal_success } from "../../../utils/ui/swalAlert";
import { IIndicator, IMainBanner, ITestimony } from "../custom_types";
import { statistics_default, statistics_fail, statistics_success, testimonials_list_default, testimonials_list_fail, testimonials_list_success, testimony_default, testimony_fail } from "./slice";


// const example = (filters = {}) =>
//     request_dispatch(types.example_type, service.example_service(filters));

const create_main_banner = (data: IMainBanner[]) => {
  return async (dispatch: any) => {
    dispatch();
    try {
      const URI = "";
      // const res = await http.get(URI);
      dispatch();
      // return res.data;
    } catch (error) {
      dispatch();
      return Promise.reject("Error");
    }
  };
};

/*----------------statistics---------------------*/

const create_statistics = (data: IIndicator) => {
  return async (dispatch: any) => {
    dispatch(statistics_default());
    let values = JSON.parse(JSON.stringify(data));
      values.mas_challenges_number = Number(values.mas_challenges_number);
      values.mas_impacted_people = Number(values.mas_impacted_people);
      values.mas_connected_actors = Number(values.mas_connected_actors);
      values.mas_implemented_solutions = Number(values.mas_implemented_solutions);
      values.mas_status = true;
      delete values.created_at;
      delete values.id;
      delete values.updated_at
    try {
      const URI = "/statistics/statistic";
      const res = await master_http.post(URI,values);
      // dispatch();
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.message}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return res;
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
      const URI = "/statistics/listLastOneStatistic";
      const res = await master_http.get(URI);
      dispatch(statistics_success(res.data.body.information[0]));
      return res.data.body.information[0];
    } catch (error) {
      dispatch(statistics_fail());
      return Promise.reject("Error");
    }
  };
};


/*-----------------------------testimony-------------------------------------*/
const create_testimony = (data: ITestimony) => {
  return async (dispatch: any) => {
    dispatch(testimony_default());
    let values = JSON.parse(JSON.stringify(data));
   
    values.mas_image = "";
    values.mas_logo = "";
    values.mas_status = true;

    try {
      const URI = "/testimonial";
      const res = await master_http.post(URI,values);
      // dispatch();
      console.log(res);
      // return res.data;
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
      const URI = "/listTestimonials";
      const res = await master_http.get(URI);
      dispatch(testimonials_list_success(res.data.body.information[0]));
      return res.data.body.information[0];
    } catch (error) {
      dispatch(testimonials_list_fail());
      return Promise.reject("Error");
    }
  };
};


const actions = {
  create_main_banner,
  create_statistics,
  get_statistics,
  create_testimony,
  get_list_testimonials,
};
export default actions;
