import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import React, { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pencil } from '../../../../../utils/assets/img';
import { IEvent } from '../../custom_types';
import { actions } from '../../redux';
import FormEvent from './FormEvent';

interface ModalFormPros {
    onSubmit: (values: any, form?: any) => any;
    id: number;
}
const ModalEditEvent: FC<ModalFormPros> = ({ onSubmit, id }) => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const event: IEvent = useSelector(
      (store: any) => store.event.event.value
    );
    const dispatch = useDispatch<any>();
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);

    const edit = async (values: IEvent) => {
        await onSubmit(values);
        set_is_visible(false);
      };
      
    return (
        <>
        <img
          src={pencil}
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(actions.get_event_by_id(id));
            open();
          }}
          className="img-fluid"
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
              Editar documento
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
              disabled={form_ref.current?.isSubmitting}
            >
              Guardar Cambios
              {form_ref.current?.isSubmitting && (
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
                />
              )}
            </button>,
          ]}
        >
          <FormEvent
            onSubmit={edit}
            innerRef={form_ref}
            event={event}
            type="edit"
          />
        </Modal>
      </>
    )
}

export default ModalEditEvent