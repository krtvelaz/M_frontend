import { http } from "../../../config/axios_instances";
import { swal_success } from "../../../utils/ui/swalAlert";
import { IDocument, IDocuments, IGeneralInformation } from "../custom_types";
import {
  fail_challenge,
  fail_document_challenge,
  fail_get_list_documents,
  get_challenge,
  loading_challenge,
  loading_document_challenge,
  loading_get_list_documents,
  success_get_list_documents,
} from "./slice";

const get_challenge_by_id = (id: any) => {
  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/pokemon?limit=10&offset=0";
      const res = await http.get(URI);
      dispatch(get_challenge(res.data));
      return res.data;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

const create_challenge = (values: IGeneralInformation) => {
  const data = {
    action: "insert",
    info: {
      id: -1,
      key: -1,
    },
    data: {
      ...values,
      cha_document_number: "123456",
      cha_profile: {
        data: values.cha_profile,
      },
      cha_principal_image: null,
      cha_principal_image_name: "",
      cha_economic_amount: values.cha_economic_amount || 0,
    },
  };
  

  return async (dispatch: any) => {
    dispatch(loading_challenge());
    try {
      const URI = "/information/general";
      const res: any = await http.post(URI, data);
      
      // dispatch(get_challenge(res.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.messega}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data;
    } catch (error) {
      dispatch(fail_challenge());
      return Promise.reject("Error");
    }
  };
};

const create_challenge_document = (
  values: IDocument,
  key: number,
  type: string
) => {
  const data = {
    action: "insert",
    info: {
      id: -1,
      key: key,
    },
    data: {
      cha_document_type: values.cha_document_type || 0,
      cha_document_name: values.cha_document_name,
      cha_profile: values.cha_profile,
      cha_template_path: values.cha_template_path,
      cha_template_name: values.cha_document_name,
    },
  };


  return async (dispatch: any) => {
    dispatch(loading_document_challenge());
    try {
      const URI =
        type === "general"
          ? "/general/document"
          : type === "technicians"
          ? "/technical/document"
          : type === "administrative"
          ? "/administrative/document"
          : "/report/document";
      const res: any = await http.post(URI, data);

      // dispatch(get_document_challenge(res.data));
      await swal_success.fire({
        title: "Proceso exitoso",
        html:
          `<div class="mysubtitle">${res.data.messega}</div>` +
          '<div class="mytext">De click en aceptar para continuar</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });

      return res.data;
    } catch (error) {
      dispatch(fail_document_challenge());
      return Promise.reject("Error");
    }
  };
};

const get_list_document = (type: string, { page = 1, pageSize = 10 }) => {
  return async (dispatch: any) => {
    dispatch(loading_get_list_documents());
    try {
      const URI =
        type === "general"
          ? `/general/list/${page}/${pageSize}`
          : type === "technicians"
          ? "/technical/list"
          : type === "administrative"
          ? "/administrative/list"
          : "/report/list";
      const { data }: any = await http.get(URI);      
      dispatch(success_get_list_documents(data.body.data));
      return data.body.data;
    } catch (error) {
      dispatch(fail_get_list_documents());
      return Promise.reject("Error");
    }
  };
};

const actions = {
  create_challenge,
  create_challenge_document,
  get_challenge_by_id,
  get_list_document,
};

export default actions;
