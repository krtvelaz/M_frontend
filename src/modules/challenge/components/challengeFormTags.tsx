import { Tabs } from "antd";
import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IChallenge } from "../custom_types";
import CreateGeneral from "./CreateGeneral";
import DocumentFormTags from "./documents/documentFormTags";

const ChallengeFormTags = () => {
  const { TabPane } = Tabs;

  let [
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
  ] = useInit();
  return (
    <>
      <div className="h-100 d-flex flex-column">
        <div className="flex-fill overflow-auto">
          <div className="d-flex flex-column h-100">
            <div className="bg-white d-flex flex-row pt-3 ps-4">
              <span
                style={{ fontSize: "14px", fontFamily: "Montserrat-SemiBold" }}
              >
                Crear nuevo reto
              </span>
            </div>
            <div className="">
              <Tabs
                className="w-100 h-100 "
                activeKey={active_key}
                onChange={callback}
              >
                <TabPane tab="Información general" key="1">
                  <CreateGeneral
                    general_information={challenge?.general_information}
                    innerRef={steps[0].ref}
                    onSubmit={steps[0].onSave}
                  />
                </TabPane>
                <TabPane tab="Documentos" key="2" disabled={max < 2}>
                  <DocumentFormTags
                    setChallenge={setChallenge}
                    challenge={challenge}
                    active_key={active_key_docs}
                    // documents={challenge?.documents}
                    // innerRef={steps[0].ref}
                    // onSubmit={steps[0].onSave}
                  />
                </TabPane>
                <TabPane tab="Informes" key="3" disabled></TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <div
          className="bg-white d-flex flex-row justify-content-between"
          style={{ padding: 16, marginBottom: 60, borderTop: "1px solid #ccc" }}
        >
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={goBack}
          >
            Atrás
          </button>
          <div className="flex-fill" />
          {show_next && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={next_tab}
            >
              Siguiente
            </button>
          )}
          {!show_next && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={execute_save}
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const useInit = (): [
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
  any
] => {
  const navigate = useNavigate();
  const location = useLocation();
  const active_key: any = location?.state?.active_key || "1";
  const active_key_docs: any = location?.state?.active_key_docs || "doc-1";
  const ls = location.state;
  const initial_values = {
    general_information: {
      challenge_name: "",
      profiles: "",
      dimension: "",
      dependence: "",
      start_date: "",
      closing_date: "",
      commune: "",
      neighborhood: "",
      main_image: "",
      economic_amount: "",
    },
    documents: {
      general: [],
    },
    reports: {
      report: "",
    },
  };
  const [challenge, setChallenge] = useState(initial_values);
  const [max, set_max] = useState<number>(location.state?.max || 1);
  const [is_saving, set_is_saving] = useState<boolean>(false);
  const [go_next, set_go_next] = useState<string>("");
  const [go_next_doc, set_go_next_doc] = useState<string>("");

  const steps = [
    {
      ref: useRef<FormikProps<FormikValues>>(),
      save: async () => {
        set_is_saving(true);
        await steps[0].ref.current?.submitForm();
      },
      onSave: async (values: any) => {
        set_is_saving(false);
        setChallenge((data: any) => ({
          ...data,
          general_information: {
            ...values.general_information,
          },
        }));
        console.log(1, "guardado");
      },
    },
    {
      ref: useRef<FormikProps<FormikValues>>(),
      save: async () => {
        if (challenge.documents.general.length > 0) {
          set_is_saving(false);
          return;
        }
        set_is_saving(true);
        await steps[1].ref.current?.submitForm();
      },
      onSave: async (values: any) => {
        setChallenge((data: any) => ({
          ...data,
          documents: {
            ...challenge?.documents,
            ...values,
          },
        }));
        console.log(2, "guardado");
        set_is_saving(false);
      },
    },
    {
      ref: useRef<FormikProps<FormikValues>>(),
      save: async (is_finish = false) => {
        console.log(6);
        set_is_saving(true);
        if (is_finish) {
          steps[5].ref.current?.setFieldValue("finish", true, false);
        }
        await steps[5].ref.current?.submitForm();
      },
      onSave: async (values: any) => {
        const new_data = {
          ...challenge,
          reports: {
            ...challenge.reports,
          },
        };
        console.log(new_data);
        setChallenge(new_data);
        console.log(6, "guardado");
        set_is_saving(false);
        if (values.finish) {
          console.log({ final_data: new_data });
        }
      },
    },
  ];
  const limit = 3;
  const show_next = parseInt(active_key) < limit;
  const next_tab = () => {    
    const key = parseInt(active_key);
    if (key === 2 && active_key_docs === "doc-1") {
      const next = key;
      const next_docs = "doc-2";
      if (next <= limit) {
        callback(`${next}`, next_docs);
      }
      return;
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
      callback(`${prev}`);
    }
  };

  const callback = (key: string, next_docs = "doc-1") => {
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
      // history.goBack();
    } else {
      prev_tab();
    }
  };

  const execute_save = async () => {
    await steps[limit - 1].save(true);
  };

  useEffect(() => {
    if (!is_saving && go_next ) {  
      console.log(go_next, go_next_doc);
          
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
      set_go_next_doc("")
      console.groupEnd();
    }
  }, [is_saving, go_next]);

 

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
  ];
};

export default ChallengeFormTags;
