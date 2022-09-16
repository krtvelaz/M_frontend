import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useRef } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import { ErrorMessage, Select } from '../../../utils/ui';
import ComponetCard from '../../../utils/ui/Card';
import { Card, Modal, Switch, Tabs } from 'antd';
import FormPostulation from '../components/FormPostulation';
import FormTeam from '../components/FormTeam';
import '../../../utils/assets/styles/ModalInfoPostulations.scss';
import { DocsPostulation } from '../components/DocsPostulation';

interface PostulationView {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    postulation?: IPostulation;
}
const PostulationView: FC<PostulationView> = ({ innerRef, onSubmit, postulation }) => {
    const { TabPane } = Tabs;
    const OpenForm = () => {
        console.log('click');
    };
    const form_ref = useRef<FormikProps<FormikValues>>();
    const DataPostulante = [
        {
            id: 1,
            title: 'hola',
        },
        {
            id: 2,
            title: 'hola',
        },
        {
            id: 3,
            title: 'hola',
        },
        {
            id: 4,
            title: 'hola',
        },
    ];

    return (
        <div>
            <ComponetCard>
                <div>
                    <h5 style={{ fontSize: '18px', margin: '0' }}>¡Genial! Estas a punto de postularte al reto</h5>
                    <span style={{ fontWeight: 'bold' }}>
                        Por favor completa los siguientes datos -{' '}
                        <span style={{ color: '#FF8403' }}>Todos los campos son obligatorios</span>
                    </span>
                </div>
                {/* <div
                    style={{
                        backgroundColor: '#FF8403',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        position: 'absolute',
                        zIndex: '1',
                        top: '14.5%',
                        left: '3%',
                    }}
                >
                    <span>1</span>
                </div> */}
                <Tabs>
                    <TabPane tab="1.Datos Postulante" key="item-1.1">
                        <FormPostulation onSubmit={OpenForm} />
                    </TabPane>
                    <TabPane tab="2.Integrantes del equipo" key="item-1.2">
                        <ComponetCard>
                            {DataPostulante.map((item, i) => (
                                <FormTeam onSubmit={OpenForm} />
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <span style={{ padding: '2%', color: '#FF8403' }}>Agegar otro participante</span>
                                <button
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
                    <TabPane tab="3.Formatos que debes cargar" key="item-1.3">
                        <DocsPostulation />
                    </TabPane>
                </Tabs>
            </ComponetCard>
        </div>
    );
};

export default PostulationView;
