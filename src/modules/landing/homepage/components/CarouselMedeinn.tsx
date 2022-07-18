import { Carousel } from "antd";
import { Link } from "../../../../utils/ui";

const CarouselMedeinn = () => {
  const contentStyle: React.CSSProperties = {
    height: "360px",
    color: "#fff",
    lineHeight: "360px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel autoplay>
      <div className="sobre-nosotros">
        <div className="contenedor sobre-nosotros-grid">
          <div className="texto-nosotros">
            <h2>Ideas y soluciones para una sociedad en evolución</h2>
            <p>
              Contenido descriptivo. Para esta sección es importante resumir el
              contenido o dar la idea principal sobre lo que se encontrará al
              dar clic. Esto permitirá entender por parte del usuario si el
              contenido es de su interés.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                marginLeft: '30px'
              }}
              onClick={() => {}}
            >
              Conoce más
            </button>
          </div>
        </div>
      </div>
      <div className="sobre-nosotros">
        <div className="contenedor sobre-nosotros-grid">
          <div className="texto-nosotros">
            <h2>Ideas y soluciones para una sociedad en evolución</h2>
            <p>
              Contenido descriptivo. Para esta sección es importante resumir el
              contenido o dar la idea principal sobre lo que se encontrará al
              dar clic. Esto permitirá entender por parte del usuario si el
              contenido es de su interés.
            </p>
            <Link to="/challenge/create" name="Presentación" iconText="+" />
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                marginLeft: '30px'
              }}
              onClick={() => {}}
              
            >
              Conoce más
            </button>
          </div>
        </div>
      </div>
      <div className="sobre-nosotros">
        <div className="contenedor sobre-nosotros-grid">
          <div className="texto-nosotros">
            <h2>Ideas y soluciones para una sociedad en evolución</h2>
            <p>
              Contenido descriptivo. Para esta sección es importante resumir el
              contenido o dar la idea principal sobre lo que se encontrará al
              dar clic. Esto permitirá entender por parte del usuario si el
              contenido es de su interés.
            </p>
            <Link to="/challenge/create" name="Presentación" iconText="+" />
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                marginLeft: '30px'
              }}
              onClick={() => {}}
            >
              Conoce más
            </button>
          </div>
        </div>
      </div>
      <div className="sobre-nosotros">
        <div className="contenedor sobre-nosotros-grid">
          <div className="texto-nosotros">
            <h2>Ideas y soluciones para una sociedad en evolución</h2>
            <p>
              Contenido descriptivo. Para esta sección es importante resumir el
              contenido o dar la idea principal sobre lo que se encontrará al
              dar clic. Esto permitirá entender por parte del usuario si el
              contenido es de su interés.
            </p>
            <Link to="/challenge/create" name="Presentación" iconText="+" />
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                marginLeft: '30px'
              }}
              onClick={() => {}}
            >
              Conoce más
            </button>
          </div>
        </div>
      </div>
      
    </Carousel>
  );
};

export default CarouselMedeinn;
