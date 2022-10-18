
import { figuraRetos, trazado_amarillo } from "../../../utils/assets/img";
import { Card } from "../../../utils/ui";
import quienesSomos from "../../../utils/assets/img/quienesSomos.png";
import queBuscamos from "../../../utils/assets/img/queBuscamos.png";
import FrequentlyQuestions from "../components/FrequentlyQuestions";


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
        <img src={figuraRetos} alt="trazado" style={{
          position: 'absolute',
          top: 0,
          right: '-30px',
          maxWidth: '25%'
        }}  />
        <div
          className="row justify-content-center container-about"
        >
          
          <div className="d-flex flex-row" style={{margin: '70px 0 40px 0'}}>
            <h5 className="" style={{fontSize: '16px', fontFamily: 'Montserrat-SemiBold', color: '#FFFFFF', marginLeft: '110px'}}>Laboratorio de innovación Medeinn</h5>
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
              <FrequentlyQuestions />
             
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
