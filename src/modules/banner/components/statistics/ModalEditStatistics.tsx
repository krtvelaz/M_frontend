import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { useRef, useState } from "react";
import { pencil } from "../../../../utils/assets/img";
import FormIndicator from "./FormIndicator";

const ModalEditStatistics = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [visible, setvisible] = useState<boolean>(false);
  const open = () => setvisible(true);
  const close = () => setvisible(false);

  const editStatistics = () => {
    
  }
  
  return (
    <>
      <img
        src={pencil}
        style={{ cursor: "pointer" }}
        onClick={() => {
          open();
        }}
        className="img-pencil"
        alt="imagen editar"
      />
      <Modal
        visible={visible}
        width={1000}
        onCancel={() => {
          form_ref.current?.resetForm();
          close();
        }}
        title={
          <span style={{ fontFamily: "Montserrat-SemiBold", fontSize: "16px" }}>
            Editar estadística
          </span>
        }
        maskStyle={{
          backgroundColor: "rgba(6, 100, 144 ,0.71)",
        }}
        footer={[
          <button
            key="saveDoc"
            type="button"
            className="btn btn-primary"
            onClick={() => {
             form_ref.current?.submitForm();
            }}
            // disabled={loading}
          >
            Guardar Cambios
            {/* {loading && (
              <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
              />
            )} */}
          </button>,
        ]}
      >
       <FormIndicator innerRef={form_ref} onSubmit={editStatistics} />
      </Modal>
    </>
  )
}

export default ModalEditStatistics
