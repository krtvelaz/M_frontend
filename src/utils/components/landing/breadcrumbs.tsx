import { FC } from "react";
import { Breadcrumb } from "../router/custom_types";
import { Link } from 'react-router-dom';
import { inicioLading } from "../../assets/img";

const Breadcrumbs: FC<{ breadcrumbs: Breadcrumb[] }> = ({breadcrumbs}) => {
  return (
    <ol className="breadcrumb m-0">
      <li className="breadcrumb-item" >
        <Link to="/" className="">
        <img
            src={inicioLading}
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
                <Link to={breadcrumb.to}  style={{textDecoration: 'none', color: '#0A0707'}}>
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
