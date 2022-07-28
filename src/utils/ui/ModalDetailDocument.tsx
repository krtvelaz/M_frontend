import { Modal } from "antd";
import { FC } from "react";

interface DocumetFormProps {
  url: string;
  open: boolean;
  setOpen: any;
}

const ModalDetailDocument: FC<DocumetFormProps> = ({ url, open, setOpen }) => {
  const close = () => setOpen(false);
  return (
    <Modal
      visible={open}
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
        {url ? (
          <embed src={`${url}#toolbar=0`} width="100%" height="375px" />
        ) : (
          "No fue posible obtener el documento."
        )}
      </div>
    </Modal>
  );
};

export default ModalDetailDocument;
