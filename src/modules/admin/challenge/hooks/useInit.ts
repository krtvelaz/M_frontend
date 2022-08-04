import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { swal_error } from "../../../../utils/ui";
import { swal_success } from "../../../../utils/ui/swalAlert";
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
  const documents: any = useSelector(
    (store: any) => store.challenge.documents_challenge.value
  );
  const state = location.state as {
    active_key_docs: Location;
    active_key: Location;
    max: number;
    challenge?: IChallenge;
  };
  const active_key: any = state?.active_key || "1";
  const active_key_docs: any = state?.active_key_docs || "docs-1";
  const ls = state;

  const initial_values: IChallenge = {
    general_information: {
      ret_nombre: "",
      ret_perfil: [],
      ret_dimension: "",
      ret_dependencia: "",
      ret_fecha_inicio: "",
      ret_fecha_final: "",
      ret_detalles: "",
      ret_comuna: "",
      ret_barrio: "",
      ret_detalle_postulacion: "",
      ret_ruta_imagen_principal: "",
      ret_nombre_imagen: "",
      ret_video: "",
      ret_dato_importante: "",
      ret_resultado_esperado: "",
      ret_monto: "",
      ret_descripcion: "",
      ret_tipo_impacto: "",
    },
    documents: {
      general: [],
      technical: [],
      administrative: [],
    },
    reports: [],
  };

  const [challenge, setChallenge] = useState(
    ls?.challenge ? ls.challenge : initial_values
  );
  const [max, set_max] = useState<number>(state?.max || 1);
  const [is_saving, set_is_saving] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
          setIsSubmitting(true);
          const res = await dispatch(actions.create_challenge(values));

          if (res) {
            set_is_saving(false);
            setChallenge((data: any) => ({
              ...data,
              general_information: {
                ...res.data,
                ret_perfil: res.data.ret_perfil.map((doc: any) => doc.id),
                key: res.key,
              },
            }));
          }
          setIsSubmitting(false);
        } else {
          // const res = await dispatch(actions.update_challenge(values));
          set_is_saving(false);
          // setChallenge((data: any) => ({
          //   ...data,
          //   general_information: {
          //     ...values,
          //   },
          // }));
        }
      },
    },
    {
      save: async () => {
        if (documents.length > 0 && active_key_docs === "docs-1") {
          setChallenge((data: IChallenge) => ({
            ...data,
            documents: {
              ...data.documents,
              general: documents,
            },
          }));
          await swal_success.fire({
            title: "Proceso exitoso",
            html:
              `<div class="mysubtitle">Se han guardado los documentos generales</div>` +
              '<div class="mytext">De click en aceptar para continuar</div>',
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
          set_is_saving(false);
          return;
        }
        if (documents.length > 0 && active_key_docs === "docs-2") {
          setChallenge((data: IChallenge) => ({
            ...data,
            documents: {
              ...data.documents,
              technical: documents,
            },
          }));
          await swal_success.fire({
            title: "Proceso exitoso",
            html:
              `<div class="mysubtitle">Se han guardado los documentos técnicos</div>` +
              '<div class="mytext">De click en aceptar para continuar</div>',
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
          set_is_saving(false);
          return;
        }
        if (documents.length > 0 && active_key_docs === "docs-3") {
          setChallenge((data: IChallenge) => ({
            ...data,
            documents: {
              ...data.documents,
              administrative: documents,
            },
          }));
          await swal_success.fire({
            title: "Proceso exitoso",
            html:
              `<div class="mysubtitle">Se han guardado los documentos administrativos</div>` +
              '<div class="mytext">De click en aceptar para continuar</div>',
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
          set_is_saving(false);
          return;
        }
        await swal_error.fire({
          title: "Error en el proceso",
          html:
            '<div class="mysubtitle">Debe agregar por lo menos un documento.</div>' +
            '<div class="mytext">De click en aceptar para continuar.</div>',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        });
        set_is_saving(true);
      },
    },
    {
      save: async (is_finish = false) => {
        set_is_saving(true);
        if (is_finish) {
          set_is_saving(false);
          //publicar reto
          await swal_success.fire({
            title: "Proceso exitoso",
            html:
              `<div class="mysubtitle">Se ha creado con éxito el nuevo reto</div>` +
              '<div class="mytext">A continuación serás dirigido a gestor de retos</div>',
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
          navigate("../challenge/list", { replace: true });
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
        callback(`${prev}`, "docs-3", true);
        return;
      }
      if (key === 2) {
        if (active_key_docs === "docs-3") {
          callback(`${key}`, "docs-2", true);
          return;
        }
        if (active_key_docs === "docs-2") {
          callback(`${key}`, "docs-1", true);
          return;
        }
      }
      callback(`${prev}`, "", true);
    }
  };

  const callback = (key: string, next_docs = "docs-1", prev = false) => {
    const int_key = parseInt(active_key);
    const save = steps[int_key - 1]?.save;
    if (prev) {
      set_is_saving(false);
      set_go_next(key);
      set_go_next_doc(next_docs);
      return;
    }
    save &&
      save().then(() => {
        set_go_next(key);
        set_go_next_doc(next_docs);
      });
  };

  const goBack = () => {
    if (active_key === "1") {
      navigate("../challenge/list", { replace: true });
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
    isSubmitting,
    next_tab,
    goBack,
    execute_save,
    callback,
    setChallenge,
    ref,
  ];
};
