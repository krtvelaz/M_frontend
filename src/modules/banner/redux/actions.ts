// import types from './types';
// import service from './service';
// import { request_dispatch } from '../../../utils';

import { IMainBanner } from "../custom_types";

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


const actions = {
  create_main_banner,
};
export default actions;
