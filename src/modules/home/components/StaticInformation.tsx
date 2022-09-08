import { Popover } from "antd";
import { apoyo, hacerClic, lamp, medalla, postulamos } from "../../../utils/assets/img";

const StaticInformation = () => {
  const contenido_postulamos = (
    <div className="row container-static-information">
      <div className="col-2">
        <img
          src={postulamos}
          alt="imagen postulamos"
        />
      </div>
      <div className="col container-text-stake">
        {" "}
        <div className="text-stake my-3">Postulamos</div>
        <p>
          En este momento, podrás revisar toda la información respecto al reto
          de tu interés, conocer los datos de la problemática, el impacto
          esperado de la solución; y, muy importante, revisar de forma detallada
          los términos de referencia para determinar si podrás aplicar a la
          convocatoria. Una vez hayas revisado cada uno de los pasos asociados
          al reto y a los requisitos para la postulación, podrás recolectar la
          información necesaria para la postulación de la solución y cargarla en
          la plataforma, dentro de los plazos definidos
        </p>
      </div>
    </div>
  );
  const contenido_selecionamos = (
    <div className="row container-static-information">
      <div className="col-2">
        <img
          src={postulamos}
          alt="imagen postulamos"
        />
      </div>
      <div className="col container-text-stake">
        {" "}
        <div className="text-stake">Seleccionamos</div>
        <p>
          A partir de los criterios de selección expuestos en los términos de
          referencia serán elegidos los participantes que harán parte de la fase
          de acompañamiento. Esta fase no garantiza acceder a premiación alguna.
        </p>
      </div>
    </div>
  );
  const contenido_acompañamos = (
    <div className="row container-static-information">
      <div className="col-2">
        <img
          src={postulamos}
          alt="imagen postulamos"
        />
      </div>
      <div className="col container-text-stake">
        {" "}
        <div className="text-stake my-3">Acompañamos</div>
        <p>
          En esta etapa se lleva a cabo el dialogo técnico para la adaptación e
          innovación en la solución presentada. Lo anterior, permite documentar
          la novedad o mejora en las propuestas seleccionadas, posterior a las
          jornadas de trabajo con las partes interesadas. El resultado de esta
          fase será el que se evalúe para determinar quiénes acceden a la
          premiación o implementación de la solución.
        </p>
      </div>
    </div>
  );
  const contenido_premiamos = (
    <div className="row container-static-information">
      <div className="col-2">
        <img
          src={postulamos}
          alt="imagen postulamos"
        />
      </div>
      <div className="col container-text-stake">
        {" "}
        <div className="text-stake">Premiamos</div>
        <p>
          Las propuestas seleccionadas, como resultado de la fase de
          acompañamiento, tendrán la oportunidad de implementar su solución en
          la ciudad y así generar mayor calidad de vida a los ciudadanos.
        </p>
      </div>
    </div>
  );

  return (
    <div className="row container-stake">
      <div className="col-12 col-md-12 col-lg-12 col-xl-4 " style={{ position: "relative", marginBottom: '65px'}}>
        <h2 className="text-stake">
          Nuestro proceso de innovación abierta Participación por un Territorio
          Inteligente.
        </h2>
        <br />
        <p>
          Metodología basada en compras públicas para la Innovación que,
          conectando soluciones con retos del territorio, busca fortalecer el
          ecosistema GovTech y generar valor público para Medellín.
        </p>
      </div>
      <div className="col-6 my-3 col-md-3 col-lg-3 col-xl p-0">
        <Popover
          content={contenido_postulamos}
          placement="bottom"
          trigger="hover"
          style={{ width: 700 }}
          className="popover-postulamos"
        >
          <div className="circle-text-wraps mx-auto">
            <div className="circle-number-container">
              <span
                className="circle-number"
                style={{ font: "normal normal 900 40px/20px Montserrat" }}
              >
                1
              </span>
            </div>
            <div className="circle-children">
              <img src={lamp} width="50%" alt="foto" />
              <span className="my-3">Postulamos</span>
            </div>
          </div>
        </Popover>
      </div>
      <div className="col-6 my-3 col-md-3 col-lg-3 col-xl p-0">
        <Popover
          content={contenido_selecionamos}
          placement="bottom"
          trigger="hover"
        >
          <div className="circle-text-wraps  mx-auto">
            <div className="circle-number-container">
              <span
                className="circle-number"
                style={{ font: "normal normal 900 40px/20px Montserrat" }}
              >
                2
              </span>
            </div>
            <div className="circle-children">
              <img src={hacerClic} width="30%" alt="foto" />
              <span className="my-3">Seleccionamos</span>
            </div>
          </div>
        </Popover>
      </div>
      <div className="col-6 my-3 col-md-3 col-lg-3 col-xl p-0">
        <Popover
          content={contenido_acompañamos}
          placement="bottom"
          trigger="hover"
        >
          <div className="circle-text-wraps  mx-auto">
            <div className="circle-number-container">
              <span
                className="circle-number"
                style={{ font: "normal normal 900 40px/20px Montserrat" }}
              >
                3
              </span>
            </div>
            <div className="circle-children">
              <img src={apoyo} width="40%" alt="foto" />
              <span className="my-3">Acompañamos</span>
            </div>
          </div>
        </Popover>
      </div>
      <div className="col-6 my-3 col-md-3 col-lg-3 col-xl p-0">
        <Popover
          content={contenido_premiamos}
          placement="bottom"
          trigger="hover"
        >
          <div className="circle-text-wraps  mx-auto">
            <div className="circle-number-container">
              <span
                className="circle-number"
                style={{ font: "normal normal 900 40px/20px Montserrat" }}
              >
                4
              </span>
            </div>
            <div className="circle-children">
              <img src={medalla} width="40%" alt="foto" />
              <span className="my-3">Premiamos</span>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default StaticInformation;
