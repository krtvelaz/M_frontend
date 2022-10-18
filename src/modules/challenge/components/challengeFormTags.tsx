import { Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralInformation } from '../custom_types';
import { useInit } from '../hooks/useInit';
import useDocument from '../hooks/useTypeDocs';
import { actions } from '../redux';
import AddReport from './reports/AddReport';
import CreateGeneral from './CreateGeneral';
import DocumentFormTags from './documents/DocumentFormTags';

interface ChallengeFormPros {
    challenge_data?: IGeneralInformation;
    type: 'create' | 'edit';
}

const ChallengeFormTags: FC<ChallengeFormPros> = ({ challenge_data, type }) => {
    const [typeDoc, setTypeDoc] = useState<'general' | 'admin' | 'technicians' | ''>('');
    const dispatch = useDispatch<any>();
    const { TabPane } = Tabs;
    let [
        active_key,
        active_key_docs,
        challenge,
        steps,
        max,
        show_next,
        next_tab,
        goBack,
        execute_save,
        callback,
        setChallenge,
        ref,
    ] = useInit(type, challenge_data);

    useEffect(() => {
        active_key === '2' &&
            (active_key_docs === 'docs-1'
                ? setTypeDoc('general')
                : active_key_docs === 'docs-2'
                ? setTypeDoc('technicians')
                : active_key_docs === 'docs-3' && setTypeDoc('admin'));
    }, [active_key_docs]);

    const { onAddDocument, onDelete, onEditDocument, setIsChange, isChange } = useDocument(
        typeDoc,
        setChallenge,
        challenge
    );

    const get_documents = async () => {
        typeDoc && (await dispatch(actions.get_list_document(typeDoc, challenge.general_information.key || -1, {})));
    };

    useEffect(() => {
        get_documents();
    }, [typeDoc]);

    useEffect(() => {
        if (isChange) {
            get_documents();
            setIsChange(false);
        }
    }, [isChange]);

    useEffect(() => {
        if (active_key === '1') {
            dispatch(actions.get_communes());
            dispatch(actions.get_dimensions());
            dispatch(actions.get_dependencies());
            dispatch(actions.get_profiles());
        }
    }, [active_key]);

    useEffect(() => {
        if (active_key === '2' && active_key_docs === 'docs-1') dispatch(actions.get_types_documents('general'));
    }, [active_key, active_key_docs]);

    const loading: boolean = useSelector((store: any) => store.challenge.challenge.loading);

    return (
        <>
            <div className="h-100 d-flex flex-column">
                <div className="flex-fill overflow-auto">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-white d-flex flex-row pt-3 ps-4">
                            <span style={{ fontSize: '14px', fontFamily: 'Montserrat-SemiBold' }}>
                                {type === 'edit' ? 'Editar reto' : 'Crear nuevo reto'}
                            </span>
                        </div>
                        <div className="challenge-tabs">
                            <Tabs
                                className="w-100 h-100 "
                                activeKey={active_key}
                                onChange={callback}
                                tabBarStyle={{
                                    background: '#fff',
                                    color: '#000000',
                                    paddingLeft: '20px',
                                    fontSize: '13px',
                                    marginBottom: 0,
                                }}
                            >
                                <TabPane tab="Información general" key="1" disabled>
                                    <CreateGeneral
                                        general_information={challenge?.general_information}
                                        innerRef={ref}
                                        onSubmit={steps[0].onSave}
                                        active_key={active_key}
                                    />
                                </TabPane>
                                <TabPane tab="Documentos" key="2" disabled>
                                    <DocumentFormTags
                                        onAddDocument={onAddDocument}
                                        onDelete={onDelete}
                                        onEditDocument={onEditDocument}
                                        typeDoc={typeDoc}
                                        challenge={challenge}
                                        active_key={active_key_docs}
                                    />
                                </TabPane>
                                <TabPane tab="Informes" key="3" disabled>
                                    <AddReport challenge={challenge} setChallenge={setChallenge} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white d-flex flex-row justify-content-between btn-responsive"
                    style={{ padding: 16, marginBottom: 60, borderTop: '1px solid #ccc' }}
                >
                    <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                        Atrás
                    </button>
                    <div className="flex-fill" />
                    {show_next && (
                        <button type="button" className="btn btn-primary" onClick={next_tab} disabled={loading}>
                            Siguiente
                            {loading && (
                                <i
                                    className="fa fa-circle-o-notch fa-spin"
                                    style={{ fontSize: 12, marginLeft: 10, color: '#fff' }}
                                />
                            )}
                        </button>
                    )}
                    {/* {(type === 'edit' && active_key === '1') && (
            <button
              type="button"
              className="btn btn-primary"
              // onClick={steps[0].save()}
              disabled={loading}
            >
              Guardar cambios
              {loading && (
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
                />
              )}
            </button>
          )} */}
                    {!show_next && (
                        <button type="button" className="btn btn-primary" onClick={execute_save}>
                            Finalizar reto
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChallengeFormTags;
