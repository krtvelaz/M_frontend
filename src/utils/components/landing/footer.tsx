import React, { useContext } from 'react';
import {
    centro_revelos,
    chat,
    Imagen_footer,
    intranet,
    linea_atencion,
    linea_gratuita,
    logoAlcaldiaNegro,
    logo_alcaldia_footer,
    logo_colombia,
    marca_logo,
} from '../../assets/img';
import { TemplateContext } from '../template/templateContext';

const footer = () => {
    const context = useContext(TemplateContext);

    return (
        <div className="footer-landing">
            <div className="mx-auto footer-logo">
                <img src={logoAlcaldiaNegro} style={{ width: '190px', height: 'auto' }} alt="Logo de la alcaldia de medellin" />
            </div>
            <div
                style={{
                    paddingRight: '5%',
                    paddingLeft: '7%',
                    background: 'transparent linear-gradient(180deg, #909090 0%, #52585A 100%) 0% 0% no-repeat padding-box',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    <div
                        className={`${
                            context.device !== 'lg' ? 'd-flex justify-content-space-around scroll-information' : 'row'
                        }`}
                        style={{
                            padding: '0 110px'
                        }}
                        
                    >
                        <div className="col" style={{ marginRight: '20px', marginLeft: '20px', padding: '30px 0', whiteSpace: 'nowrap' }}>
                            <img src={chat} width="40" alt="" />
                            <h5 style={{ color: '#3366CC'}}>chat</h5>
                            <span style={{ color: '#3366CC'}}>Alcaldía de Medellín</span>
                        </div>
                        <div className="col" style={{ marginRight: '20px', padding: '30px 0', whiteSpace: 'nowrap' }}>
                            <img src={linea_atencion} width="40" alt="" />
                            <h5 style={{ color: '#3366CC'}}>Línea de atención</h5>
                            <span style={{ color: '#3366CC'}}>(574) 44 44 144</span>
                        </div>
                        <div className="col" style={{ marginRight: '20px', padding: '30px 0', whiteSpace: 'nowrap' }}>
                            <img src={linea_gratuita} width="40" alt="" />
                            <h5 style={{ color: '#3366CC'}}>Línea Gratuita Nacional</h5>
                            <span style={{ color: '#3366CC'}} >(574) 44 44 144</span>
                        </div>
                        <div className="col" style={{ marginRight: '20px', padding: '30px 0', whiteSpace: 'nowrap' }}>
                            <img src={centro_revelos} width="40" alt="" />
                            <h5 style={{ color: '#3366CC'}}>Centro de Relevos</h5>
                            <span style={{ color: '#3366CC'}}>Atención por lengua de señas</span>
                        </div>
                        <div className="col" style={{ marginRight: '20px', padding: '30px 0' }}>
                            <img src={intranet} width="25" alt="" />
                            <h5 style={{ color: '#3366CC'}}>Intranet</h5>
                            <span style={{ color: '#3366CC'}}>Intranet</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <img src={Imagen_footer} alt="imagen" className="d-block w-100 footer-image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="" style={{ backgroundColor: '#3366CC', padding: '10px' }}>
                <div className="row align-items-center" style={{ margin: '0px 100px' }}>
                    <div className="col-2">
                        <img src={logo_alcaldia_footer} width="200" alt="imagen pie de pagina" className="d-block" />
                    </div>
                    <div className="col-1 p-0">
                        <img src={marca_logo} width="30" alt="marca logo" className="d-block m-0" />
                    </div>
                    <div className="col">
                        <img src={logo_colombia} style={{ width: '150px', height: 'auto' }} alt="logo colombia" className="d-block" />
                    </div>
                    <div className="col">
                        <a href="#" className="text-white">
                            Conoce GOV.CO aquí
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default footer;
