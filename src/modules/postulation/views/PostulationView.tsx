import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import { ErrorMessage, Select } from '../../../utils/ui';
import ComponetCard from '../../../utils/ui/Card';
import { Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import FormTeam from '../components/FormTeam';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { DocsPostulation } from '../components/DocsPostulation';
import { circuloTabs } from '../../../utils/assets/img';

interface PostulationView {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    postulation?: IPostulation;
}
const PostulationView: FC<PostulationView> = ({ innerRef, onSubmit, postulation }) => {
    const [formList, setFormList] = useState<Array<JSX.Element>>([]);
    const { TabPane } = Tabs;
    const OpenForm = () => {};
    const addComponents = () => {
        let ArrayComponents = [...formList];
        ArrayComponents.push(<FormTeam onSubmit={OpenForm} />);
        setFormList(ArrayComponents);
    };

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
                <Tabs>
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
                        <FormPostulation />
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
                        key="item-1.2"
                    >
                        <ComponetCard>
                            {formList.map((component, i) => (
                                <div key={i}>{component}</div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <span style={{ padding: '2%', color: '#FF8403' }}>Agegar otro participante</span>
                                <button
                                    onClick={() => addComponents()}
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
                        </ComponetCard>
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
                        key="item-1.3"
                    >
                        <DocsPostulation />
                    </TabPane>
                </Tabs>
            </ComponetCard>
        </div>
    );
};

export default PostulationView;
