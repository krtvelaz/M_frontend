import { FC } from "react";
import { Breadcrumb } from "../router/custom_types";
import { Link } from 'react-router-dom';
import inicio from "../../assets/img/inicio.svg";

const Breadcrumbs: FC<{ breadcrumbs: Breadcrumb[] }> = ({breadcrumbs}) => {
  return (
    <ol className="breadcrumb m-0">
      <li className="breadcrumb-item">
        <Link to="/" className="text-white">
        <img
            src={inicio}
            alt=""
            width="100%"
          />
          {/* casa<i className="fa fa-home" style={{ fontSize: 16 }} /> */}
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
                <Link to={breadcrumb.to} className="text-white">
                  {content}
                </Link>
              )}
              {!breadcrumb.to && content}
            </li>
          );
        })}
    </ol>
  );
};

export default Breadcrumbs;
