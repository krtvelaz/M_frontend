import { useContext, useEffect, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { circuloTabs } from '../../../utils/assets/img';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { actions as actionsChallenge } from '../../challenge/redux';
import { useParams } from 'react-router-dom';
import { useCreatePostulation } from '../hooks/useCreatePostulation';
import FormArrayTeam from '../components/FormArrayTeam';
import { Buffer } from 'buffer';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import FormArrayDocuments from '../components/FormArrayDocuments';

const PostulationView = () => {
    const { id } = useParams<any>();
    const [imgPrincipal, setImgPrincipal] = useState<any>({});
    const context = useContext(TemplateContext);

    let [active_key, postulation, steps, max, show_next, next_tab, goBack, execute_save, callback, setPostulation] =
        useCreatePostulation('create', Number(id) || -1);

    const dispatch = useDispatch<any>();
    const { TabPane } = Tabs;

    const ListSextype = async () => {
        await dispatch(actions.get__listSexs());
        const _imgPrincipal = await dispatch(actionsChallenge.get_image_principal(Number(id)));
        setImgPrincipal(Buffer.from(_imgPrincipal).toString('base64'));
    };

    useEffect(() => {
        ListSextype();
    }, []);

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container-img-principal">
                <img
                    src={`data:image/jpeg;charset=utf-8;base64,${imgPrincipal}`}
                    alt="imagen"
                    className="w-100"
                    style={{ position: 'relative', top: `${context.device === 'lg' ? '-13%' : '0'}` }}
                />
            </div>
            <div className="container">
                <div
                    className="text-white"
                    style={{
                        position: 'relative',
                        ...(context.device === 'lg' && {
                            marginTop: '90px',
                            marginBottom: '90px',
                            marginLeft: '100px',
                        }),
                    }}
                >
                    <div>Postulación a:</div>
                    <div>¿Cómo mejorar la conectividad en los corregimientos de Medellín?</div>
                </div>
                <ComponetCard className={`${context.device !== 'sm' && 'px-5'}`}>
                    <div>
                        <div style={{ fontSize: '18px', margin: '0', fontFamily: 'Montserrat-Bold' }}>
                            ¡Genial! Estas a punto de postularte al reto
                        </div>
                        <div style={{ fontSize: '14px' }} className="mb-3">
                            Por favor completa los siguientes datos -
                            <span style={{ color: '#FF8403' }}> Todos los campos son obligatorios</span>
                        </div>
                    </div>
                    <Tabs activeKey={active_key} onChange={callback}>
                        <TabPane
                            tab={
                                <>
                                    <span style={{ paddingRight: '6%' }}>
                                        <img
                                            src={circuloTabs}
                                            style={{ width: '6.5%', backgroundColor: '#FF8403', borderRadius: '50%' }}
                                        />
                                    </span>

                                    <span style={{ position: 'absolute', left: '1.6%', top: '29%', color: 'white' }}>
                                        1
                                    </span>

                                    <span>Datos Postulante</span>
                                </>
                            }
                            key="1"
                        >
                            <FormPostulation
                                innerRef={steps[0].ref}
                                onSubmit={steps[0].onSave}
                                postulation={postulation?.applicant_data}
                                id_challenge={id || -1}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span style={{ paddingRight: '6%' }}>
                                        <img
                                            src={circuloTabs}
                                            style={{ width: '5.8%', backgroundColor: '#FF8403', borderRadius: '50%' }}
                                        />
                                    </span>
                                    <span style={{ position: 'absolute', left: '1.6%', top: '29%', color: 'white' }}>
                                        2
                                    </span>
                                    <span>Integrantes del equipo</span>
                                </>
                            }
                            key="2"
                        >
                            <FormArrayTeam
                                innerRef={steps[1].ref}
                                onSubmit={steps[1].onSave}
                                postulation={postulation.membersPostulations}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span style={{ paddingRight: '6%' }}>
                                        <img
                                            src={circuloTabs}
                                            style={{ width: '5.8%', backgroundColor: '#FF8403', borderRadius: '50%' }}
                                        />
                                    </span>

                                    <span style={{ position: 'absolute', left: '1.6%', top: '29%', color: 'white' }}>
                                        3
                                    </span>
                                    <span>Formatos que debes cargar</span>
                                </>
                            }
                            key="3"
                        >
                            <FormArrayDocuments
                                innerRef={steps[2].ref}
                                onSubmit={steps[2].onSave}
                                postulation={postulation}
                                setPostulation={setPostulation}
                                id_challenge={id || -1}
                            />
                        </TabPane>
                    </Tabs>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <button onClick={goBack} className="btn btn-outline-primary" type="button">
                                Ir atrás
                            </button>
                        </div>
                        {show_next && (
                            <button type="button" className="btn btn-landing-primary" onClick={next_tab}>
                                Continuar
                            </button>
                        )}

                        {!show_next && (
                            <button type="button" className="btn btn-primary" onClick={execute_save}>
                                Guardar
                            </button>
                        )}
                    </div>
                </ComponetCard>
            </div>
        </div>
    );
};

export default PostulationView;
