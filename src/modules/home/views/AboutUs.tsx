import { Collapse } from "antd";
import { trazado_amarillo } from "../../../utils/assets/img";
const { Panel } = Collapse;
import { Card } from "../../../utils/ui";
import quienesSomos from "../../../utils/assets/img/quienesSomos.png";
import queBuscamos from "../../../utils/assets/img/queBuscamos.png";


const AboutUs = () => {
  return (
    <div className="box-about">
      <div
        className="container"
        style={{
          paddingBottom: "50px",
        }}
      >
        <img src={trazado_amarillo} alt="trazado" className="image-amarilla" />
        <div
          className="row justify-content-center container-about"
        >
          
          <div className="d-flex flex-row mb-3">
            <h5 className="text-white">Laboratorio de innovación Medeinn</h5>
          </div>
          <div className="col-md-12">
            <Card className="card-about">
              <div className="row mb-4">
                <div className="col-12 col-md-12 col-lg-6 mt-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className="text-stake">¿Quienés somos?</h2>
                  <p>
                    <span className="span-about">
                      Somos el Laboratorio de Innovación con enfoque GovTech de
                      la Alcaldía de Medellín
                    </span>
                    , a través del cual buscamos generar conexiones entre las
                    necesidades del sector público y las capacidades del
                    ecosistema de Ciencia, Tecnología e Innovación de la ciudad
                    para buscar soluciones basadas en tecnologías 4.0 para
                    mejorar la calidad de vida de la ciudadanía.
                  </p>
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                  <img
                    className="img-fluid"
                    src={quienesSomos}
                    alt="Imagen quienes somos"
                  />
                </div>
              </div>

              <div className="row  column-reverse">
                <div className="col-12 col-md-12  col-lg-6 ">
                  <img
                    src={queBuscamos}
                    alt="Imagen que buscamos"
                  />
                </div>
                <div className="col-12 col-md-12  col-lg-6  mt-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className="text-stake">¿Qué buscamos?</h2>
                  <p>
                    Fortalecer la administración pública y el ecosistema de
                    Ciencia, Tecnología e Innovación de Medellín a través de la
                    co-creación de soluciones innovadoras que permiten mejorar
                    la experiencia del ciudadano con los servicios del Estado a
                    la par que se consolidan y fortalecen nuevos modelos de
                    negocio con los actores participantes.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12  col-lg-6  mt-4">
                  <p className="mb-0 my-5">Conoce más acerca de las</p>
                  <h2 className="text-stake my-2">Preguntas Frecuentes</h2>
                </div>
                <div className="my-3">
                  <Collapse
                    style={{
                      background: "#FFFFFF",
                      border: "0.5px solid #707070",
                      opacity: "1",
                    }}
                  >
                    <Panel header="Pregunta número 1 " key="1">
                      <p>
                        {" "}
                        Conoce más acerca de las Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quis blanditiis sit earum
                        illum quam ipsum, veniam numquam optio rem.
                        Necessitatibus magni, voluptates dolore et provident
                        quam cupiditate repudiandae corrupti unde.
                      </p>
                    </Panel>
                    <Panel header="Pregunta número 2" key="2">
                      <p>
                        {" "}
                        Conoce más acerca de las Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quis blanditiis sit earum
                        illum quam ipsum, veniam numquam optio rem.
                        Necessitatibus magni, voluptates dolore et provident
                        quam cupiditate repudiandae corrupti unde.
                      </p>
                    </Panel>
                    <Panel header="Pregunta número 3" key="3">
                      <p>
                        {" "}
                        Conoce más acerca de las Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quis blanditiis sit earum
                        illum quam ipsum, veniam numquam optio rem.
                        Necessitatibus magni, voluptates dolore et provident
                        quam cupiditate repudiandae corrupti unde.
                      </p>
                    </Panel>
                    <Panel header="Pregunta número 4" key="4">
                      <p>
                        {" "}
                        Conoce más acerca de las Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quis blanditiis sit earum
                        illum quam ipsum, veniam numquam optio rem.
                        Necessitatibus magni, voluptates dolore et provident
                        quam cupiditate repudiandae corrupti unde.
                      </p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
