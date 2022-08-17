import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { piezaRompecabezas } from "../../../../utils/assets/img";
import { Link } from "../../../../utils/ui";
import { actions } from "../../../admin/challenge/redux";
import InfoDetailChallenge from "../components/InfoDetailChallenge";

const DetailChallenge = () => {
  const challenge: any = useSelector(
    (store: any) => store.challenge.challenge.value
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(actions.get_detail_challenge());
  }, []);
  return (
    <>
      <div
        className="container-fluid"
        style={{
          padding: "150px 50px",
          background:
            'linear-gradient(to top, #ffffff 65%, transparent), url("https://images.pexels.com/photos/12470916/pexels-photo-12470916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          border: "1px solid red",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="src/utils/assets/img/letras_medeinn.svg"
          alt="letras medeinn"
          className="imagen-fondo-detalle"
        />
        <img
          src="src/utils/assets/img/Capa 73.png"
          alt=""
          className="imagen-fondo-mujer"
        />
        <div className="row">
          <div className="col-12">
            <div
              className="row "
              style={{
                background: "white",
                borderRadius: "18px",
                boxShadow: "0px 30px 80px #00000029",
                opacity: 1,
                paddingBottom: "300px",
              }}
            >
              <div
                className="col-12 col-md-12 col-lg-4"
                style={{
                  padding: 0,
                  marginTop: "-120px",
                }}
              >
                <div
                  style={{
                    borderRadius: "20px",
                    padding: "20px",
                    textAlign: "center",
                    maxWidth: "80%",
                    marginLeft: "auto",
                    // marginRight: "auto",
                    background: "linear-gradient(to top, #ffffff, transparent)",
                    opacity: 1,
                    backdropFilter: "blur(43px)",
                  }}
                >
                  <h5>{challenge?.ret_nombre}</h5>
                  <p
                    className="my-3"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    Fecha de vigencia para postulaciones
                  </p>
                  <div className="my-3">
                    INICIO DEL RETO:{" "}
                    {moment(challenge?.ret_fecha_inicio).format("LL")}
                  </div>
                  <div className="my-3">
                    FIN DEL RETO:{" "}
                    {moment(challenge?.ret_fecha_final).format("LL")}
                  </div>
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
                  {challenge?.ret_video && (
                    <Link to="/" name="Presentación" iconText=">" />
                  )}
                  <div
                    className="my-3 mx-auto"
                    style={{
                      boxShadow: "0px 3px 6px #00000029",
                      borderRadius: "12px",
                      padding: "10px",
                      width: "125px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Montserrat-Bold",
                        fontSize: "16px",
                      }}
                    >
                      FALTAN
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat-Bold",
                        fontSize: "30px",
                      }}
                    >
                      {challenge?.total_days}
                    </div>
                    <div style={{ fontSize: "10px" }}>
                      Días para el cierre del reto
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div
                className="col-12 col-md-12 col-lg-7"
                style={{
                  padding: 0,
                }}
              >
                <div
                  style={{
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <InfoDetailChallenge />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailChallenge;
