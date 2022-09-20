import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    bus,
    car,
    family,
    trazado,
  } from "../../../../utils/assets/img";
import { IIndicator } from "../../custom_types";
import { actions } from "../../redux";


const StatisticsLanding = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(actions.get_statistics());
  }, []);

  const statistics: IIndicator = useSelector(
    (store: any) => store.banner.statistics.value
  );

  return (
  
    <section className="row statistics">
    <div className="col-6 col-md-3">
      <div className="img-number">
        <img src={trazado} alt="imagen" />
        <p className="">{statistics?.est_numero_reto}</p>
      </div>
      <p>{statistics?.est_descripcion_numero_reto}</p>
    </div>

    <div className="col-6 col-md-3">
      <div className="img-number">
        <img src={bus} alt="imagen" />
        <p className="">{statistics?.est_persona_impacto}</p>
      </div>
      <p>{statistics?.est_descripcion_persona_impacto}</p>
    </div>

    <div className="col-6 col-md-3">
      <div className="img-number">
        <img src={family} alt="imagen" />
        <p className="">{statistics?.est_actores_conectados}</p>
      </div>
      <p>{statistics?.est_descripcion_actores_conectados}</p>
    </div>

    <div className="col-6 col-md-3">
      <div className="img-number">
        <img src={car} alt="imagen" />
        <p className="">{statistics?.est_solucion_implementada}</p>
      </div>
      <p>{statistics?.est_descripcion_solucion_implementada}</p>
    </div>
  </section>
  )
}

export default StatisticsLanding