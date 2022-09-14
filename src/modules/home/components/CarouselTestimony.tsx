import 'bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../banner/redux';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { arrowLeft, arrowRight } from '../../../utils/assets/img';

const CarouselTestimony = () => {
    const navigate = useNavigate();
    const [images, setTestimonyImages] = useState<any[]>([]);
    const [logos, setTestimonyLogos] = useState<any[]>([]);
    const dispatch = useDispatch<any>();
    const data = useSelector((store: any) => store.banner.testimonials.value);
    useEffect(() => {
        getTestimony();
    }, []);

    const getTestimony = async () => {
        try {
            const results = await dispatch(actions.get_list_testimonials());

            if (results.length > 0) {
                const images = await Promise.all(
                    results.map((result: any) => dispatch(actions.get_document_testimonial(result?.id, "img")))
                );
                const logos = await Promise.all(
                    results.map((result: any) => dispatch(actions.get_document_testimonial(result?.id, "logo")))
                );
                setTestimonyImages(images.map((image) => Buffer.from(image).toString('base64')));
                setTestimonyLogos(logos.map((logo) => Buffer.from(logo).toString('base64')));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div >
                <div
                    id="carouselTestimony"
                    className=" carousel slide "
                    data-bs-interval="false"
                    data-ride="carousel"
                    data-pause="hover"
                >
                    {data?.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carrousel-${item?.id}`}>
                            <div className="row">
                                <div className="col-8 col-md-6 col-lg-4">
                                    <img
                                        src={`data:image/jpeg;charset=utf-8;base64,${images[i]}`}
                                        className="w-100 h-100"
                                        style={{ height: '100%' }}
                                        alt="img"
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 pt-5">
                                    <div className="row  col-6 mb-5">
                                        <img
                                            src={`data:image/jpeg;charset=utf-8;base64,${logos[i]}`}
                                            className="w-100 h-100"
                                            style={{ height: '100%' }}
                                            alt="logo"
                                        />
                                    </div>
                                    <div className="row mb-5">
                                        <h2 className='text-stake'>{item?.tes_titulo}</h2>
                                        <p>{item?.tes_descripcion}</p>
                                    </div>

                                    <div>
                                        <button style={{position:'relative', zIndex:'1'}} className="btn btn-primary-orange mb-5" onClick={() => {
                                            navigate(`../our-challenges`, { replace: true });
                                        }}>Conoce los retos</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'relative', bottom: '-360px', right: '100px', textAlign: 'end' }}>
                    <div
                        data-bs-target="#carouselTestimony"
                        data-bs-slide="prev"
                        style={{ marginRight: '50px', cursor: 'pointer' }}
                    >
                        <img src={arrowLeft} alt="flecha izquierda" />
                        <span className="visually-hidden">Anterior</span>
                    </div>

                    <div
                        data-bs-target="#carouselTestimony"
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

export default CarouselTestimony