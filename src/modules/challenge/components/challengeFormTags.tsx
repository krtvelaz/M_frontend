import { Tabs } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IChallenge } from "../custom_types";
import { useInit } from "../hooks/useInit";
import CreateGeneral from "./CreateGeneral";
import AddDocument from "./documents/AddDocument";
import DocumentFormTags from "./documents/DocumentFormTags";

interface ChallengeFormPros {
  challenge_data?: IChallenge;
  type: "create" | "edit";
}

const ChallengeFormTags: FC<ChallengeFormPros> = ({ challenge_data, type }) => {
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
    ref,
  ] = useInit(type, challenge_data);
  return (
    <>
      <div className="h-100 d-flex flex-column">
        <div className="flex-fill overflow-auto">
          <div className="d-flex flex-column h-100">
            <div className="bg-white d-flex flex-row pt-3 ps-4">
              <span
                style={{ fontSize: "14px", fontFamily: "Montserrat-SemiBold" }}
              >
                {type === "edit" ? "Editar reto" : "Crear nuevo reto"}
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
                    innerRef={ref}
                    onSubmit={steps[0].onSave}
                  />
                </TabPane>
                <TabPane tab="Documentos" key="2" disabled={max < 2}>
                  <DocumentFormTags
                    setChallenge={setChallenge}
                    challenge={challenge}
                    active_key={active_key_docs}
                  />
                </TabPane>
                <TabPane tab="Informes" key="3" disabled>
                  <AddDocument
                    setChallenge={setChallenge}
                    challenge={challenge}
                    typeDoc="report"
                    title="Agregar informe"
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

export default ChallengeFormTags;
