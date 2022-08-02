import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IChallenge } from "../custom_types";
import { useInit } from "../hooks/useInit";
import useDocument from "../hooks/useTypeDocs";
import { actions } from "../redux";
import AddReport from "./reports/AddReport";
import CreateGeneral from "./CreateGeneral";
import DocumentFormTags from "./documents/DocumentFormTags";

interface ChallengeFormPros {
  challenge_data?: IChallenge;
  type: "create" | "edit";
}

const ChallengeFormTags: FC<ChallengeFormPros> = ({ challenge_data, type }) => {
  const [typeDoc, setTypeDoc] = useState<"general" | "admin" | "technicians">(
    "general"
  );
  const dispatch = useDispatch<any>();
  const { TabPane } = Tabs;
  let [
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
  ] = useInit(type, challenge_data);

  useEffect(() => {
    active_key_docs === "docs-1" && active_key !== "3"
      ? setTypeDoc("general")
      : active_key_docs === "docs-2"
      ? setTypeDoc("technicians")
      : setTypeDoc("admin");
  }, [active_key_docs]);

  const {
    typesDocument,
    onAddDocument,
    onDelete,
    onEditDocument,
    editListDocs,
    setIsChange,
    isChange,
    getTypesDocuments,
  } = useDocument(typeDoc, setChallenge, challenge);

  const get_documents = async () => {
    await dispatch(
      actions.get_list_document(
        typeDoc,
        challenge.general_information.key || -1,
        {}
      )
    );
  };

  useEffect(() => {
    getTypesDocuments();
    get_documents();
  }, [typeDoc]);

  useEffect(() => {
    if (isChange) {
      get_documents();
      setIsChange(false);
    }
  }, [isChange]);

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
                    typesDocument={typesDocument}
                    onAddDocument={onAddDocument}
                    onDelete={onDelete}
                    onEditDocument={onEditDocument}
                    editListDocs={editListDocs}
                    typeDoc={typeDoc}
                    challenge={challenge}
                    active_key={active_key_docs}
                  />
                </TabPane>
                <TabPane tab="Informes" key="3" disabled={max < 3}>
                  <AddReport
                    challenge={challenge}
                    setChallenge={setChallenge}
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
              disabled={isSubmitting}
            >
              Siguiente
              {isSubmitting && (
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
                />
              )}
            </button>
          )}
          {!show_next && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={execute_save}
            >
              Publicar reto
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChallengeFormTags;