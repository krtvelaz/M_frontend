import { http } from "../../../../config/axios_instances";
import {
  loading_list_communes,
  success_list_communes,
  fail_list_communes,
  loading_list_dimensions,
  success_list_dimensions,
  fail_list_dimensions,
  loading_list_dependencies,
  success_list_dependencies,
  fail_list_dependencies,
  loading_list_profiles,
  success_list_profiles,
  fail_list_profiles,
  loading_list_neighborhoods,
  success_list_neighborhoods,
  fail_list_neighborhoods,
} from "../slice";


export const get_profiles = () => {
  return async (dispatch: any) => {
    dispatch(loading_list_profiles());
    try {
      const URI = `/lists/profiles`;
      const { data }: any = await http.get(URI);
      dispatch(success_list_profiles(data.data));      
      return data;
    } catch (error) {
      dispatch(fail_list_profiles());
      return Promise.reject("Error");
    }
  };
};

export const get_dimensions = () => {
  return async (dispatch: any) => {
    dispatch(loading_list_dimensions());
    try {
      const URI = `/lists/dimensions`;
      const { data }: any = await http.get(URI);
      dispatch(success_list_dimensions(data.data));      
      return data;
    } catch (error) {
      dispatch(fail_list_dimensions());
      return Promise.reject("Error");
    }
  };
};

export const get_dependencies = () => {
  return async (dispatch: any) => {
    dispatch(loading_list_dependencies());
    try {
      const URI = `/lists/dependencies`;
      const { data }: any = await http.get(URI);
      dispatch(success_list_dependencies(data.data));      
      return data;
    } catch (error) {
      dispatch(fail_list_dependencies());
      return Promise.reject("Error");
    }
  };
};

export const get_communes = () => {
  return async (dispatch: any) => {
    dispatch(loading_list_communes());
    try {
      const URI = `/lists/communes`;
      const { data }: any = await http.get(URI);
      dispatch(success_list_communes(data.data));      
      return data;
    } catch (error) {
      dispatch(fail_list_communes());
      return Promise.reject("Error");
    }
  };
};

export const get_neighborhoods = (id: number) => {
  return async (dispatch: any) => {
    dispatch(loading_list_neighborhoods());
    try {
      const URI = `/lists/neighborhoods`;
      const { data }: any = await http.get(URI, {
        params: {
          commune: id
        }
      });
      dispatch(success_list_neighborhoods(data.data));      
      return data;
    } catch (error) {
      dispatch(fail_list_neighborhoods());
      return Promise.reject("Error");
    }
  };
};

