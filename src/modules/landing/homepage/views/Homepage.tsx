import {
  bus,
  car,
  family,
  rocket,
  trazado,
} from "../../../../utils/assets/img";
import CarouselMedeinn from "../components/CarouselMedeinn";

const Homepage = () => {
  return (
    <>
      <div className="row">
        <div className="col-1">
          <img src={rocket} alt="imagen cohete"  style={{paddingTop: '120px', paddingLeft: '20px'}} />
        </div>
        <div className="col-11">
          <CarouselMedeinn />
        </div>
      </div>  {/* final del carrusel */}
     
      <section className="statistics">
        <div className="item-cifras">
          <div className="img-number">
            <img src={trazado} alt="imagen" />
            <p className="">800</p>
          </div>
          <p>Data o cifra a destacar desde la estadísticas</p>
        </div>

        <div className="item-cifras">
          <div className="img-number">
            <img src={bus} alt="imagen" />
            <p className="">500</p>
          </div>
          <p>Data o cifra a destacar desde la estadísticas</p>
        </div>

        <div className="item-cifras">
          <div className="img-number">
            <img src={family} alt="imagen" />
            <p className="">300</p>
          </div>
          <p>Data o cifra a destacar desde la estadísticas</p>
        </div>

        <div className="item-cifras">
          <div className="img-number">
            <img src={car} alt="imagen" />
            <p className="">200</p>
          </div>
          <p>Data o cifra a destacar desde la estadísticas</p>
        </div>
      </section>
     
    </>
  );
};

export default Homepage;
