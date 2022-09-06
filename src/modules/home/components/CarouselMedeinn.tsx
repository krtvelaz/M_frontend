import 'bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../banner/redux';
import ModalVideo from './ModalVideo';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { arrowLeft, arrowRight } from '../../../utils/assets/img';

const CarouselMedeinn = () => {
    const navigate = useNavigate();
    const [images, setBannerImages] = useState<any[]>([]);
    const dispatch = useDispatch<any>();
    const data = useSelector((store: any) => store.banner.list_banners.value);
    useEffect(() => {
        getBanner();
    }, []);

    // const data = [2];

    const getBanner = async () => {
        try {
            const results = await dispatch(actions.get_list_banners());

            if (results.length > 0) {
                const images = await Promise.all(
                    results.map((result: any) => dispatch(actions.get_image_banner(result?.id)))
                );
                setBannerImages(images.map((image) => Buffer.from(image).toString('base64')));
            }
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
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {data?.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carrousel-${item?.id}`}>
                            <div className="row container-carrousel">
                                <div className="col-12 col-md-12 col-lg-4 content-carrousel">
                                    <h2>{item?.car_titulo}</h2>
                                    <p>{item?.car_descripcion}</p>

                                    {item?.car_url_video ? <ModalVideo urlVideo={item?.car_url_video} /> : null}

                                    {item?.car_url && (
                                        <button
                                            className="btn btn-outline-primary ms-5"
                                            onClick={() => {
                                                navigate(`..${item?.car_url}`);
                                            }}
                                        >
                                            Conoce más
                                        </button>
                                    )}
                                    {/* <div className="" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                                        <img src={arrowLeft} alt="flecha izquierda" />
                                        <span className="visually-hidden">Anterior</span>
                                    </div>
                                    <div data-bs-target="#carouselIndicators" data-bs-slide="next">
                                        <img src={arrowRight} alt="flecha derecha" />
                                        <span className="visually-hidden">Siguiente</span>
                                    </div> */}
                                </div>
                                <div className="col-12  col-md-12 col-lg-8 height-carousel">
                                    <div className="contenedor-magen-carrusel">
                                        <img
                                            src={`data:image/jpeg;charset=utf-8;base64,${images[i]}`}
                                            className="w-100 h-100"
                                            style={{ height: '100%' }}
                                            alt="imagen"
                                        />
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
                    <img src={arrowRight} alt="flecha izquierda" className='w-100' />
                    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>
        </>
    );
};

export default CarouselMedeinn;
