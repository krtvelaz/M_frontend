import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { logoAlcaldiaNegro, logoMedeinn } from "../../assets/img";
import bars from "../../assets/img/bars.svg";
import { TemplateContext } from "../template/templateContext";

const Header: FC<{ collapsible: boolean }> = ({ collapsible }) => {
  const context = useContext(TemplateContext);
  return (
    <>
      <img
        src={logoMedeinn}
        className="logo"
        alt=""
        width="50px"
        // style={{ marginTop: "16px" }}
      />
      <div className="d-flex justify-content-end">
        {context.device === "lg" ? (
          <>
            <Link
              to={"/about-us"}
              className="link-card"
              style={{
                color: "black",
                textDecoration: "none",
                marginRight: "30px",
                marginTop: "7px",
              }}
            >
              Nosotros
            </Link>
            <Link
              to={"/our-challenges"}
              className="link-card"
              style={{
                color: "black",
                textDecoration: "none",
                marginRight: "30px",
                marginTop: "7px",
              }}
            >
              Nuestros retos
            </Link>
            <Link
              to={"/auth/login/"}
              className="link-card"
              style={{
                color: "black",
                textDecoration: "none",
                marginRight: "30px",
                marginTop: "7px",
              }}
            >
              Ingresar
            </Link>
            <Link
              to={"/"}
              className="link-card"
              style={{ marginRight: "30px", marginTop: "7px" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {}}
              >
                Registrarme
              </button>
            </Link>
            <img
              src={logoAlcaldiaNegro}
              alt=""
              width="80px"
              style={{
                marginTop: "16px",
                marginRight: "70px",
                marginBottom: "16px",
              }}
            />
          </>
        ) : (
          <img
            src={bars}
            alt=""
            onClick={context?.drawer_open}
            style={{
              cursor: "pointer",
              marginTop: "40px",
              marginRight: "20px",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Header;
