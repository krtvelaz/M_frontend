import React, { useContext } from "react";
import {
  centro_revelos,
  chat,
  intranet,
  linea_atencion,
  linea_gratuita,
  logoAlcaldiaNegro,
  logo_alcaldia_footer,
} from "../../assets/img";
import { TemplateContext } from "../template/templateContext";

const footer = () => {
  const context = useContext(TemplateContext);
  
  return (
    <div className="footer-landing">
      <div className="mx-auto footer-logo">
        <img src={logoAlcaldiaNegro} alt="Logo de la alcaldia de medellin" />
      </div>

      <div className="footer-information">
        <div className={`${context.device !== 'lg' ? 'd-flex justify-content-center scroll-information' : 'row' }`} >
          {/* <div className="btn-information"> */}
          <div className="col" style={{marginRight: '30px', padding: '30px'}}>
            <img src={chat} alt="" />
            <h5 >chat</h5>
            <span>Alcaldía de Medellín</span>
          </div>
          <div className="col" style={{marginRight: '30px', padding: '30px'}}>
            <img src={linea_atencion} alt="" />
            <h5>Línea de atención</h5>
            <span>(574) 44 44 144</span>
          </div>
          <div className="col" style={{marginRight: '30px', padding: '30px'}}>
            <img src={linea_gratuita} alt="" />
            <h5>Línea Gratuita Nacional</h5>
            <span>(574) 44 44 144</span>
          </div>
          <div className="col" style={{marginRight: '30px', padding: '30px'}}>
            <img src={centro_revelos} alt="" />
            <h5>Centro de Relevos</h5>
            <span>Atención por lengua de señas</span>
          </div>
          <div className="col" style={{marginRight: '30px', padding: '30px'}}>
            <img src={intranet} alt="" />
            <h5>Intranet</h5>
            <span>Intranet</span>
          </div>
          </div>
        {/* </div> */}
        <div className="row">
          <div className="col">
            <img
              src="src/utils/assets/img/imagen_footer.png"
              alt="imagen"
              className="d-block w-100"
            />
          </div>
        </div>
      </div>

      <div className="" style={{ backgroundColor: "#3366CC", padding: "10px" }} >
        <div
          className="row"
          style={{margin: '0px 100px'}}
          
        >
          <div className="col">
            <img src={logo_alcaldia_footer} alt="" className="d-block w-100" />
          </div>
          <div className="col">
            <img src="src/utils/assets/img/marca_logo.png" alt="" className="d-block" />
          </div>
          <div className="col">
            <img
          src="src/utils/assets/img/logo_colombia.png"
          alt=""
          className="d-block"
        />
          </div>
          <div className="col">Conoce GOV.CO aquí</div>
        </div>
      </div>
    </div>
  );
};

export default footer;
