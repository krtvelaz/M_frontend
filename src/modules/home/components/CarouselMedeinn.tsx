import 'bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../banner/redux';
import ModalVideo from './ModalVideo';
import { Buffer } from 'buffer';
import { arrowLeft, arrowRight } from '../../../utils/assets/img';

const CarouselMedeinn = () => {
    const dispatch = useDispatch<any>();
    const data = useSelector((store: any) => store.banner.list_banners.value);
    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        try {
            await dispatch(
                actions.get_list_banners({
                    page: 1,
                    page_size: 4,
                    order_by_key: 'ban_order',
                    order_by_value: 'asc',
                    from: 'landing',
                })
            );
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div id="carouselIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {data?.map((_: any, i: number) => (
                        <button
                            type="button"
                            data-bs-target="#carouselIndicators"
                            data-bs-slide-to={`${i}`}
                            key={`button-carousel-${i}`}
                            className={`${i === 0 ? 'active' : ''}`}
                            aria-current={`${i === 0 ? 'true' : 'false'}`}
                            aria-label={`Slide ${i + 1}`}
                        >

                        </button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {data?.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carrousel-${item?.id}`}>
                            <div className="row container-carrousel">
                                <div className="col-12 col-md-12 col-lg-4 content-carrousel">
                                    <h2>{item?.ban_title}</h2>
                                    <p>{item?.ban_description}</p>

                                    {item?.ban_embedded_video ? (
                                        <ModalVideo urlVideo={item?.ban_embedded_video} />
                                    ) : null}

                                    {item?.ban_reference_url && (
                                        <a href={`${item?.ban_reference_url}`} target="_blank" className="btn btn-outline-landing-primary ms-5">
                                            Conoce más
                                        </a>
                                    )}
                                </div>
                                <div className="col-12  col-md-12 col-lg-8 height-carousel">
                                    <div className="contenedor-magen-carrusel">
                                        {item?.cha_background_image_buffer?.data && (
                                            <img
                                                src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                                    item?.cha_background_image_buffer?.data
                                                ).toString('base64')}`}
                                                className="w-100 h-100"
                                                style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                                                alt="imagen"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide="prev"
                >
                    <img src={arrowLeft} alt="flecha izquierda" />
                    {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide="next"
                >
                    <img src={arrowRight} alt="flecha izquierda" className="w-100" />
                    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>
        </>
    );
};

export default CarouselMedeinn;
