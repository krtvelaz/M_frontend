import { http } from "../../../config/axios_instances";
import { fail_challenge, get_challenge, loading_challenge } from "./slice";

const get_challenge_by_id = (id: any) => {
  return async ( dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = '/pokemon?limit=10&offset=0';
      const res = await http.get(URI);
      dispatch(get_challenge(res.data));
      return res.data;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject('Error');
    }
  }
};



const actions = {
  get_challenge_by_id,
};

export default actions;
