import { useContext } from "react";
import {
  figurasFondo,
  rocket,
  trazado_amarillo,
} from "../../../../utils/assets/img";
import StatisticsLanding from "../../banner/components/StatisticsLanding";
import CarouselMedeinn from "../components/CarouselMedeinn";
import { TemplateContext } from "../../../../utils/components/template/templateContext";
import StaticInformation from "../components/StaticInformation";
import PublishedChallenges from "../../challenge/components/PublishedChallenges";
import { Card } from "../../../../utils/ui";
import { Tabs } from "antd";

const Homepage = () => {
  const context = useContext(TemplateContext);
  const { TabPane } = Tabs;

  const onChange = (key: string) => {
  };

  return (
    <>
      <section>
        <div className="row align-items-center">
          {context.device === "lg" && (
            <div className="col-1 styles-rocket">
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
        <img
          src="src/utils/assets/img/fondo_retos.svg"
          alt=""
          className="imagen-fondo"
        />
        {context.device === "lg" && (
          <img
            src="src/utils/assets/img/grupo_personas.png"
            alt=""
            className="imagen-grupo-personas"
          />
        )}
        <div className="container">
          <StaticInformation />
          <PublishedChallenges />
        </div>
      </section>

      <section className="section-events">
        <img
          src={figurasFondo}
          alt="fihuras de fondo"
          className="figuras-fondo"
        />
        <img src={trazado_amarillo} alt="trazado" className="image-amarilla" />
        <div className="imagen-fondo-events">
          <div className="container">
            <div
              className="text-white text-center container-cards-events"
              style={{ padding: "3rem 0 1rem 0" }}
            >
              Eventos más cercanos
            </div>
            <div className="row">
              <div className="col-12 col-md-4 col-lg-4">
                <Card
                  actions={[
                    <div className="my-3 d-flex justify-content-end">
                      <button className="btn-cupos-primary me-5">
                        Cupos limitados
                      </button>
                      <button className="btn btn-primary me-3">Asistiré</button>
                    </div>,
                  ]}
                >
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-3">
                      <div className="text-white text-center date-event">
                        AGO 04
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-9">
                      <div className="title-card-event">
                        Título del evento próximo, no debe sobrepasar dos líneas
                      </div>
                      <p className="">
                        Agregar contenido descriptivo para esta sección donde se
                        pueda entender por parte del usuario si el contenido es
                        de su interés.
                      </p>
                      <div className="my-4">Lugar del evevento</div>

                      <span>3: 00 pm</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-md-4 col-lg-4">
                <Card
                  actions={[
                    <div className="my-3 d-flex justify-content-end">
                      <button className="btn-cupos-primary me-5">
                        Cupos limitados
                      </button>
                      <button className="btn btn-primary me-3">Asistiré</button>
                    </div>,
                  ]}
                >
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-3">
                      <div className="text-white text-center date-event">
                        AGO 04
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-9">
                      <div className="title-card-event">
                        Título del evento próximo, no debe sobrepasar dos líneas
                      </div>
                      <p className="">
                        Agregar contenido descriptivo para esta sección donde se
                        pueda entender por parte del usuario si el contenido es
                        de su interés.
                      </p>
                      <div className="my-4">Lugar del evevento</div>

                      <span>3: 00 pm</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-md-4 col-lg-4">
                <Card
                  actions={[
                    <div className="my-3 d-flex justify-content-end">
                      <button className="btn-cupos-primary me-5">
                        Cupos limitados
                      </button>
                      <button className="btn btn-primary me-3">Asistiré</button>
                    </div>,
                  ]}
                >
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-3">
                      <div className="text-white text-center date-event">
                        AGO 04
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-9">
                      <div className="title-card-event">
                        Título del evento próximo, no debe sobrepasar dos líneas
                      </div>
                      <p className="">
                        Agregar contenido descriptivo para esta sección donde se
                        pueda entender por parte del usuario si el contenido es
                        de su interés.
                      </p>
                      <div className="my-4">Lugar del evevento</div>

                      <span>3: 00 pm</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="text-center  py-5">
              <a href="#" className="text-white">
                Ver calendario de eventos
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="text-center py-5">
            <div className="text-white" style={{ fontSize: "16px" }}>
              {" "}
              <span style={{ fontSize: "16px", fontFamily: "Montserrat-Bold" }}>
                Suscríbete
              </span>{" "}
              a nuestros botines de noticias y eventos{" "}
            </div>
            <a href="" style={{ color: "#FFDC2F" }}>
              Al dar click en suscribirme ahora, acepta los términos y
              condiciones
            </a>
            <div className="my-5">
              <div className="text-white" style={{ fontFamily: "14px" }}>
                Conoce lo último
              </div>
              <h2
                className="text-white"
                style={{ fontFamily: "Montserrat-Bold", fontSize: "20px" }}
              >
                Entérarte de lo más actual
              </h2>
              <Tabs
                defaultActiveKey="1"
                className="tabs-events"
                onChange={onChange}
              >
                <TabPane tab="Retos solucionados" key="1">
                  <div className="row my-5 pe-5 ps-5">
                    <div className="col-12 col-md-12 col-lg-6 imagen-events">
                      <div
                        className="text-white text-start ps-5 pe-5"
                        style={{ position: "absolute", bottom: "10%" }}
                      >
                        <div style={{ fontFamily: "Montserrat-Bold" }}>
                          Nombre del reto
                        </div>
                        <p>
                          Introducción a la noticia con texto descriptivo del
                          contenido a consultar o leer por el visitante...
                        </p>
                      </div>
                      <img
                        style={{ borderRadius: "16px 16px 0 0" }}
                        className="w-100"
                        src="https://images.pexels.com/photos/6958766/pexels-photo-6958766.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="imagen 1"
                      />
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 imagen-events">
                      <div
                        className="text-white text-start ps-5 pe-5"
                        style={{ position: "absolute", bottom: "10%" }}
                      >
                        <div style={{ fontFamily: "Montserrat-Bold" }}>
                          Nombre del reto
                        </div>
                        <p>
                          Introducción a la noticia con texto descriptivo del
                          contenido a consultar o leer por el visitante...
                        </p>
                      </div>
                      <img
                        style={{ borderRadius: "16px 16px 0 0" }}
                        className="w-100"
                        src="https://images.pexels.com/photos/7567309/pexels-photo-7567309.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="imagen 2"
                      />
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 imagen-events">
                      <div
                        className="text-white text-start ps-5 pe-5"
                        style={{ position: "absolute", bottom: "10%" }}
                      >
                        <div style={{ fontFamily: "Montserrat-Bold" }}>
                          Nombre del reto
                        </div>
                        <p>
                          Introducción a la noticia con texto descriptivo del
                          contenido a consultar o leer por el visitante...
                        </p>
                      </div>
                      <img
                        style={{ borderRadius: "0 0 16px 16px" }}
                        className="w-100"
                        src="https://images.pexels.com/photos/7550532/pexels-photo-7550532.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="imagen 3"
                      />
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 imagen-events">
                      <div
                        className="text-white text-start ps-5 pe-5"
                        style={{ position: "absolute", bottom: "10%" }}
                      >
                        <div style={{ fontFamily: "Montserrat-Bold" }}>
                          Nombre del reto
                        </div>
                        <p>
                          Introducción a la noticia con texto descriptivo del
                          contenido a consultar o leer por el visitante...
                        </p>
                      </div>
                      <img
                        style={{ borderRadius: "0 0 16px 16px" }}
                        className="w-100"
                        src="https://images.pexels.com/photos/7610525/pexels-photo-7610525.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="imagen 4"
                      />
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Eventos" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Avances de los retos" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ background: "#E4EFF0" }}>
            <div className="col">imagen</div>
            <div className="col-9">
              <div>Título del mensaje desde lo humano y motivacional</div>
              <p>
                Este módulo permitirá la divulgación de mensajes enfocados a lo
                humano, a la inclusión y colaboración como base de la solución y
                transformación digital, buscando así generar cercanía, empatía y
                aceptabilidad de los nuevos medios de interacción
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
