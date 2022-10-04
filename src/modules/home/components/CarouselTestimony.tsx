import 'bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../banner/redux';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import ArrowRight from '../../../utils/assets/img/ArrowRight';
import ArrowLeft from '../../../utils/assets/img/ArrowLeft';

const CarouselTestimony = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const data = useSelector((store: any) => store.banner.testimonials.value);
    useEffect(() => {
        getTestimony();
    }, []);

    const getTestimony = async () => {
        try {
            await dispatch(
                actions.get_list_testimonials({
                    page: 1,
                    page_size: 4,
                    order_by_key: 'tes_order',
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
            <div
                id="carouselTestimonials"
                className="carousel slide"
                data-bs-interval="false"
                data-ride="carousel"
                data-pause="hover"
            >
                <div className="carousel-inner">
                    {data?.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carrousel-${item?.id}`}>
                            <div className="row mt-5">
                                <div className="col-lg-4">
                                    {item?.tes_image_buffer?.data ? (
                                        <img
                                            src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                                item?.tes_image_buffer?.data
                                            ).toString('base64')}`}
                                            // className="w-100 h-100 mt-5"
                                            style={{minHeight: '100px'}}
                                            alt="imagen"
                                        />
                                    ) : (
                                        <Skeleton.Image className="w-100 h-100" active />
                                    )}
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 pt-5">
                                    <div className="row  col-6 mb-5">
                                        {item?.tes_logo_buffer?.data ? (
                                            <img
                                                src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                                    item?.tes_logo_buffer?.data
                                                ).toString('base64')}`}
                                                className="w-100 h-100"
                                                alt="logo"
                                            />
                                        ) : (
                                            <Skeleton.Image className="w-100 h-100" active />
                                        )}
                                    </div>
                                    <div className="row mb-5">
                                        <h2 className="text-stake">{item?.tes_title}</h2>
                                        <p>{item?.tes_description}</p>
                                    </div>

                                    <div>
                                        <button
                                            className="btn btn-primary-orange mb-5"
                                            onClick={() => {
                                                navigate(`../challenge`, { replace: true });
                                            }}
                                        >
                                            Conoce los retos
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'relative', bottom: '50px', right: '0px', textAlign: 'end' }}>
                    <div
                        data-bs-target="#carouselTestimonials"
                        data-bs-slide="prev"
                        style={{ marginRight: '50px', cursor: 'pointer' }}
                       
                    >
                        <ArrowLeft color_fill={'#603CE6'} />
                        <span className="visually-hidden">Anterior</span>
                    </div>

                    <div
                        data-bs-target="#carouselTestimonials"
                        data-bs-slide="next"
                        className="ms-5"
                        style={{ cursor: 'pointer' }}
                       
                    >
                        <ArrowRight color_fill="#603CE6" />
                        <span className="visually-hidden">Siguiente</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarouselTestimony;
