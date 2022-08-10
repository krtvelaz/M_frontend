import {
  calendar,
  fondo_retos,
  rocket,
  watch,
} from "../../../../utils/assets/img";
import HomeChallenge from "../../challenge/components/HomeChallenge";
import StatisticsLanding from "../../banner/components/StatisticsLanding";
import CarouselMedeinn from "../components/CarouselMedeinn";
import { Card } from "antd";
import { useContext } from "react";
import { TemplateContext } from "../../../../utils/components/template/templateContext";

const Homepage = () => {
  const context = useContext(TemplateContext);
  return (
    <>
      <section style={{ background: "#e4eff0" }}>
        <div className="row" style={{ alignItems: "center" }}>
          {context.device === "lg" && (
            <div className="col-1" style={{ paddingLeft: "20px" }}>
              <img src={rocket} alt="imagen cohete" />
            </div>
          )}

          <div className="col-12 col-md-12 col-lg-11">
            <CarouselMedeinn />
          </div>
        </div>
      </section>

      <div className="container-statistics">
        <StatisticsLanding />
      </div>

      <section className="container-challenges">
        <div className="container">
          <div className="contenedor-1">
            <img
              src="src/utils/assets/img/fondo_retos.svg"
              alt=""
              className="imagen-fondo"
            />
            <img
              src="src/utils/assets/img/grupo_personas.png"
              alt=""
              className="imagen-grupo-personas"
            />
          </div>
          <div className="contenedor-2"></div>

          <HomeChallenge />
          <div className="row">
            <div
              className="col-12 col-md-12 col-lg-5"
              style={{ marginTop: "120px", position: "relative" }}
            >
              <h2>
                Solucionar e ider
                <br />
                <span className="text-stake">Convocatoria abierta</span>
              </h2>
              <br />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quisquam provident voluptatem ipsum odit modi ducimus
                reprehenderit illo, adipisci neque tenetur iusto in quod quas
                sed ut aliquam recusandae illum beatae!
              </p>
            </div>
            <div className="col-12 col-md-12 col-lg-7">
              <div className="row">
                <div className="col-12 col-md-6" id="card-challenge-one">
                  <Card
                    hoverable
                    className="card-challenge"
                    cover={
                      <img
                        alt="example"
                        src="src/utils/assets/img/imagen 52.png"
                      />
                    }
                  >
                    <div className="text-center body-card-challenge">
                      <h3>
                        ¿Cómo mejorar la conectividad en los corregimientos de
                        Medellín?
                      </h3>
                      <p>Fecha de vigencia para postulaciones</p>
                      <div className="date-card-challenge">
                        INICIO DEL RETO: 1 de Abril de 2021
                      </div>
                      <div className="date-card-challenge">
                        FIN DEL RETO: 28 de Abril de 2021
                      </div>
                      <button className="btn">Postularse al reto</button>
                    </div>
                  </Card>
                </div>
                <div className="col-12 col-md-6">
                  <Card
                    hoverable
                    className="card-challenge"
                    cover={
                      <img
                        alt="example"
                        src="src/utils/assets/img/imagen 52.png"
                      />
                    }
                  >
                    <div className="text-center body-card-challenge">
                      <h3>
                        ¿Cómo mejorar la conectividad en los corregimientos de
                        Medellín?
                      </h3>
                      <p>Fecha de vigencia para postulaciones</p>
                      <div className="date-card-challenge">
                        INICIO DEL RETO: 1 de Abril de 2021
                      </div>
                      <div className="date-card-challenge">
                        FIN DEL RETO: 28 de Abril de 2021
                      </div>
                      <button className="btn">Postularse al reto</button>
                    </div>
                  </Card>
                </div>
                <div className="col-12 col-md-6">
                  <Card
                    hoverable
                    className="card-challenge"
                    cover={
                      <img
                        alt="example"
                        src="src/utils/assets/img/imagen 52.png"
                      />
                    }
                  >
                    <div className="text-center body-card-challenge">
                      <h3>
                        ¿Cómo mejorar la conectividad en los corregimientos de
                        Medellín?
                      </h3>
                      <p>Fecha de vigencia para postulaciones</p>
                      <div className="date-card-challenge">
                        INICIO DEL RETO: 1 de Abril de 2021
                      </div>
                      <div className="date-card-challenge">
                        FIN DEL RETO: 28 de Abril de 2021
                      </div>
                      <button className="btn">Postularse al reto</button>
                    </div>
                  </Card>
                </div>
                <div className="col-12 col-md-6" id="card-challenge-four">
                  <Card
                    hoverable
                    className="card-challenge"
                    cover={
                      <img
                        alt="example"
                        src="src/utils/assets/img/imagen 52.png"
                      />
                    }
                  >
                    <div className="text-center body-card-challenge">
                      <h3>
                        ¿Cómo mejorar la conectividad en los corregimientos de
                        Medellín?
                      </h3>
                      <p>Fecha de vigencia para postulaciones</p>
                      <div className="date-card-challenge">
                        INICIO DEL RETO: 1 de Abril de 2021
                      </div>
                      <div className="date-card-challenge">
                        FIN DEL RETO: 28 de Abril de 2021
                      </div>
                      <button className="btn">Postularse al reto</button>
                    </div>
                  </Card>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
