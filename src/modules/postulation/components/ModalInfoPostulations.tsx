import { Modal, Switch, Tabs } from 'antd';
import 'bootstrap';
import { FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableInfoPostulation from './TableInfoPostulation';
import TableDocsPostulation from './TableDocsPostulation';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import ComponetCard from '../../../utils/ui/Card';
import { IEvent } from '../../event/custom_types';
import DetailGeneralPostulation from './DetailGeneralPostulation';
import DetailGroupPostulation from './DetailGroupPostulation';
import { actions } from '../redux';
import { useNavigate } from 'react-router-dom';

interface ModalInfoPostulations {
    onSubmit: (values: any, form?: any) => any;
    id: number;
}

const ModalInfoPostulations: FC<ModalInfoPostulations> = ({ onSubmit, id }) => {
    const { TabPane } = Tabs;
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [revisate, setRevisate] = useState<boolean>(true);
    const [infoPost, setInfoPost] = useState<any>(null);
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [infoPostDis, setInfoPostDis] = useState<any>(null);
    const navigate = useNavigate();

    const disableButton = () => {
        setRevisate(!revisate);
    };
    const revisatePostulations = async () => {
        if (!revisate) {
            await dispatch(actions.get__RevisatePostulationInfoDetail(id, set_is_visible));
        }
    };

    const infoGroupPostulation = async () => {
        await dispatch(actions.get__postulationInfoDetail(id));
    };
    useEffect(() => {
        infoGroupPostulation();
    }, []);
    const event: IEvent = useSelector((store: any) => store.event.event.value);
    const dispatch = useDispatch<any>();
    const open = () => {
        set_is_visible(true);
        setInfoPost(id);
    };
    const close = () => set_is_visible(false);

    const edit = async (values: IEvent) => {
        await onSubmit(values);
        set_is_visible(false);
    };
    const validateButton = () => {
        setRevisate(true);
    };
    return (
        <>
            <div onClick={open} className="button-assign-rol">
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
                        onChange={() => {
                            validateButton();
                        }}
                        tabBarStyle={{ backgroundColor: '#1D98D1', color: 'white', fontWeight: 'bold', margin: 0 }}
                    >
                        <TabPane tab="Información postulación" key="item-1">
                            <div
                                style={{
                                    background: '#fff',
                                    padding: '20px',
                                    marginBottom: '10px',
                                    borderRadius: '0 0 10px 10px',
                                }}
                            >
                                <DetailGroupPostulation infoPost={infoPost} data={event} />
                            </div>
                            <ComponetCard title="Datos generales del equipo">
                                <DetailGeneralPostulation data={infoPost} />
                            </ComponetCard>
                        </TabPane>
                        <TabPane tab="Miembros del equipo" key="item-2">
                            <TableInfoPostulation infoPost={infoPost} />
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
                                <TableDocsPostulation idPos={id} title="Documentos técnicos" type="tecnic" />
                                <TableDocsPostulation idPos={id} title="Documentos administrativos" type="admin" />
                            </div>
                        </TabPane>
                    </Tabs>

                    <ComponetCard>
                        <div style={{ flexDirection: 'column', textAlign: 'end' }}>
                            <span className="State-postulation-info me-3">Estado de la postulación:</span>
                            <Switch checked={!revisate} onClick={disableButton} />
                            <span className="state-revisate-postulations-info me-3 ms-3">
                                {revisate ? 'sin revisar' : 'Revisado'}
                            </span>
                            <button
                                onClick={revisatePostulations}
                                key="saveDoc"
                                type="button"
                                className="btn btn-primary"
                                disabled={revisate ? true : false}
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
