import { Carousel } from "antd";
import "bootstrap";

const CarouselMedeinn = () => {
  const contentStyle: React.CSSProperties = {
    height: "200px",
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner" style={{height: '200px'}}>
          <div className="carousel-item active">
            <div className="container-carrusel">
              <div className="content-carrousel">
                <h2>Ideas y soluciones para una sociedad en evolución</h2>
                <p>
                  Contenido descriptivo. Para esta sección es importante resumir
                  el contenido o dar la idea principal sobre lo que se
                  encontrará al dar clic. Esto permitirá entender por parte del
                  usuario si el contenido es de su interés.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-9">
                <img
                  src="src/utils/assets/img/imagen.png"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container-carrusel">
              <div className="content-carrousel">
                <h2>Ideas y soluciones para una sociedad en evolución</h2>
                <p>
                  Contenido descriptivo. Para esta sección es importante resumir
                  el contenido o dar la idea principal sobre lo que se
                  encontrará al dar clic. Esto permitirá entender por parte del
                  usuario si el contenido es de su interés.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-9">
                <img
                  src="src/utils/assets/img/imagen 52.png"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselMedeinn;
