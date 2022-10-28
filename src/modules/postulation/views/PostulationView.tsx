import { useContext, useEffect, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { circuloTabs, invalidateImg } from '../../../utils/assets/img';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { actions as actionsChallenge } from '../../challenge/redux';
import { useLocation, useParams } from 'react-router-dom';
import { useCreatePostulation } from '../hooks/useCreatePostulation';
import FormArrayTeam from '../components/FormArrayTeam';
import { Buffer } from 'buffer';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import FormArrayDocuments from '../components/FormArrayDocuments';

const PostulationView = () => {
    const { id } = useParams<any>();
    const [imgPrincipal, setImgPrincipal] = useState<any>(null);
    const location = useLocation();
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
                {imgPrincipal ? (
                    <img
                        src={`data:image/jpeg;charset=utf-8;base64,${imgPrincipal}`}
                        alt="imagen"
                        className="w-100"
                        style={{ position: 'relative', top: `${context.device === 'lg' ? '-13%' : '0'}` }}
                    />
                ) : (
                    <div
                        className="p-4"
                        style={{
                            height: '100%',
                            backgroundColor: '#1D98D1',
                        }}
                    >
                        <div className="row mt-5 text-center">
                            <div className="col-12 col-lg-6"></div>
                            <div className="col-12 col-lg-6">
                                <img src={invalidateImg} alt="" />
                                <div className="mt-3 text-white text-center">
                                    Lo sentimos actualmente no se puede visualizar la imagen, inténtalo más tarde.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container">
                <div
                    className="text-white"
                    style={{
                        position: 'relative',

                        ...(context.device === 'lg'
                            ? {
                                  marginTop: '90px',
                                  marginBottom: '90px',
                                  marginLeft: '70px',
                              }
                            : {
                                  margin: '170px 0 10px 0',
                              }),
                    }}
                >
                    <div style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Postulación a:</div>
                    <div
                        style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: '16px',
                            ...(context.device === 'lg' && { width: '500px' }),
                        }}
                    >
                        {location?.state?.challenge?.cha_name}
                    </div>
                </div>
                <ComponetCard className={`${context.device !== 'sm' && 'px-5'}`}>
                    <div>
                        <div style={{ fontSize: '18px', margin: '0', fontFamily: 'Montserrat-Bold' }}>
                            {active_key === '1'
                                ? '¡Genial! Estas a punto de postularte al reto'
                                : active_key === '2'
                                ? 'Cuentanos quiénes conforman el equipo'
                                : '¡Ya casi terminamos! Carga los siguientes formatos'}
                        </div>
                        <div style={{ fontSize: '14px', fontFamily: 'Montserrat-SemiBold' }} className="mb-3">
                            {active_key === '1'
                                ? 'Por favor completa los siguientes datos -'
                                : active_key === '2'
                                ? 'Mínimo dos participantes y máximo cinco participantes -'
                                : 'Debes descargar los formatos, completarlos y posteriormente cargar para su envío. -'}

                            <span style={{ color: '#FF8403' }}> Todos los campos son obligatorios</span>
                        </div>
                    </div>
                    <Tabs className="tab-postulation-register" activeKey={active_key} onChange={callback}>
                        <TabPane
                            tab={
                                <>
                                    <span style={{ position: 'relative' }}>
                                        <img
                                            src={circuloTabs}
                                            style={{
                                                width: '22px',
                                                backgroundColor: '#FF8403',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: '30%',
                                                top: '-15%',
                                                color: 'white',
                                                fontSize: '14px',
                                            }}
                                        >
                                            1
                                        </span>
                                    </span>
                                    <span className="ms-3 me-3" style={{ fontSize: '14px' }}>
                                        Datos Postulante
                                    </span>
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
                                <div style={{ paddingLeft: '40px' }}>
                                    <span style={{ position: 'relative' }}>
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '-250%',
                                                width: '60px',
                                                borderTop: `0.5px solid ${max < 2 ? '#DDDDDD' : '#FF8403'} `,
                                            }}
                                        ></span>
                                        <img
                                            src={circuloTabs}
                                            style={{
                                                width: '22px',
                                                backgroundColor: `${max < 2 ? '#DDDDDD' : '#FF8403'}`,
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: '30%',
                                                top: '-15%',
                                                color: 'white',
                                                fontSize: '14px',
                                            }}
                                        >
                                            2
                                        </span>
                                    </span>
                                    <span className="ms-3 me-3" style={{ fontSize: '14px' }}>
                                        Integrantes del equipo
                                    </span>
                                </div>
                            }
                            key="2"
                            disabled={max < 2}
                        >
                            <FormArrayTeam
                                innerRef={steps[1].ref}
                                onSubmit={steps[1].onSave}
                                postulation={postulation.membersPostulations}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <div style={{ paddingLeft: '40px' }}>
                                    <span style={{ position: 'relative' }}>
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '-250%',
                                                width: '60px',
                                                borderTop: `0.5px solid ${max < 3 ? '#DDDDDD' : '#FF8403'} `,
                                            }}
                                        ></span>
                                        <img
                                            src={circuloTabs}
                                            style={{
                                                width: '22px',
                                                backgroundColor: `${max < 3 ? '#DDDDDD' : '#FF8403'}`,
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: '30%',
                                                top: '-15%',
                                                color: 'white',
                                                fontSize: '14px',
                                            }}
                                        >
                                            3
                                        </span>
                                    </span>
                                    <span className="ms-3" style={{ fontSize: '14px' }}>
                                        Formatos que debes cargar
                                    </span>
                                </div>
                            }
                            key="3"
                            disabled={max < 3}
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
