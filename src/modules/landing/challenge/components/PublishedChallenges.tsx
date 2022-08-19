import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../admin/challenge/redux";

const PublishedChallenges = () => {
  const challenges: any[] = useSelector(
    (store: any) => store.challenge.challenges.value
  );
  
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(actions.get_four_challenge());
  }, []);
  return (
    <div className="row">
      <div
        className="col-12 col-md-12 col-lg-5"
        style={{ marginTop: "55px", position: "relative" }}
      >
        <h2>
          Solucionar e ider
          <br />
          <span className="text-stake">Convocatoria abierta</span>
        </h2>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
          provident voluptatem ipsum odit modi ducimus reprehenderit illo,
          adipisci neque tenetur iusto in quod quas sed ut aliquam recusandae
          illum beatae!
        </p>
      </div>
      <div className="col-12 col-md-12 col-lg-7">
        <div className="row">
          {challenges?.map((challenge: any, i:number) => {
            return (
              <div className="col-12 col-md-6" id={`${i === 0 ? 'card-challenge-one' : i === 3 && 'card-challenge-four'}`}>
                <Card
                  hoverable
                  className="card-challenge"
                  cover={
                    <img
                      alt="example"
                      src="src/utils/assets/img/imagen 52.png"
                    />
                  }
                >
                  <div className="text-center body-card-challenge">
                    <h3>
                      {challenge?.ret_nombre}
                    </h3>
                    <p>Fecha de vigencia para postulaciones</p>
                    <div className="date-card-challenge">
                      INICIO DEL RETO: { moment(challenge?.ret_fecha_inicio).format('LL')}
                    </div>
                    <div className="date-card-challenge">
                      FIN DEL RETO: { moment(challenge?.ret_fecha_final).format('LL')}
                    </div>
                    <button className="btn">Postularse al reto</button>
                  </div>
                </Card>
              </div>
            );
          })}
          {/* <div className="col-12 col-md-6" id="card-challenge-one">
            <Card
              hoverable
              className="card-challenge"
              cover={
                <img alt="example" src="src/utils/assets/img/imagen 52.png" />
              }
            >
              <div className="text-center body-card-challenge">
                <h3>
                  ¿Cómo mejorar la conectividad en los corregimientos de
                  Medellín?
                </h3>
                <p>Fecha de vigencia para postulaciones</p>
                <div className="date-card-challenge">
                  INICIO DEL RETO: 1 de Abril de 2021
                </div>
                <div className="date-card-challenge">
                  FIN DEL RETO: 28 de Abril de 2021
                </div>
                <button className="btn">Postularse al reto</button>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card
              hoverable
              className="card-challenge"
              cover={
                <img alt="example" src="src/utils/assets/img/imagen 52.png" />
              }
            >
              <div className="text-center body-card-challenge">
                <h3>
                  ¿Cómo mejorar la conectividad en los corregimientos de
                  Medellín?
                </h3>
                <p>Fecha de vigencia para postulaciones</p>
                <div className="date-card-challenge">
                  INICIO DEL RETO: 1 de Abril de 2021
                </div>
                <div className="date-card-challenge">
                  FIN DEL RETO: 28 de Abril de 2021
                </div>
                <button className="btn">Postularse al reto</button>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card
              hoverable
              className="card-challenge"
              cover={
                <img alt="example" src="src/utils/assets/img/imagen 52.png" />
              }
            >
              <div className="text-center body-card-challenge">
                <h3>
                  ¿Cómo mejorar la conectividad en los corregimientos de
                  Medellín?
                </h3>
                <p>Fecha de vigencia para postulaciones</p>
                <div className="date-card-challenge">
                  INICIO DEL RETO: 1 de Abril de 2021
                </div>
                <div className="date-card-challenge">
                  FIN DEL RETO: 28 de Abril de 2021
                </div>
                <button className="btn">Postularse al reto</button>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-6" id="card-challenge-four">
            <Card
              hoverable
              className="card-challenge"
              cover={
                <img alt="example" src="src/utils/assets/img/imagen 52.png" />
              }
            >
              <div className="text-center body-card-challenge">
                <h3>
                  ¿Cómo mejorar la conectividad en los corregimientos de
                  Medellín?
                </h3>
                <p>Fecha de vigencia para postulaciones</p>
                <div className="date-card-challenge">
                  INICIO DEL RETO: 1 de Abril de 2021
                </div>
                <div className="date-card-challenge">
                  FIN DEL RETO: 28 de Abril de 2021
                </div>
                <button className="btn">Postularse al reto</button>
              </div>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PublishedChallenges;
