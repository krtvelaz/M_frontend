import Card from '../components/Card';
import { challenges, publications, LandingPage, calendar } from '../../../utils/assets/img';

const Home = () => {
    return (
        <div
        style={{
            height: 'inherit',
            backgroundImage:
                "linear-gradient(to right, #F7FBFF 35%, transparent),url('src/utils/assets/img/imageHome.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundSize: '100%',
            position: 'relative',
            overflow: 'hidden',
        }}
        >
            <section className="pt-5" id="texto-superior">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>Bienvenido(a) al sistema de administración de Medeinn</h4>
                            <p className="mb-5">
                                Desde aquí podrás elegir los módulos para gestionar el contenido del portal MedeInn
                                Laboratorio de innovación.
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
                                        name: 'Crear nuevo reto',
                                        to: '/challenge/create',
                                    },
                                    {
                                        name: 'Consultar y gestionar retos',
                                        to: '/challenge/list',
                                    },
                                    {
                                        name: 'Gestionar postulaciones',
                                        to: '/list/postulations',
                                    },
                                ]}
                            />
                            <Card
                                name="Publicaciones"
                                image={publications}
                                links={[
                                    {
                                        name: 'Crear noticia',
                                        to: '/publication/create',
                                    },
                                    {
                                        name: 'Crear evento',
                                        to: '/event/create',
                                    },
                                    {
                                        name: 'Gestionar publicaciones',
                                        to: '/publication/list',
                                    },
                                ]}
                            />
                            <Card
                                name="Landing page"
                                image={LandingPage}
                                links={[
                                    {
                                        name: 'Carrusel de banners principal',
                                        to: '/banners/create',
                                    },
                                    {
                                        name: 'Editar indicadores',
                                        to: '/indicator/create',
                                    },
                                    {
                                        name: 'Carrusel testimonios',
                                        to: '/testimony/create',
                                    },
                                ]}
                            />
                            <Card
                                name="Calendario de Eventos"
                                image={calendar}
                                links={[
                                    {
                                        name: 'Crear nuevo evento',
                                        to: '/',
                                    },
                                    {
                                        name: 'Consultar y gestionar eventos',
                                        to: '/',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
