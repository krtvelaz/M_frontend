import { Link } from "react-router-dom";
import { FC } from "react";
import ComponetCard from "../../../utils/ui/Card";

interface CardProps {
  name: string;
  links?: { to?: any; name: string }[];
  image: any;
}
const Card: FC<CardProps> = ({ name, links, image }) => {
  links = links || [];
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <ComponetCard
        className="h-100 dash-card"
        title={
          <div className="row">
            <div className="col-2 text-center" style={{ marginRight: "15px" }}>
              <img src={image} className="" alt="" width="150%" />
            </div>
            <span
              className="col"
              style={{
                fontSize: "12px",
                fontFamily: "Work-Sans-Regular",
                color: "#000000",
                paddingLeft: "0px",
              }}
            >
              ACCESOS RÁPIDOS{" "}
              <h5
                style={{
                  fontFamily: "Work-Sans-SemiBold",
                  fontSize: "14px",
                  marginBottom: 5,
                }}
              >
                {name}
              </h5>
            </span>
          </div>
        }
      >
        <ul className="custom-list-style p-0">
          {links.map((link, i) => {
            return (
              <li className="my-2" key={`link_${i}`} data-icon=">">
                {link.to && (
                  <Link
                    to={link.to}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {link.name}
                  </Link>
                )}
                {!link.to && `${link.name}`}
              </li>
            );
          })}
        </ul>
      </ComponetCard>
    </div>
  );
};

export default Card;
