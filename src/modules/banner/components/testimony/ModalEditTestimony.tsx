import { Modal } from "antd"
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { pencil } from "../../../../utils/assets/img";
import { ITestimony } from "../../custom_types";
import FormTestimony from "./FormTestimony";

interface ModalFormPros {
  onSubmit: (values:any, form?:any) => any;
  data: ITestimony;
}



const ModalEditTestimony: FC<ModalFormPros> = ({
  onSubmit,
  data,
}) => {
  const form_ref = useRef<FormikProps<FormikValues>>();
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);

  const edit = (values:ITestimony) => {
      onSubmit(values);
      set_is_visible(false)
  }
  return (
    <>
      <img
        src={pencil}
        style={{ cursor: "pointer" }}
        onClick={() => open()}
        className="img-fluid"
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
        <FormTestimony 
        onSubmit={edit}
        innerRef={form_ref}
        testimony={data}
        />
      </Modal>
    </>
  );
};

export default ModalEditTestimony