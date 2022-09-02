const CarouselTestimony = () => {
    const data = [1,2,3]
  return (
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
                            <div className="row">
                                <div className="col"></div>
                            </div>
                            <div className="row container-carrousel">
                                <div className="col-12 col-md-12 col-lg-4 content-carrousel">
                                    <h2>{item?.car_titulo}</h2>
                                    <p>{item?.car_descripcion}</p>

                                    {/* {item?.car_url_video && <ModalVideo urlVideo={item?.car_url_video} />} */}
{/* 
                                    {item?.car_url && <button className="btn btn-outline-primary ms-5" onClick={()=>{                                        
                                        navigate(`..${item?.car_url}`);
                                    }}>Conoce más</button>} */}
                                </div>
                                <div className="col-12  col-md-12 col-lg-8 height-carousel">
                                    <div className="contenedor-magen-carrusel">
                                        <img
                                            src={'https://images.pexels.com/photos/6146949/pexels-photo-6146949.jpeg?auto=compress&cs=tinysrgb&w=600'}
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
            </div>
  )
}

export default CarouselTestimony
