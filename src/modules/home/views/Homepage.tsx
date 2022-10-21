import { useContext } from 'react';
import { figurasFondo, fondo_retos, grupo_personas, rocket, trazado_amarillo } from '../../../utils/assets/img';
import StatisticsLanding from '../../banner/components/statistics/StatisticsLanding';
import CarouselMedeinn from '../components/CarouselMedeinn';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import StaticInformation from '../components/StaticInformation';
import PublishedChallenges from '../../challenge/components/PublishedChallenges';
import TabPulications from '../../publication/views/TabPulications';
import FormContact from '../components/FormContact';
import FormSuscribe from '../components/FormSuscribe';
import FrequentlyQuestions from '../components/FrequentlyQuestions';
import CarouselTestimony from '../components/CarouselTestimony';
import Map from '../../../utils/components/arcgis/Map';
import { useSelector } from 'react-redux';
import CarouselEvent from '../../event/compenents/CarouselEvent';

const Homepage = () => {
    const context = useContext(TemplateContext);
    const publications = useSelector((store: any) => store.publication.list_publication.value);
    return (
        <>
            <section>
                <div className="row align-items-center">
                    {context.device === 'lg' && (
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
                <img src={fondo_retos} alt="letras medeinn" className="imagen-fondo" />
                {context.device === 'lg' && (
                    <img src={grupo_personas} alt="grupo personas" className="imagen-grupo-personas" />
                )}
                <div className="container">
                    <StaticInformation />
                    <PublishedChallenges />
                </div>
            </section>

            <section className="section-events">
                <img src={figurasFondo} alt="fihuras de fondo" className="figuras-fondo" />
                {publications?.length > 0 && <img src={trazado_amarillo} alt="trazado" className="image-amarilla" />}
                <div className="imagen-fondo-events">
                    <div className="text-white text-center container-cards-events" style={{ padding: '3rem 0 1rem 0' }}>
                        Eventos más cercanos
                    </div>
                    <CarouselEvent />
                    <div className="text-center  pb-5">
                        <a
                            style={{ position: 'relative', zIndex: 1, bottom: '5px' }}
                            href="/calendar-events"
                            className="text-white"
                        >
                            Ver calendario de eventos
                        </a>
                    </div>
                </div>
                <div className="container">
                    <div className=" py-5">
                        <div className="text-center">
                            <div className="text-white" style={{ fontSize: '16px' }}>
                                {' '}
                                <span style={{ fontSize: '16px', fontFamily: 'Montserrat-Bold' }}>Suscríbete</span> a
                                nuestros boletines de noticias y eventos{' '}
                            </div>
                            <a className="text-center" href="" style={{ color: '#FFDC2F' }}>
                                Al dar click en Suscríbete ahora, acepte los términos y condiciones
                            </a>
                        </div>

                        <div className=" mt-5 mx-auto">
                            <FormSuscribe />
                        </div>
                        <TabPulications />
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row" style={{ background: '#E4EFF0' }}>
                        <CarouselTestimony />
                    </div>
                </div>
            </section>

            <section style={{ background: '#FFFFFF' }}>
                <div className="container pt-4 ">
                    <div className="row justify-content-center container ">
                        <div className="text-center mb-3">
                            <span className="text-stake-mediun">Dudas o preguntas</span>
                            <h1 className="text-stake">Contáctanos</h1>
                        </div>
                        <p className="mb-4">
                            Dudas o inquietudes con respecto a nuestras convocatorias, eventos o publicaciones que
                            realicemos, estamos atentos para darte una respuesta. Si tienes alguna duda o pregunta,
                            completa el siguiente formulario. Todos los campos son requeridos.
                        </p>
                        <div className="mb-3  col-12">
                            <FormContact />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Map />
            </section>
            <section style={{ background: '#FFFFFF' }}>
                <div className="container">
                    <FrequentlyQuestions />
                </div>
            </section>
        </>
    );
};

export default Homepage;
