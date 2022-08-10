import { piezaRompecabezas } from "../../../../utils/assets/img";
import { Card, Link } from "../../../../utils/ui";

const DetailChallenge = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage:
          'linear-gradient(to top, #ffffff 50%, transparent), url("https://images.pexels.com/photos/12470916/pexels-photo-12470916.jpeg?auto=compress&cs=tinysrgb&w=600")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="detail-challenge-landing">
        <div
          style={{
            top: "0px",
            left: "45px",
            position: "relative",
            width: "300px",
            borderRadius: "20px",
            padding: "20px",
            textAlign: "center",
            background: "linear-gradient(to top, #ffffff, transparent)",
            opacity: 1,
            backdropFilter: "blur(43px)",
            zIndex: 200,
          }}
        >
          <h5>
            ¿Cómo mejorar la conectividad en los corregimientos de Medellín?
          </h5>
          <p className="my-3" style={{ fontFamily: "Montserrat-SemiBold" }}>
            Fecha de vigencia para postulaciones
          </p>
          <div className="my-3">INICIO DEL RETO: 1 de Abril de 2021</div>
          <div className="my-3">FIN DEL RETO: 28 de Abril de 2021</div>
          <div
            className="mx-auto my-5"
            style={{
              background: "white",
              borderRadius: "50%",
              height: "10rem",
              width: "10rem",
              boxShadow: "0px 3px 6px #00000029",
              opacity: 1,
            }}
          >
            <img
              src={piezaRompecabezas}
              alt="pieza rompecabezas"
              className="mx-auto"
              width={70}
              style={{
                paddingTop: "20px",
              }}
            />
          </div>
          <h5>El problema y el reto</h5>
          <div className="">Conoce la problemática actual</div>
          <hr />
          <Link to="/" name="Presentación" iconText=">" />
          <div
            className="my-3 mx-auto"
            style={{
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "12px",
              padding: "10px",
              width: "125px",
            }}
          >
            <div style={{ fontFamily: "Montserrat-Bold", fontSize: "16px" }}>
              FALTAN
            </div>
            <div style={{ fontFamily: "Montserrat-Bold", fontSize: "30px" }}>
              25
            </div>
            <div style={{ fontSize: "10px" }}>Días para el cierre del reto</div>
          </div>
          <hr />
        </div>
      </div>
      <Card style={{ marginTop: "-500px" }}>
        <div
          style={{
            marginLeft: "350px",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eum
            consequuntur eius fugit et animi inventore asperiores optio illo.
            Ea, earum? Magnam, laborum? Beatae nihil, iusto id rem facere ipsa?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quis
            consequuntur tempora dignissimos exercitationem nesciunt commodi
            fugiat eligendi mollitia deleniti incidunt temporibus sit, ad
            repellat amet! Expedita quos at debitis.
          </p>
          <h4>Sectores y población de impacto</h4>
          <div>Que se solucionará con la solución</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            ipsam quibusdam quo et repudiandae, quis praesentium. Sed, neque
            iusto ipsum enim, in ullam incidunt eum cum provident voluptates est
            quidem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            ipsam quibusdam quo et repudiandae, quis praesentium. Sed, neque
            iusto ipsum enim, in ullam incidunt eum cum provident voluptates est
            quidem.
          </p>
          <button type="button" className="btn btn-primary">
            Me encanta este reto
          </button>
          <h4>Requisitos de participación</h4>
          <div>Conoce los requisitos para postularse al reto</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, qui
            quis. Eius doloremque inventore exercitationem deleniti illo ipsa
            corporis aspernatur, ea harum, corrupti minima laborum voluptatum
            quam perspiciatis, sequi illum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            ad vitae pariatur, porro sint, sit eius recusandae distinctio quam,
            est accusantium aspernatur illum inventore architecto omnis ipsam
            mollitia et saepe!
          </p>
          <button type="button" className="btn btn-primary">
            Me encanta este reto
          </button>
          <button type="button" className="btn btn-primary">
            Me encanta este reto
          </button>
        </div>
      </Card>
    </div>
  );
};

export default DetailChallenge;
