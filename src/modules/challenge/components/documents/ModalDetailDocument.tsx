import { Modal } from "antd";
import { FC, useState } from "react";
import { watch } from "../../../../utils/assets/img";

interface DocumetFormProps {
  document: File;
}

const ModalDetailDocument: FC<DocumetFormProps> = ({ document }) => {
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);
  const url = window.URL.createObjectURL(document);
  return (
    <>
      <img
        src={watch}
        className="img-fluid"
        alt=""
        style={{ cursor: "pointer" }}
        onClick={() => open()}
      />
      <Modal
        visible={is_visible}
        width={751}
        onCancel={close}
        title={
          <span style={{ fontFamily: "Montserrat-SemiBold", fontSize: "16px" }}>
            Previsualizar documento
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
              close();
            }}
          >
            Aceptar
          </button>,
        ]}
      >
        <div>
          <embed src={`${url}#toolbar=0`} width="100%" height="375px" />
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailDocument;
