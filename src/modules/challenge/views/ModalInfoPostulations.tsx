import { Card, Modal,Switch,Tabs, } from 'antd';
import  'bootstrap';
import { Form, FormikProps, FormikValues, } from 'formik';
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pencil } from '../../../utils/assets/img';
import { IEvent } from '../../publication/custom_types';
import { actions } from '../../publication/redux';
import DetailPostulationEvent from '../../publication/components/event/DetailPostulationEvent';
import TableInfoPostulation from './TableInfoPostulation';
import TableDocsPostulation from './TableDocsPostulation';
import DetailDataPostulation from '../../publication/components/event/DetailDataPostulation';
import tabs from '../../../utils/assets/styles/tabs.scss'
import "../../../utils/assets/styles/ModalInfoPostulations.scss"

import ComponetCard from "../../../utils/ui/Card";

interface ModalInfoPostulations {
    onSubmit: (values: any, form?: any) => any;
    id: number;
}

const ModalInfoPostulations: FC<ModalInfoPostulations> = ({ onSubmit, id }) => {
  const { TabPane } = Tabs;
    const form_ref = useRef<FormikProps<FormikValues>>();
   
  const [revisate, setRevisate] = useState<boolean>(true)
  const revisatePostulations = ()=>{
    setRevisate(!revisate)
  }
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
        <a
          style={{ cursor: "pointer" }}
          onClick={async() => {            
           
            open();
          }}
          className="img-fluid"
        >ver más</a>
        <div>
        <Modal
          visible={is_visible}
          width={1000}
          onCancel={() => {
            close();
          }}
          title={
            <span style={{ fontFamily: "Montserrat-SemiBold", fontSize: "14px" }}>
            Detalle de la postulación
          </span>
          }
          bodyStyle={{padding:"0"}}
        maskStyle={{
            backgroundColor: "rgba(6, 100, 144 ,0.71)",
          }}
          footer={null}
          closable={false}
        >
        <Tabs 
        >
          <TabPane tab="Información postulación" key="item-1">
            <ComponetCard>
            <DetailPostulationEvent
            onSubmit={edit}
            innerRef={form_ref}
            event={event}
            type="edit"
            />
          <hr style={{color:"rgba(6, 100, 144 ,0.71)" }}/>
          </ComponetCard>
      
         <ComponetCard>
 
          <DetailDataPostulation
            onSubmit={edit}
            innerRef={form_ref}
            event={event}
            type="edit"
          />
         </ComponetCard>
                </TabPane>
                <TabPane tab="Miembros del equipo" key="item-2">
                    <TableInfoPostulation/>
                </TabPane>
                <TabPane tab="Documentos asociados" key="item-3">
                    <TableDocsPostulation/>
                </TabPane>
        </Tabs>
 
    <ComponetCard>
  <div 
      style={{    flexDirection: 
        "column",textAlign: "end",}}
  >
        <span className='State-postulation-info'>Estado de la postulación:</span>
        <Switch
        onClick={revisatePostulations}
        />
        < span className='state-revisate-postulations-info'>{
          revisate ? "sin revisar" : "Revisado"
        }</span>
          <button
              key="saveDoc"
              type="button"
              className="btn btn-primary"
              disabled={revisate ? true : false}
            >
              Guardar Cambios
              {form_ref.current?.isSubmitting && (
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
                />
              )}
          </button>,
  </div>
    </ComponetCard>
        </Modal>
        </div>
       
      </>
    )
}


export default ModalInfoPostulations