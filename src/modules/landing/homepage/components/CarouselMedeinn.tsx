import { Carousel } from "antd";

const CarouselMedeinn = () => {
  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel>
      <div>
        <h2>Ideas y soluciones para una sociedad en evolución</h2>
        <p>
          Contenido descriptivo. Para esta sección es importante resumir el
          contenido o dar la idea principal sobre lo que se encontrará al dar
          clic. Esto permitirá entender por parte del usuario si el contenido es
          de su interés.
        </p>
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
  );
};

export default CarouselMedeinn;
