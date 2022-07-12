import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { pencil } from "../../../../utils/assets/img";
import { IChallenge, IDocument } from "../../custom_types";
import FormAddDocument from "./FormAddDocument";

interface ModalPros {
  typeDoc?: "general" | "administrative" | "technicians" | "report";
  doc: IDocument;
  indexDoc: number;
  setChallenge: any;
  typesDocument: any[];
  editListDocs: (value: string) => void;
}
const ModalEditDocument: FC<ModalPros> = ({
  typeDoc,
  doc,
  indexDoc,
  setChallenge,
  typesDocument,
  editListDocs,
}) => {
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);
  const form_ref = useRef<FormikProps<FormikValues>>();

  const onEditDocument = (values: IDocument) => {
    setChallenge((data: IChallenge) => {
      if (typeDoc === "general") data.documents.general[indexDoc] = values;
      if (typeDoc === "technicians") data.documents.technical[indexDoc] = values;
      if (typeDoc === "administrative") data.documents.administrative[indexDoc] = values;
      if (typeDoc === "report") data.reports[indexDoc] = values;
      return {
        ...data,
      };
    });
    set_is_visible(false);
  };

  return (
    <>
      <img
        src={pencil}
        style={{ cursor: "pointer" }}
        onClick={() => open()}
        className="img-pencil"
        alt=""
      />
      <Modal
        visible={is_visible}
        width={1000}
        onCancel={close}
        title={
          <span style={{ fontFamily: "Montserrat-SemiBold", fontSize: "16px" }}>
            Editar documento
          </span>
        }
        maskStyle={{
          backgroundColor: "rgba(6, 100, 144 ,0.8)",
        }}
        footer={[
          <button
            key="saveDoc"
            type="button"
            className="btn btn-primary"
            onClick={() => {
              form_ref.current?.submitForm();
            }}
          >
            Guardar Cambios
          </button>,
        ]}
      >
        <FormAddDocument
          innerRef={form_ref}
          onSubmit={onEditDocument}
          typeDoc={typeDoc}
          doc={doc}
          typesDocument={typesDocument}
          editListDocs={editListDocs}
        />
      </Modal>
    </>
  );
};

export default ModalEditDocument;
