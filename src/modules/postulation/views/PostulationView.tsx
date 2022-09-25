import { FieldArray, Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import ComponetCard from '../../../utils/ui/Card';
import { Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import FormTeam from '../components/FormTeam';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { DocsPostulation } from '../components/DocsPostulation';
import { circuloTabs } from '../../../utils/assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useInit } from '../../challenge/hooks/useInit';

const PostulationView = () => {
    const [buttonVisible, setButtonVisible] = useState<boolean>(true);
    const [disblaTabsPos, setDisblaTabsPos] = useState<boolean>(true);
    const [disblaTabsPosDocument, setDisblaTabsPosDocument] = useState<boolean>(true);
    const [eventButonDisable, setEventButonDisable] = useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const { TabPane } = Tabs;

    const ListSextype = async () => {
        await dispatch(actions.get__listSexs());
    };

    const submit = async (values: any) => {
        const membersSend = values.membersPostulations.map((member: any) => {
            return {
                ...member,
                gruint_victim: member.gruint_victim === 'si' ? true : false,
                gruint_disability: member.gruint_disability === 'si' ? true : false,
            };
        });
        await dispatch(
            actions.create_memberPostulation({
                members: membersSend,
            })
        );
        setDisblaTabsPosDocument(false);
    };
    const buttonBack = (e: any) => {
        if (e === 'item-1.2' || e === 'item-1.3') {
            setEventButonDisable(true);
        } else {
            setEventButonDisable(false);
        }
    };

    const initial_values = {
        membersPostulations: [],
    };

    function onChangeTickets(values: any, setValues: any) {
        if (values.membersPostulations.length <= 4) {
            const membersPostulations = [...values.membersPostulations];
            membersPostulations.push({
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            });
            setValues({ ...values, membersPostulations });
            values.membersPostulations.length === 4 && setButtonVisible(false);
        }
    }

    useEffect(() => {
        ListSextype();
    }, []);

    const schema = Yup.object().shape({
        membersPostulations: Yup.array().of(
            Yup.object().shape({
                gruint_names: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
                gruint_type_document: Yup.string().nullable().required('Campo obligatorio'),
                gruint_document: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
                gruint_sex: Yup.string().nullable().required('Campo obligatorio'),
                gruint_identity: Yup.string().nullable().required('Campo obligatorio'),
                gruint_orientation_sexual: Yup.string().nullable().required('Campo obligatorio'),
                gruint_ethnicity: Yup.string().nullable().required('Campo obligatorio'),
                gruint_victim: Yup.string().required('Campo obligatorio'),
                gruint_disability: Yup.string().required('Campo obligatorio'),
            })
        ),
    });

    return (
        <div className="container">
            <ComponetCard>
                <div>
                    <h5 style={{ fontSize: '18px', margin: '0' }}>
                        ¡Ya casi terminamos! Carga los siguientes formatos
                    </h5>
                    <span style={{ fontWeight: 'bold' }}>
                        Debes descargar los formatos, completarlos y posteriormente cargar para su envío.-{' '}
                        <span style={{ color: '#FF8403' }}>Todos los campos son obligatorios</span>
                    </span>
                </div>
                <Tabs onChange={buttonBack}>
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
                        key="item-1.1"
                    >
                        <FormPostulation setDisblaTabsPos={setDisblaTabsPos} />
                    </TabPane>
                    <TabPane
                        // disabled={disblaTabsPos ? true : false}
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
                        key="item-1.2"
                    >
                        <ComponetCard>
                            <Formik
                                enableReinitialize
                                onSubmit={submit}
                                validationSchema={schema}
                                initialValues={initial_values}
                            >
                                {({ handleChange, values, setValues }) => {
                                    return (
                                        <Form>
                                            <FieldArray name="membersPostulations">
                                                {() =>
                                                    values.membersPostulations.map((_, i) => (
                                                        <FormTeam key={i} handleChange={handleChange} i={i} />
                                                    ))
                                                }
                                            </FieldArray>
                                            {buttonVisible && (
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <span style={{ padding: '2%', color: '#FF8403' }}>
                                                        Agegar otro participante
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => onChangeTickets(values, setValues)}
                                                        style={{
                                                            borderRadius: '50%',
                                                            color: 'white',
                                                            backgroundColor: '#FF8403',
                                                            border: 'aliceblue',
                                                            width: '3%',
                                                            height: '0%',
                                                            marginTop: '1%',
                                                            fontFamily: 'Monserrat',
                                                            fontSize: '19px',
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                                <button
                                                    key="saveDoc"
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    style={{ width: '17%' }}
                                                >
                                                    Continuar
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </ComponetCard>
                    </TabPane>
                    <TabPane
                        // disabled={disblaTabsPosDocument ? true : false}
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
                        key="item-1.3"
                    >
                        <DocsPostulation />
                    </TabPane>
                </Tabs>
                {eventButonDisable && (
                    <div>
                        <button
                            key="saveDocss"
                            type="submit"
                            className="btn btn-outline-primary"
                            style={{ width: '17%' }}
                        >
                            Ir atrás
                        </button>
                    </div>
                )}
            </ComponetCard>
        </div>
    );
};

export default PostulationView;
