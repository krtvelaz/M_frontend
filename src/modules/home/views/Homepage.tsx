import { useContext } from 'react';
import { arrowLeft, arrowRight, figurasFondo, fondo_retos, grupo_personas, rocket, trazado_amarillo } from '../../../utils/assets/img';
import StatisticsLanding from '../../banner/components/StatisticsLanding';
import CarouselMedeinn from '../components/CarouselMedeinn';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import StaticInformation from '../components/StaticInformation';
import PublishedChallenges from '../../challenge/components/PublishedChallenges';
import { Card } from '../../../utils/ui';
import TabPulications from '../../publication/views/TabPulications';
import FormContact from '../components/FormContact';
import FormSuscribe from '../components/FormSuscribe';
import FrequentlyQuestions from '../components/FrequentlyQuestions';
import CarouselTestimony from '../components/CarouselTestimony';

const Homepage = () => {
    const context = useContext(TemplateContext);

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
                <img src={trazado_amarillo} alt="trazado" className="image-amarilla" />
                <div className="imagen-fondo-events">
                    <div className="container">
                        <div
                            className="text-white text-center container-cards-events"
                            style={{ padding: '3rem 0 1rem 0' }}
                        >
                            Eventos más cercanos
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-4">
                                <Card
                                    className="card-event"
                                    actions={[
                                        <div className="mb-3 d-flex justify-content-end">
                                            <button className="btn-cupos-primary me-5">Cupos limitados</button>
                                            <button className="btn btn-primary me-3">Asistiré</button>
                                        </div>,
                                    ]}
                                >
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-3">
                                            <div
                                                className="text-white text-center date-event"
                                                style={{ lineHeight: 1 }}
                                            >
                                                AGO{' '}
                                                <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>
                                                    05
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 col-lg-9">
                                            <div className="title-card-event">
                                                Título del evento próximo, no debe sobrepasar dos líneas
                                            </div>
                                            <p>
                                                Agregar contenido descriptivo para esta sección donde se pueda entender
                                                por parte del usuario si el contenido es de su interés.
                                            </p>
                                            <div className="my-4">Lugar del evento</div>

                                            <span>3: 00 pm</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <Card
                                    className="card-event"
                                    actions={[
                                        <div className="mb-3 d-flex justify-content-end">
                                            <button className="btn-cupos-primary me-5">Cupos limitados</button>
                                            <button className="btn btn-primary me-3">Asistiré</button>
                                        </div>,
                                    ]}
                                >
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-3">
                                            <div
                                                className="text-white text-center date-event"
                                                style={{ lineHeight: 1 }}
                                            >
                                                AGO{' '}
                                                <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>
                                                    05
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 col-lg-9">
                                            <div className="title-card-event">
                                                Título del evento próximo, no debe sobrepasar dos líneas
                                            </div>
                                            <p>
                                                Agregar contenido descriptivo para esta sección donde se pueda entender
                                                por parte del usuario si el contenido es de su interés.
                                            </p>
                                            <div className="my-4">Lugar del evento</div>

                                            <span>3: 00 pm</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <Card
                                    className="card-event"
                                    actions={[
                                        <div className="mb-3 d-flex justify-content-end">
                                            <button className="btn-cupos-primary me-5">Cupos limitados</button>
                                            <button className="btn btn-primary me-3">Asistiré</button>
                                        </div>,
                                    ]}
                                >
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-3">
                                            <div
                                                className="text-white text-center date-event"
                                                style={{ lineHeight: 1 }}
                                            >
                                                AGO{' '}
                                                <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>
                                                    05
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 col-lg-9">
                                            <div className="title-card-event">
                                                Título del evento próximo, no debe sobrepasar dos líneas
                                            </div>
                                            <p>
                                                Agregar contenido descriptivo para esta sección donde se pueda entender
                                                por parte del usuario si el contenido es de su interés.
                                            </p>
                                            <div className="my-4">Lugar del evento</div>

                                            <span>3: 00 pm</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div className="text-center  py-5">
                            <a href="/calendar-events" className="text-white">
                                Ver calendario de eventos
                            </a>
                        </div>
                        <div className='text-right' style={{position: 'relative', bottom: '70px'}}>
                            <img src={arrowLeft} alt="flecha izquierda"  />
                            <img src={arrowRight} className='mt-5' alt="flecha izquierda"/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="text-center py-5">
                        <div className="text-white" style={{ fontSize: '16px' }}>
                            {' '}
                            <span style={{ fontSize: '16px', fontFamily: 'Montserrat-Bold' }}>Suscríbete</span> a
                            nuestros botines de noticias y eventos{' '}
                        </div>
                        <a href="" style={{ color: '#FFDC2F' }}>
                            Al dar click en suscribirme ahora, acepta los términos y condiciones
                        </a>
                        <div className=" mt-5">
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
                    <div className="row justify-content-center ">
                        <div className="text-center mb-3">
                            <span className="text-stake-mediun">Dudas o preguntas</span>
                            <h1 className="text-stake">Contáctanos</h1>
                        </div>
                        <p className="mb-4">
                            Dudas o inquietudes con respecto a nuestras convocatorias, eventos o publicaciones que
                            realicemos, estamos atentos para darte una respuesta. Si tienes alguna duda o pregunta,
                            completa el siguiente formulario. Todos los campos son requeridos.
                        </p>
                        <div className="container mb-3  col-10 ">
                            <FormContact />
                        </div>
                    </div>
                </div>
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
