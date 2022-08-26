import Card from "../components/Card";
import { challenges, publications, LandingPage, calendar } from "../../../utils/assets/img";

const Home = () => {
  return (
    <>
      <section className="pt-5" id="texto-superior">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4>Bienvenido(a) al sistema de administración de Medeinn</h4>
              <p className="mb-5">
                Desde aquí podrás elegir los módulos para gestionar el contenido
                del portal MedeInn Laboratorio de innovación.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="content-cards">
        <section id="cards">
          <div className="container">
            <div className="row ">
              <Card
                name="Retos"
                image={challenges}
                links={[
                  {
                    name: "Crear nuevo reto",
                    to: "/",
                  },
                  {
                    name: "Consultar y gestionar retos",
                    to: "/",
                  },
                  {
                    name: "Gestionar postulaciones",
                    to: "/",
                  },
                ]}
              />
              <Card
                name="Publicaciones"
                image={publications}
                links={[
                  {
                    name: "Crear noticia",
                    to: "/",
                  },
                  {
                    name: "Crear evento",
                    to: "/",
                  },
                  {
                    name: "Gestionar publicaciones",
                    to: "/",
                  },
                ]}
              />
              <Card
                name="Landing page"
                image={LandingPage}
                links={[
                  {
                    name: "Carrusel de banners principal",
                    to: "/",
                  },
                  {
                    name: "Editar indicadores",
                    to: "/",
                  },
                  {
                    name: "Carrusel testimonios",
                    to: "/",
                  },
                ]}
              />
              <Card
                name="Calendario de Eventos"
                image={calendar}
                links={[
                  {
                    name: "Crear nuevo evento",
                    to: "/",
                  },
                  {
                    name: "Consultar y gestionar eventos",
                    to: "/",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
