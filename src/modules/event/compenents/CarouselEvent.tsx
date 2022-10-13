import 'bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowLeft from '../../../utils/assets/img/ArrowLeft';
import ArrowRight from '../../../utils/assets/img/ArrowRight';
import { actions } from '../redux';
import CardEvent from './CardEvent';
import ComponetLoading from './ComponetLoading';

const CarouselEvent = () => {
    const dispatch = useDispatch<any>();
    const events = useSelector((store: any) => store.event.list_event.value);
    const loading = useSelector((store: any) => store.event.list_event.loading);
    const { total } = useSelector((store: any) => store.event.list_event.pagination);
    const { current_page } = useSelector((store: any) => store.event.list_event.pagination);
    const { last_page } = useSelector((store: any) => store.event.list_event.pagination);
    const { first_page } = useSelector((store: any) => store.event.list_event.pagination);
    const number_pages = Number(total) / 3;
    let paginationCarousel: any[] = [1];

    for (let i = 1; i <= Math.ceil(number_pages); i++) {
        paginationCarousel = [...paginationCarousel, i];
    }

    const get_events = async (page: number) => {
        await dispatch(actions.get_list_events({ page, page_size: 3, is_published: true }));
    };

    useEffect(() => {
        dispatch(actions.get_list_events({ page: 1, page_size: 3, is_published: true }));
    }, []);

    return (
        <>
            <div
                id="carouselEvents"
                className="carousel slide"
                data-bs-interval="false"
                data-ride="carousel"
                data-pause="hover"
            >
                <div className="carousel-inner">
                    {paginationCarousel.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carousel-events-${i}`}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {events.length > 0 ? (
                                        events.map((event: any, index: number) => (
                                            <div className="col-12 col-md-4 col-lg-4" key={`card-event-${index}`}>
                                                <CardEvent event={event} />
                                            </div>
                                        ))
                                    ) : (
                                        <ComponetLoading title="No hay eventos publicados" loading={false} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {number_pages > 1 && (
                    <div style={{ position: 'relative', bottom: '5px', right: '100px', textAlign: 'end' }}>
                        <div
                            data-bs-target="#carouselEvents"
                            data-bs-slide="prev"
                            style={{ marginRight: '50px', cursor: 'pointer' }}
                            onClick={() => {
                                setTimeout(function () {
                                    get_events(current_page - 1 >= first_page ? current_page - 1 : last_page);
                                }, 200);
                            }}
                        >
                            <ArrowLeft color_fill={'#FFFFFF'} />
                            <span className="visually-hidden">Anterior</span>
                        </div>

                        <div
                            data-bs-target="#carouselEvents"
                            data-bs-slide="next"
                            className="ms-5"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setTimeout(function () {
                                    get_events(current_page + 1 <= last_page ? current_page + 1 : first_page);
                                }, 200);
                            }}
                        >
                            <ArrowRight color_fill="#ffffff" />
                            <span className="visually-hidden">Siguiente</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CarouselEvent;
