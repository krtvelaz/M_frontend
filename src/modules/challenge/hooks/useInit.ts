import { FormikProps, FormikValues } from "formik";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IChallenge, IGeneralInformation } from "../custom_types";
import { actions } from "../redux";

export const useInit = (
  type: "create" | "edit",
  challenge_data?: IChallenge
): [
  string,
  string,
  IChallenge,
  any[],
  number,
  boolean,
  () => void,
  () => void,
  () => void,
  (key: string) => void,
  any,
  any
] => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const state = location.state as {
    active_key_docs: Location;
    active_key: Location;
    max: number;
    challenge?: IChallenge
  };
  const active_key: any = state?.active_key || "1";
  const active_key_docs: any = state?.active_key_docs || "docs-1";
  const ls = state;

  const initial_values: IChallenge = {
    general_information: {
      cha_name: "",
      cha_profile: null,
      cha_dimension: "",
      cha_dependence: "",
      cha_start_date: "",
      cha_end_date: "",
      cha_challenge_detail: "",
      cha_commune: "",
      cha_neighborhood: "",
      cha_population_detail: "",
      cha_principal_image: "",
      cha_principal_image_name: "",
      cha_video: "",
      cha_important_data: "",
      cha_expected_result: "",
      cha_economic_amount: "",
      cha_description: "",
      cha_impact_type: "",
    },
    documents: {
      general: [],
      technical: [],
      administrative: [],
    },
    reports: [],
  };

  const [challenge, setChallenge] = useState(ls.challenge ? ls.challenge : initial_values);
  const [max, set_max] = useState<number>(state?.max || 1);
  const [is_saving, set_is_saving] = useState<boolean>(false);
  const [go_next, set_go_next] = useState<string>("");
  const [go_next_doc, set_go_next_doc] = useState<string>("");
  const ref = useRef<FormikProps<FormikValues>>();

  const steps = [
    {
      save: async () => {
        set_is_saving(true);
        await ref.current?.submitForm();
      },
      onSave: async (values: IGeneralInformation) => {
        if (!challenge.general_information.key) {
          // crear el reto          
          // console.log("no hay key se debe crear");
          const res = await dispatch(actions.create_challenge(values));
          if (res) {
            set_is_saving(false);
            setChallenge((data: any) => ({
              ...data,
              general_information: {
                ...values,
                key: res.body.key,
              },
            }));
          }
        } else {
          // console.log("hay key se debe editar");
          set_is_saving(false);
          setChallenge((data: any) => ({
            ...data,
            general_information: {
              ...values,
            },
          }));

          // editar por id recibido
        }
      },
    },
    {
      save: async () => {
        if (challenge.documents.general.length > 0) {
          // no se que
          set_is_saving(false);
          return;
        }
        set_is_saving(true);
      },
    },
    {
      save: async (is_finish = false) => {
        set_is_saving(true);
        if (is_finish) {
          set_is_saving(false);
          // console.log({ final_data: challenge });
          //enviar data y redirigir
        }
      },
    },
  ];
  const limit = 3;
  const show_next = parseInt(active_key) < limit;
  const next_tab = () => {
    const key = parseInt(active_key);
    if (key === 2 && key <= limit) {
      if (active_key_docs === "docs-1") {
        callback(`${key}`, "docs-2");
        return;
      }
      if (active_key_docs === "docs-2") {
        callback(`${key}`, "docs-3");
        return;
      }
    }
    const next = key + 1;
    if (next <= limit) {
      callback(`${next}`);
    }
  };
  const prev_tab = () => {
    const key = parseInt(active_key);
    const prev = key - 1;
    if (prev > 0) {
      if (key === 3) {
        callback(`${prev}`, "docs-3");
        return;
      }
      if (key === 2) {
        if (active_key_docs === "docs-3") {
          callback(`${key}`, "docs-2");
          return;
        }
        if (active_key_docs === "docs-2") {
          callback(`${key}`, "docs-1");
          return;
        }
      }
      callback(`${prev}`);
    }
  };

  const callback = (key: string, next_docs = "docs-1") => {
    const int_key = parseInt(active_key);
    const save = steps[int_key - 1]?.save;
    save &&
      save().then(() => {
        set_go_next(key);
        set_go_next_doc(next_docs);
      });
  };

  const goBack = () => {
    if (active_key === "1") {
      navigate("challenge/list");
    } else {
      prev_tab();
    }
  };

  const execute_save = async () => {
    await steps[limit - 1].save(true);
  };

  useEffect(() => {
    if (challenge_data) setChallenge(challenge_data);
  }, [challenge_data]);

  useEffect(() => {
    if (!is_saving && go_next) {
      const key = parseInt(go_next);
      if (key > max) {
        set_max(key);
      }
      navigate(location.pathname, {
        state: {
          active_key: go_next,
          active_key_docs: go_next_doc,
          challenge,
          max,
        },
      });
      set_go_next("");
      set_go_next_doc("");
      console.groupEnd();
    }
  }, [is_saving, go_next, go_next_doc]);

  return [
    active_key,
    active_key_docs,
    challenge,
    steps,
    max,
    show_next,
    next_tab,
    goBack,
    execute_save,
    callback,
    setChallenge,
    ref,
  ];
};
