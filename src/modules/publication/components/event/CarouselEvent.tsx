import { Pagination } from 'antd';
import 'bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrowLeft, arrowRight } from '../../../../utils/assets/img';
import { actions } from '../../redux';
import CardEvent from './CardEvent';
import PopoverEvent from './PopoverEvent';
const CarouselEvent = () => {
    const data = [1];
    const dispatch = useDispatch<any>();
    const events = useSelector((store: any) => store.event.list_event.value);
    const {total} = useSelector((store: any) => store.event.list_event.pagination);
    const number_pages = Number(total)/3;
    

    useEffect(() => {
        dispatch(actions.get_list_events({ page: 1, page_size: 3, only: 'published' }));
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
                    {data.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carousel-events-${item?.id}`}>
                            <div className="container">
                                <div className="row">
                                    {events.map((event: any) => (
                                        <div className="col-12 col-md-4 col-lg-4">
                                            <CardEvent event={event} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'relative', bottom: '5px', right: '100px', textAlign: 'end' }}>
                    <div
                        data-bs-target="#carouselEvents"
                        data-bs-slide="prev"
                        style={{ marginRight: '50px', cursor: 'pointer' }}
                    >
                        <img src={arrowLeft} alt="flecha izquierda" />
                        <span className="visually-hidden">Anterior</span>
                    </div>

                    <div
                        data-bs-target="#carouselEvents"
                        data-bs-slide="next"
                        className="ms-5"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={arrowRight} alt="flecha izquierda" />
                        <span className="visually-hidden">Siguiente</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarouselEvent;
