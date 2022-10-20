import { Modal, Switch, Tabs } from 'antd';
import 'bootstrap';
import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableInfoPostulation from './TableInfoPostulation';
import TableDocsPostulation from './TableDocsPostulation';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import ComponetCard from '../../../utils/ui/Card';
import DetailGeneralPostulation from './DetailGeneralPostulation';
import DetailGroupPostulation from './DetailGroupPostulation';
import { actions } from '../redux';

interface ModalInfoPostulations {
    onSubmit: (values: any, form?: any) => any;
    id: number;
    state?: string;
}

const ModalInfoPostulations: FC<ModalInfoPostulations> = ({ onSubmit, id, state }) => {
    
    const dispatch = useDispatch<any>();
    const form_ref = useRef<any>();
    const [revisate, setRevisate] = useState<boolean>(false);
    const [is_visible, set_is_visible] = useState<boolean>(false);

    const { TabPane } = Tabs;

    const disableButton = () => {
        setRevisate(!revisate);
    };

    const revisatePostulations = async () => {
        await dispatch(actions.get__RevisatePostulationInfoDetail(id, set_is_visible));
    };

    const open = async () =>  {
        await dispatch(actions.get__postulationInfoDetail(id));
        set_is_visible(true);

    }
    const close = () => set_is_visible(false);

  
    return (
        <>
            <div
                style={state === 'SIN FINALIZAR' ? { color: '#F2F2F2' } : {}}
                onClick={open}
                className="button-assign-rol"
            >
                ver detalles
            </div>

            <div>
                <Modal
                    className="modal-roles"
                    visible={is_visible}
                    width="1069px"
                    onCancel={() => {
                        close();
                    }}
                    title={
                        <span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}>
                            Detalle de la postulación
                        </span>
                    }
                    bodyStyle={{ padding: '0' }}
                    maskStyle={{
                        backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                    }}
                    footer={null}
                >
                    <Tabs
                        tabBarStyle={{
                            backgroundColor: '#1D98D1',
                            color: 'white',
                            fontWeight: 'bold',
                            margin: 0,
                            paddingLeft: '20px',
                        }}
                        className='tab-postulation'
                    >
                        <TabPane tab="Información postulación" key="item-1">
                            <div
                                style={{
                                    background: '#fff',
                                    padding: '20px 20px 8px 20px',
                                    marginBottom: '10px',
                                    borderRadius: '0 0 10px 10px',
                                }}
                            >
                                <DetailGroupPostulation />
                            </div>
                            <ComponetCard title={
                                <div style={{fontFamily: 'Montserrat-SemiBold', fontSize: '14px', color: '#000'}}>Datos generales del equipo</div>
                            }>
                                <DetailGeneralPostulation />
                            </ComponetCard>
                        </TabPane>
                        <TabPane tab="Miembros del equipo" key="item-2">
                            <TableInfoPostulation  />
                        </TabPane>
                        <TabPane tab="Documentos asociados" key="item-3">
                            <div
                                style={{
                                    background: '#fff',
                                    padding: '20px',
                                    marginBottom: '10px',
                                    borderRadius: '0 0 10px 10px',
                                }}
                            >
                                <TableDocsPostulation title="Documentos técnicos" type="tecnic" />
                                <TableDocsPostulation title="Documentos administrativos" type="admin" />
                            </div>
                        </TabPane>
                    </Tabs>

                    <ComponetCard>
                        <div style={{ flexDirection: 'column', textAlign: 'end' }}>
                            <span className="State-postulation-info me-3">Estado de la postulación:</span>
                            <Switch onClick={disableButton} />
                            <span className="state-revisate-postulations-info me-3 ms-3">
                                {revisate ? 'Revisado' : 'sin revisar'}
                            </span>
                            <button
                                onClick={revisatePostulations}
                                key="saveDoc"
                                type="button"
                                className="btn btn-primary"
                                disabled={revisate ? false : true}
                            >
                                Guardar Cambios
                                {form_ref.current?.isSubmitting && (
                                    <i
                                        className="fa fa-circle-o-notch fa-spin"
                                        style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                    />
                                )}
                            </button>
                        </div>
                    </ComponetCard>
                </Modal>
            </div>
        </>
    );
};

export default ModalInfoPostulations;
