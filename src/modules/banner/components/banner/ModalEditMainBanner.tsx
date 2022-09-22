import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import PencilComponent from "../../../../utils/assets/img/PencilComponent";
import { IMainBanner } from "../../custom_types";
import FormMainBanner from "./FormMainBanner";

interface BannerFormPros {
  onSubmit: (values: any, form?: any) => any;
  value: any;
}

const ModalEditMainBanner: FC<BannerFormPros> = ({ onSubmit, value }) => {

  const form_ref = useRef<FormikProps<FormikValues>>();
  const loading: boolean = useSelector((store: any) => store.banner.banner.loading);
  const [visible, setvisible] = useState<boolean>(false);
  const open = () => setvisible(true);
  const close = () => setvisible(false);
  
  const editBanner = async (value: IMainBanner) => {
    await onSubmit(value);
    setvisible(false);

  };

  return (
    <>
      <PencilComponent on_click={() => {
          open();
        }} />
      <Modal
        visible={visible}
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
            disabled={loading}
          >
            Guardar Cambios
            {loading && (
              <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ fontSize: 12, marginLeft: 10, color: "#fff" }}
              />
            )}
          </button>,
        ]}
      >
        <FormMainBanner
          innerRef={form_ref}
          onSubmit={editBanner}
          banner={value}
          type='edit' />
      </Modal>
    </>
  );
};

export default ModalEditMainBanner;
