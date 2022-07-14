import { FC } from "react";
import ComponetCard from "../../../utils/ui/Card";
import { arrowMenu } from "../../../utils/assets/img";
import { Link } from "react-router-dom";

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
            <div className="col-2 text-center" style={{ marginRight: "8px" }}>
              <img
                src={image}
                className=""
                alt=""
                width="150%"
                style={{ maxWidth: "34px" }}
              />
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
              <div
                style={{
                  fontFamily: "Work-Sans-SemiBold",
                  fontSize: "14px",
                  marginBottom: 5,
                }}
              >
                {name}
              </div>
            </span>
          </div>
        }
      >
        <ul className="custom-list-style p-0">
          {links.map((link, i) => {
            return (
              <div className="row my-3" key={`card-${i}`}>
                <div className="col">
                  <img
                    src={arrowMenu}
                    style={{ cursor: "pointer", marginRight: '10px', marginBottom: '3px' }}
                    onClick={() => open()}
                    alt=""
                  />
                  {link.to && (
                  <Link
                    to={link.to}
                    className='link-card'
                    style={{ color: "black", textDecoration: "none", }}
                  >
                    {link.name}
                  </Link>
                )}
                {!link.to && `${link.name}`}
                </div>
              </div>
              // <li className="my-2" key={`link_${i}`} data-icon=">">
              //   {link.to && (
              //     <Link
              //       to={link.to}
              //       style={{ color: "black", textDecoration: "none" }}
              //     >
              //       {link.name}
              //     </Link>
              //   )}
              //   {!link.to && `${link.name}`}
              // </li>
            );
          })}
        </ul>
      </ComponetCard>
    </div>
  );
};

export default Card;
