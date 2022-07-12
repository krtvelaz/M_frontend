import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateContext } from "./templateContext";
import Menu from "antd/lib/menu";
import logoAlcaldia from "../../../utils/assets/img/logoAlcaldia.svg";

const sider: FC<{ width: number }> = ({ width }) => {
  const context = useContext(TemplateContext);
  const navigate = useNavigate();
  let menu_config: any = [
    {
      label: "Retos",
      children: [
        {
          path: "/challenge/create",
          label: 'Crear Nuevo Reto'
          
        },
        {
          path: "/challenge/list",
          label: "Consutar y Gestionar Retos",
        },
      ],
    },
    {
      label: "Publicaciones",
      children: [
        {
          path: "/publication/create",
          label: "Crear Noticia",
        },
        {
          path: "/event/create",
          label: "Crear Evento",
        },
        {
          path: "/publication/list",
          label: "Gestionar publicaciones",
        },
      ],
    },
    {
      label: "Landing Page",
      children: [
        {
          path: "/banners/create",
          label: "Carrusel Banners Principal",
        },
        {
          path: "/indicator/create",
          label: "Editar Indicadores",
        },
        {
          path: "/testimony/create",
          label: "Carrusel Testimonios",
        },
      ],
    },
  ];

  menu_config = menu_config.map((m: any, i: any) => {
    return {
      ...m,
      ...(m.children
        ? {
            children: m.children.map((s: any, j: any) => {
              return { ...s, key: `s${i}-${j}` };
            }),
          }
        : {}),
      key: `p${i}`,
    };
  });

  const goTo = (to: any) => {
    context.drawer_close();
    navigate(to.item.props.path, { state: to.keyPath });
  };

  return (
    <>
      {context.device !== "sm" && (
        <div
          className="text-center"
          style={{
            backgroundColor: "#92BEE4",
            borderRight: "1px solid #2ea1fe",
          }}
        >
          <img
            src={logoAlcaldia}
            className="img-fluid"
            alt=""
            width="42%"
            style={{ paddingTop: "16px" }}
          />
          <div
            className="text-white"
            style={{
              fontWeight: 400,
              padding: "20px 0 38.61px 0",
              width: "80%",
              margin: "0 auto",
              fontFamily: "Montserrat-Bold",
              fontSize: "12px",
            }}
          >
            Secretaría de innovación digital
          </div>
        </div>
      )}
      <Menu style={{fontSize: '12px', paddingLeft: '51px'}} onSelect={goTo} items={menu_config} />
    </>
  );
};

export default sider;
