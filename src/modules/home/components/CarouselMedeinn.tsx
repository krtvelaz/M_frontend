import 'bootstrap';
import { useEffect,useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../banner/redux';
import ModalVideo from './ModalVideo';
import { Buffer } from 'buffer';
import ArrowLeft from '../../../utils/assets/img/ArrowLeft';
import ArrowRight from '../../../utils/assets/img/ArrowRight';
import { TemplateContext } from '../../../utils/components/template/templateContext';

const CarouselMedeinn = () => {
    const context = useContext(TemplateContext);
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
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {data?.map((item: any, i: number) => (
                        <div className={` carousel-item${i === 0 ? ' active' : ''}`} key={`carrousel-${item?.id}`}>
                            <div className="row container-carrousel">
                                <div className=" col-12 col-md-12 col-lg-4 content-carrousel">
                                    <h2>{item?.ban_title}</h2>
                                    <p>{item?.ban_description}</p>

                                    <div className='actions__carrousel'>
                                        {item?.ban_embedded_video ? (
                                            <ModalVideo urlVideo={item?.ban_embedded_video} />
                                        ) : null}
                                        
                                        {item?.ban_reference_url && (
                                            <a
                                                href={`${item?.ban_reference_url}`}
                                                target="_blank"
                                                className={`btn btn-outline-landing-primary ${item?.ban_embedded_video ? 'ms-5' : ''}`}
                                            >
                                                Conoce más
                                            </a>
                                        )}
                                    </div>
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
                    <div style={{ position: 'absolute', bottom: context.device === 'lg' ? '100px' : '-12px', left: context.device === 'lg' ? '0' : '20px', textAlign: 'end' }} className='carousel__arrows'>
                        <div
                            data-bs-target="#carouselIndicators"
                            data-bs-slide="prev"
                            style={{ marginRight: '50px', cursor: 'pointer' }}
                        >
                            <ArrowLeft color_fill={'#000'} />
                            <span className="visually-hidden">Anterior</span>
                        </div>

                        <div
                            data-bs-target="#carouselIndicators"
                            data-bs-slide="next"
                            className="ms-5"
                            style={{ cursor: 'pointer' }}
                        >
                            <ArrowRight color_fill="#000" />
                            <span className="visually-hidden">Siguiente</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarouselMedeinn;
