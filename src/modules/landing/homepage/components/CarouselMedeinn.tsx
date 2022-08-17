import "bootstrap";
import { useContext } from "react";
import { TemplateContext } from "../../../../utils/components/template/templateContext";
import ModalVideo from "./ModalVideo";

const CarouselMedeinn = () => {
  const context = useContext(TemplateContext);

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
        <div className="carousel-inner" >
          <div className="carousel-item active">
            <div className="row container-carrousel">
              <div className="col-12 col-md-12 col-lg-4 content-carrousel">
                <h2>Ideas y soluciones para una sociedad en evolución</h2>
                <p>
                  Contenido descriptivo. Para esta sección es importante resumir
                  el contenido o dar la idea principal sobre lo que se
                  encontrará al dar clic. Esto permitirá entender por parte del
                  usuario si el contenido es de su interés.
                </p>
                
                <div><ModalVideo /></div>
              </div>
              <div className="col-12  col-md-12 col-lg-8" style={{height: '500px'}}>
                <div className="contenedor-magen-carrusel">
                  <img
                    src="https://images.pexels.com/photos/904272/pexels-photo-904272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="w-100"
                    style={{height: '100%'}}
                    alt="imagen"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row container-carrousel">
              <div className="col-12 col-md-12 col-lg-4 content-carrousel" >
                <h2>Ideas y soluciones para una sociedad en evolución</h2>
                <p>
                  Contenido descriptivo. Para esta sección es importante resumir
                  el contenido o dar la idea principal sobre lo que se
                  encontrará al dar clic. Esto permitirá entender por parte del
                  usuario si el contenido es de su interés.
                </p>
                <div><ModalVideo /></div>
              </div>
              <div className="col-12  col-md-12 col-lg-8"  style={{height: '500px'}}>
                <div className="contenedor-magen-carrusel">
                  <img
                    src="https://images.pexels.com/photos/6771740/pexels-photo-6771740.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="w-100"
                    style={{height: '100%'}}
                    alt="imagen"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselMedeinn;
