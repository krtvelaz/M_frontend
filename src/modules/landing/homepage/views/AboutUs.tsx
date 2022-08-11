import { Collapse } from 'antd';
const { Panel } = Collapse;
import { Card } from "../../../../utils/ui";

const AboutUs = () => {
  return (
    <div>

      <div
        className="container-fluid   "
        style={{
          backgroundImage: 'linear-gradient(to top , #ffffff 60%, transparent), url("src/utils/assets/img/hombreConGafas.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <Card className="card-about">
          <div className="row mb-4">
            <div className="col-12 col-md-12  col-lg-6  mt-4">
              <h2 className="text-stake">¿Quienés somos?</h2>
              <p>
                <span className="span-about">Somos el Laboratorio de Innovación con enfoque GovTech de la
                Alcaldía de Medellín</span>, a través del cual buscamos generar conexiones
                entre las necesidades del sector público y las capacidades del
                ecosistema de Ciencia, Tecnología e Innovación de la ciudad para
                buscar soluciones basadas en tecnologías 4.0 para mejorar la calidad
                de vida de la ciudadanía.
              </p>
            </div>
            <div className="col-12 col-md-12  col-lg-6 ">
              <img className="img-fluid" src="https://img.freepik.com/foto-gratis/diversas-personas-que-trabajan-oficina_53876-104681.jpg?w=1060&t=st=1660155681~exp=1660156281~hmac=a7f9f06cf8d9817b3359145bb534c9202b513a7ff5018707360b1bb3e91ade4f" alt="imagen nosotros" />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12  col-lg-6 ">
              <img src="https://img.freepik.com/foto-gratis/grupo-personas-trabajando-plan-negocios-oficina_1303-15861.jpg?w=996&t=st=1660155757~exp=1660156357~hmac=6d27ca3de2f7428a16331903fa6c096a1567a0ea67a57dd3f8622e37d148c1be" alt="imagen nosotros" />
            </div>
            <div className="col-12 col-md-12  col-lg-6  mt-4">
              <h2 className="text-stake">¿Qué buscamos?</h2>
              <p>
                Fortalecer la administración pública y el ecosistema de Ciencia,
                Tecnología e Innovación de Medellín a través de la co-creación de
                soluciones innovadoras que permiten mejorar la experiencia del
                ciudadano con los servicios del Estado a la par que se consolidan y
                fortalecen nuevos modelos de negocio con los actores participantes.
              </p>
            </div>

          </div>
          <div className="row">

            <div className="col-12 col-md-12  col-lg-6  mt-4">
              <p className="mb-0">
                Conoce más acerca de las
              </p>
              <h2 className="text-stake mb-4">Preguntas Frecuentes</h2>
            </div>
            <div>
              <Collapse style={{
                background: '#FFFFFF',
                border: '0.5px solid #707070',
                opacity: '1',
              }} >
                <Panel header="Pregunta número 1 " key="1">
                  <p> Conoce más acerca de las Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis sit earum illum quam ipsum, veniam numquam optio rem. Necessitatibus magni, voluptates dolore et provident quam cupiditate repudiandae corrupti unde.</p>
                </Panel>
                <Panel header="Pregunta número 2" key="2">
                  <p> Conoce más acerca de las Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis sit earum illum quam ipsum, veniam numquam optio rem. Necessitatibus magni, voluptates dolore et provident quam cupiditate repudiandae corrupti unde.</p>
                </Panel>
                <Panel header="Pregunta número 3" key="3">
                  <p> Conoce más acerca de las Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis sit earum illum quam ipsum, veniam numquam optio rem. Necessitatibus magni, voluptates dolore et provident quam cupiditate repudiandae corrupti unde.</p>
                </Panel>
                <Panel header="Pregunta número 4" key="4">
                  <p> Conoce más acerca de las Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis sit earum illum quam ipsum, veniam numquam optio rem. Necessitatibus magni, voluptates dolore et provident quam cupiditate repudiandae corrupti unde.</p>
                </Panel>
              </Collapse>
            </div>

          </div>
        </Card>
      </div>

    </div>
  );
};

export default AboutUs;
