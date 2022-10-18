import { FC } from "react";
import { Breadcrumb } from "../router/custom_types";
import { Link } from 'react-router-dom';
import inicio from "../../assets/img/inicio.svg";

const Breadcrumbs: FC<{ breadcrumbs: Breadcrumb[] }> = ({breadcrumbs}) => {
  return (
    <ol className="breadcrumb m-0 breadcrumb-template">
      <li className="breadcrumb-item">
        <Link to="/home" className="text-white">
        <img
            src={inicio}
            alt=""
            width="100%"
          />
        </Link>
      </li>
      {breadcrumbs &&
        breadcrumbs.length > 0 &&
        breadcrumbs.map((breadcrumb, i) => {
          const content = (
            <>
              {breadcrumb.icon} {breadcrumb.name}
            </>
          );
          return (
            <li
              key={`breadcrumb-${i}`}
              className="breadcrumb-item"
              aria-current="page"
              style={{fontSize: '11px'}}
            >
              {breadcrumb.to && (
                <Link to={breadcrumb.to} className="text-white" style={{textDecoration: 'none'}}>
                  {content}
                </Link>
              )}
              <span style={{fontFamily: 'Montserrat-Bold'}}>{!breadcrumb.to && content}</span>
            </li>
          );
        })}
    </ol>
  );
};

export default Breadcrumbs;
