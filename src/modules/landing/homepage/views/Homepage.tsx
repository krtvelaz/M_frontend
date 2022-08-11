import {
  calendar,
  fondo_retos,
  rocket,
  watch,
} from "../../../../utils/assets/img";
import StatisticsLanding from "../../banner/components/StatisticsLanding";
import CarouselMedeinn from "../components/CarouselMedeinn";
import { Card } from "antd";
import { useContext } from "react";
import { TemplateContext } from "../../../../utils/components/template/templateContext";
import StaticInformation from "../components/StaticInformation";
import PublishedChallenges from "../../challenge/components/publishedChallenges";

const Homepage = () => {
  const context = useContext(TemplateContext);
  return (
    <>
      <section>
        <div className="row align-items-center">
          {context.device === "lg" && (
            <div className="col-1 styles-rocket" >
              <img src={rocket} alt="imagen cohete" />
            </div>
          )}

          <div className="col-12 col-md-12 col-lg-11">
            <CarouselMedeinn />
          </div>
        </div>
      </section>

      <div className="container-statistics">
        <StatisticsLanding />
      </div>

      <section className="container-challenges">
        <img
          src="src/utils/assets/img/fondo_retos.svg"
          alt=""
          className="imagen-fondo"
        />
        <img
          src="src/utils/assets/img/grupo_personas.png"
          alt=""
          className="imagen-grupo-personas"
        />
        <div className="container">
          <StaticInformation />
          <PublishedChallenges />
        </div>
      </section>
    </>
  );
};

export default Homepage;
