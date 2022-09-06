import { Modal } from "antd";
import { FormikProps, FormikValues } from "formik";
import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pencil } from "../../../utils/assets/img";
import { IMainBanner } from "../custom_types";
import { actions } from "../redux";
import FormMainBanner from "./FormMainBanner";

interface BannerFormPros {
  onSubmit: (values: any, form?: any) => any;
  id: number;
}

const ModalEditMainBanner: FC<BannerFormPros> = ({ onSubmit, id }) => {

  const form_ref = useRef<FormikProps<FormikValues>>();
  const loading: boolean = useSelector((store: any) => store.banner.banner.loading);
  const banner: IMainBanner = useSelector((store: any) => store.banner.banner.value);

  const dispatch = useDispatch<any>();
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);

  const editBanner = async (value: IMainBanner) => {
    await onSubmit(value);
    set_is_visible(false);

  };

  return (
    <>
      <img
        src={pencil}
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(actions.get_banner_by_id(id));
          open();
        }}
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
                style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
              />
            )}
          </button>,
        ]}
      >
        <FormMainBanner
          innerRef={form_ref}
          onSubmit={editBanner}
          banner={banner}
          type='edit' />
      </Modal>
    </>
  );
};

export default ModalEditMainBanner;
