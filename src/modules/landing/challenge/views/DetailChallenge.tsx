import moment from "moment";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { piezaRompecabezas } from "../../../../utils/assets/img";
import { Link } from "../../../../utils/ui";
import { actions } from "../../../admin/challenge/redux";
import InfoDetailChallenge from "../components/InfoDetailChallenge";
import ModalVideo from "../../homepage/components/ModalVideo";
import { TemplateContext } from "../../../../utils/components/template/templateContext";

const DetailChallenge = () => {
  const challenge: any = useSelector(
    (store: any) => store.challenge.challenge.value
  );

  const [imgPrincipal, setImgPrincipal] = useState({});
  const dispatch = useDispatch<any>();
  const context = useContext(TemplateContext);

  const getChallenge = async () => {
    const res = await dispatch(actions.get_detail_challenge());

    if (res) {
      const imgPrincipal = await dispatch(actions.get_image_principal());
      setImgPrincipal(imgPrincipal);
    }
  }

  useEffect(() => {
    getChallenge()
  }, []);

  return (
    <>
      <div
        className="container-fluid container-info-detail"
        style={{
          padding: "90px 50px",
          background: 'linear-gradient(to top, #ffffff 65%, transparent), url("https://images.pexels.com/photos/12470916/pexels-photo-12470916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left center",
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
              className="row container-detail-challenge"
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
                  className="card-detail-challenge"
                >
                  <h5 className="my-4 card-title-challenge">{challenge?.retgen_nombre}</h5>

                  <div className="d-flex justify-content-center text-center align-items-center flex-column">
                    <i className="fa fa-calendar-o mx-3" aria-hidden="true" style={{ fontSize: '25px', marginTop: '15px', color: '#DE096B' }}></i>
                    <div>
                      <p
                        className="my-3"
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                      >
                        Fecha de vigencia para postulaciones
                      </p>
                      <div className="my-4">
                        <span style={{ fontWeight: 'bold' }}>INICIO DEL RETO:{" "}</span>
                        {moment(challenge?.retgen_fecha_inicio).locale('es').format("LL")}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>FIN DEL RETO:{" "}</span>
                        {moment(challenge?.retgen_fecha_final).format("LL")}
                      </div>
                    </div>
                  </div>

                  <div
                    className="mx-auto my-5"
                    style={{
                      background: "white",
                      borderRadius: "50%",
                      textAlign: "center",
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

                  <h5 style={{ textAlign: "center" }}>El problema y el reto</h5>
                  <div style={{ textAlign: "center" }} className="my-3">Conoce la problemática actual</div>

                  <hr className="hr-color" />

                  {challenge?.ret_video && (
                    <Link to="/" name="Presentación" iconText=">" />
                  )}

                  <div className="my-4" style={{ textAlign: 'center' }}>
                    <ModalVideo urlVideo={challenge?.retgen_video} />
                  </div>

                  <div
                    className="my-5 mx-auto"
                    style={{
                      boxShadow: "0px 3px 6px #00000029",
                      borderRadius: "12px",
                      textAlign: "center",
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
                  <hr className="hr-color" />
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
                  <InfoDetailChallenge challenge={challenge} />
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
