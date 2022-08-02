import { http } from "../../../../../config/axios_instances";
import {
  fail_list_master,
  loading_list_master,
  success_list_master,
} from "../slice";

export const get_master_list = (type: number, profile?: number) => {
  return async (dispatch: any) => {
    dispatch(loading_list_master());
    try {
      const URI = `/list/form/`;
      const { data }: any = await http.post(URI, {
        type,
        ...(profile && {profile} )
        
      });
      dispatch(success_list_master(data.data));
      return data.data;
    } catch (error) {
      dispatch(fail_list_master());
      return Promise.reject("Error");
    }
  };
};

