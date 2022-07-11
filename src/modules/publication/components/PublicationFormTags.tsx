import { Tabs } from "antd";
import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPublication, IPublicationInfo } from "../custom_types";
import AddGallery from "./AddGallery";
import GeneralInformation from "./GeneralInformation";

const PublicationFormTags = () => {
  const { TabPane } = Tabs;
  let [
    active_key,
    publication,
    steps,
    max,
    show_next,
    next_tab,
    goBack,
    execute_save,
    callback,
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
                Nueva publicación
              </span>
            </div>
            <div className="">
              <Tabs
                activeKey='2'
                className="w-100 h-100"
                onChange={callback}
              >
                <TabPane tab="Información general" key="1">
                  <GeneralInformation
                    innerRef={steps[0].ref}
                    onSubmit={steps[0].onSave}
                  />
                </TabPane>
                <TabPane tab="Agregar Galería" key="2" disabled={max < 1}>
                  <AddGallery
                  onSubmit={steps[1].onSave}
                  images={ publication.gallery }
                  />
                </TabPane>
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

          <button
            type="button"
            className="btn btn-outline-primary me-3"
            onClick={next_tab}
          >
            Agregar Galería
          </button>
          {/* <button type="button" className="btn btn-primary" onClick={execute_save}>
            Publicar
          </button> */}
        </div>
      </div>
    </>
  );
};

const useInit = (): [
  string,
  any,
  any[],
  number,
  boolean,
  () => void,
  () => void,
  () => void,
  (key: string) => void,
] => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    active_key_docs: Location;
    active_key: Location;
    max: number;
  };
  const active_key: any = state?.active_key || "1";

  const initial_values: IPublication = {
    general_information: {
      title: "",
      description: "",
      image: "",
    },
    gallery: [],
  };

  const [publication, setPublication] = useState<IPublication>(initial_values);
  const [max, set_max] = useState<number>(state?.max || 1);
  const [is_saving, set_is_saving] = useState<boolean>(false);
  const [go_next, set_go_next] = useState<string>("");

  const steps = [
    {
      ref: useRef<FormikProps<FormikValues>>(),
      save: async () => {
          set_is_saving(true);          
          await steps[0].ref.current?.submitForm();
      },
      onSave: async (values: any) => {
        console.log(1, 'guardado');
          set_is_saving(false);
      },
  },
    {
      ref: useRef<FormikProps<FormikValues>>(),
      save: async (is_finish = false) => {
        set_is_saving(true);
        if (is_finish) {
          await steps[1].ref.current?.submitForm();
        }
      },
      onSave: async (values: IPublicationInfo) => {
        set_is_saving(false);
        setPublication({
          ...publication,
          gallery : [
            ...publication.gallery,
            values
          ]
        })
        
      },
    },
  ];
  const limit = 2;
  const show_next = parseInt(active_key) < limit;
  const next_tab = () => {
    const key = parseInt(active_key);
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

  const callback = (key: string) => {    
    const int_key = parseInt(active_key);
    const save = steps[int_key - 1]?.save;
    save &&
      save().then(() => {
        set_go_next(key);
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
    if (!is_saving && go_next) {
      const key = parseInt(go_next);
      if (key > max) {
        set_max(key);
      }
      navigate(location.pathname, {
        state: {
          active_key: go_next,
          publication,
          max,
        },
      });
      set_go_next("");
      console.groupEnd();
    }
  }, [is_saving, go_next]);

  return [
    active_key,
    publication,
    steps,
    max,
    show_next,
    next_tab,
    goBack,
    execute_save,
    callback,
  ];
};

export default PublicationFormTags;
