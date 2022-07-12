import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { pencil } from "../../../utils/assets/img";
import { IPublicationInfo } from "../custom_types";
import FormPublication from "./FormPublication";

interface ModalEditFormPros {
  gallery: IPublicationInfo;
  onSubmit: (values: IPublicationInfo) => any;
}

const ModalEditGallery: FC<ModalEditFormPros> = ({
    gallery,
  onSubmit,
}) => {
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const form_ref = useRef<FormikProps<FormikValues>>();
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);
  const edit = (values: any) => {
    onSubmit(values);
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
            Editar elemento galería
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
        <FormPublication publication={gallery} innerRef={form_ref} onSubmit={edit} type="gallery" />
      </Modal>
    </>
  );
};

export default ModalEditGallery;
