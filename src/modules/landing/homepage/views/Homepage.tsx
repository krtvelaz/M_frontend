import { rocket } from "../../../../utils/assets/img";
import HomeChallenge from "../../challenge/components/HomeChallenge";
import StatisticsLanding from "../../banner/components/StatisticsLanding";
import CarouselMedeinn from "../components/CarouselMedeinn";

const Homepage = () => {
  return (
    <>
      <section>
        <HomeChallenge />
      </section>
      <div className="row">
        <div className="justify-content-center">
          <div className="row ">
            <div className="col-1">
              <img
                src={rocket}
                alt="imagen cohete"
                style={{ paddingTop: "120px", paddingLeft: "20px" }}
              />
            </div>
            <div className="col-11">
              <CarouselMedeinn />
            </div>
          </div>{" "}
          {/* final del carrusel */}
          <div className="col-auto ">
            <StatisticsLanding />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
