import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useRef, useState } from 'react'
import { IAddress } from '../../../modules/postulation/custom_types';
import FormLocation from './FormLocation';
interface IAddressFormPros {
  address?: IAddress;
  onSubmit: (values: IAddress) => any;
}
const LocationModal: FC<IAddressFormPros> = ({ address, onSubmit }) => {
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const form_ref = useRef<FormikProps<FormikValues>>();
  const open = () => set_is_visible(true);
  const close = () => set_is_visible(false);

  const editImage = (value: IAddress) => {
    onSubmit(value);
    set_is_visible(false);
    
  };
  return (
   <>
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
        >
          Guardar Cambios
        </button>,
      ]}
    >
      <FormLocation innerRef={form_ref} onSubmit={editImage} address={address} />
    </Modal>
  </>
  );
}

export default LocationModal