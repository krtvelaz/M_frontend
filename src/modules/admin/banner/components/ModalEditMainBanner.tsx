import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { pencil } from "../../../../utils/assets/img";
import { IMainBanner } from "../custom_types";
import FormMainBanner from "./FormMainBanner";

interface BannerFormPros {
  data_image?: IMainBanner;
  onSubmit: (values: IMainBanner) => any;
}

const ModalEditMainBanner: FC<BannerFormPros> = ({ data_image, onSubmit }) => {
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const form_ref = useRef<FormikProps<FormikValues>>();
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);

  const editImage = async (value: IMainBanner) => {
    await onSubmit(value);
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
        onCancel={() => {
          form_ref.current?.resetForm();
          close();
        }}
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
        <FormMainBanner innerRef={form_ref} onSubmit={editImage} data_image={data_image} type='edit' />
      </Modal>
    </>
  );
};

export default ModalEditMainBanner;
