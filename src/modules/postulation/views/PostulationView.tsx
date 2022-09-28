import { useEffect } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { DocsPostulation } from '../components/DocsPostulation';
import { circuloTabs } from '../../../utils/assets/img';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import { useCreatePostulation } from '../hooks/useCreatePostulation';
import FormArrayTeam from '../components/FormArrayTeam';

const PostulationView = () => {
    const { id } = useParams<any>();

    let [
        active_key,
        postulation,
        steps,
        max,
        show_next,
        next_tab,
        goBack,
        execute_save,
        callback,
        setPostulation,
        ref,
    ] = useCreatePostulation('create');

    const dispatch = useDispatch<any>();
    const { TabPane } = Tabs;

    const ListSextype = async () => {
        await dispatch(actions.get__listSexs());
    };

    useEffect(() => {
        ListSextype();
    }, []);

    return (
        <div className="container">
            <ComponetCard style={{ padding: '24px 60px' }}>
                <div>
                    <h5 style={{ fontSize: '18px', margin: '0' }}>
                        ¡Ya casi terminamos! Carga los siguientes formatos
                    </h5>
                    <span style={{ fontWeight: 'bold' }}>
                        Debes descargar los formatos, completarlos y posteriormente cargar para su envío.-{' '}
                        <span style={{ color: '#FF8403' }}>Todos los campos son obligatorios</span>
                    </span>
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
                            innerRef={ref}
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
                            innerRef={ref}
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
                        <DocsPostulation id_challenge={id || -1} type_person={postulation.applicant_data.type_profiles} />
                    </TabPane>
                </Tabs>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button onClick={goBack} className="btn btn-outline-primary" type="button">
                            Ir atrás
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={next_tab}>
                        Continuar
                    </button>
                </div>
            </ComponetCard>
        </div>
    );
};

export default PostulationView;
