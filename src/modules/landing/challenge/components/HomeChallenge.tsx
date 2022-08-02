import { Card, Popover, Tooltip } from "antd";
import { lamp } from "../../../../utils/assets/img";

const HomeChallenge = () => {
  const contenido = (
    <div>
      <div className="row">
        <div className="col-4">
            <img  src="" alt='imagen'/>
        </div>
        <div className="col">
          {" "}
          <span>Explicación breve</span>
          <p>
            Contenido descriptivo. Para esta sección es importante resumir el
            contenido o dar la idea principal sobre lo que se encontrará al dar
            clic. Esto permitirá entender por parte del usuario si el contenido
            es de su interés.
          </p>
          <p>
            Contenido descriptivo. Para esta sección es importante resumir el
            contenido o dar la idea principal sobre lo que se encontrará al dar
            clic. Esto permitirá entender por parte del usuario si el contenido
            es de su interés. Contenido descriptivo. Para esta sección es
            importante resumir el contenido o dar la idea principal sobre lo que
            se encontrará al dar clic. Esto permitirá entender por parte del
            usuario si el contenido es de su interés.
          </p>
          <div className="bg-white d-flex flex-row justify-content-start">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {}}
            >
              Conoce más
            </button>
            <button
              type="button"
              className="ms-3 btn btn-primary"
              onClick={() => {}}
            >
              Entiendo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      algo aqui
      <div className="row">
        <div className="col">
          <h2>
            Nuestro proceso de innovación abierta Participación por un
            Territorio Inteligente.
          </h2>
          <p>
            Metodología basada en compras públicas para la Innovación que,
            conectando soluciones con retos del territorio, busca fortalecer el
            ecosistema GovTech y generar valor público para Medellín.
          </p>
        </div>
        <div className="col">
          <Popover content={contenido} placement="bottom" trigger="click">
            <div className="circle-text-wraps">
              <div className="circle-number-container">
                <span
                  className="circle-number"
                  style={{ font: "normal normal 900 40px/20px Montserrat" }}
                >
                  1
                </span>
              </div>
              <div className="circle-children">
                <img src={lamp} width="30%" alt="foto" />
                <span className="my-3">Postúlate a los retos</span>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HomeChallenge;
