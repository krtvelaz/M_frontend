import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { pencil } from "../../../../../utils/assets/img";
import { Informe } from "../../custom_types";
import FormReport from "./FormReport";

interface ModalPros {
    report: Informe;
    onEdit: (values: Informe) => void;
  }

const ModalEditReport: FC<ModalPros> = ({ onEdit, report}) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);
  const form_ref = useRef<FormikProps<FormikValues>>();  

  const onEditDocument = async (values: Informe) => {
    await onEdit(values);
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
       <FormReport innerRef={form_ref} onSubmit={onEditDocument} report={report}/>
      </Modal>
    </>
  )
}

export default ModalEditReport
