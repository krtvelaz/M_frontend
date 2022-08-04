import { Carousel } from "antd";

const CarouselMedeinn = () => {
  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <>
      <Carousel afterChange={onChange}>
        <div>
          <div className="container-carrusel">
            <div className="content-carrousel">
              <h2>Ideas y soluciones para una sociedad en evolución</h2>
              <p>
                Contenido descriptivo. Para esta sección es importante resumir
                el contenido o dar la idea principal sobre lo que se encontrará
                al dar clic. Esto permitirá entender por parte del usuario si el
                contenido es de su interés.
              </p>
            </div>
          </div>
          <img
            src="src/utils/assets/img/imagen.png"
            className="d-block w-100"
            alt="imagen"
          />
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div>
              <div className="container-carrusel">
                <div className="content-carrousel">
                  <h2>Ideas y soluciones para una sociedad en evolución</h2>
                  <p>
                    Contenido descriptivo. Para esta sección es importante
                    resumir el contenido o dar la idea principal sobre lo que se
                    encontrará al dar clic. Esto permitirá entender por parte
                    del usuario si el contenido es de su interés.
                  </p>
                </div>
              </div>
              <img
                src="src/utils/assets/img/imagen.png"
                className="d-block w-100"
                alt="imagen"
              />
            </div>
          </div>
          <div className="carousel-item">
            {/* <img src="..." className="d-block w-100" alt="..."> */}
          </div>
          <div className="carousel-item">
            {/* <img src="..." className="d-block w-100" alt="..."> */}
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default CarouselMedeinn;
