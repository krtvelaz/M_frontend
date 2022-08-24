import { FC } from "react";

interface Icons {
  color_fill: string;
  on_click?: () => {}
  styles?:React.CSSProperties;
}

const WatchComponent: FC<Icons> = ({
  color_fill,
  on_click,
  styles
}) => {
  
  return (
      <svg
        id="Componente_69_1"
        data-name="Componente 69 – 1"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="6.986"
        viewBox="0 0 12 6.986"
        onClick={on_click}
        style={styles}
      >
        <g id="Grupo_12930" data-name="Grupo 12930">
          <path
            id="Trazado_23"
            data-name="Trazado 23"
            d="M96.284,299.828a7.079,7.079,0,0,1,5.814,3.22.464.464,0,0,1,0,.563,7.069,7.069,0,0,1-11.75.115.6.6,0,0,1,.005-.805,7.109,7.109,0,0,1,4.74-2.992c.184-.032.371-.047.558-.063S96.021,299.843,96.284,299.828Zm-.147.935c-.248.023-.542.034-.831.078a6.1,6.1,0,0,0-4.014,2.367.158.158,0,0,0,0,.234,6.222,6.222,0,0,0,1.044,1.071,6.134,6.134,0,0,0,8.737-1.064.164.164,0,0,0,0-.245A6.2,6.2,0,0,0,96.137,300.763Z"
            transform="translate(-90.191 -299.828)"
            fill={color_fill}
          />
          <path
            id="Trazado_24"
            data-name="Trazado 24"
            d="M235.4,356.989a1.968,1.968,0,1,1-1.8,1.95A1.879,1.879,0,0,1,235.4,356.989Zm.006.981a.983.983,0,1,0,.9.981A.969.969,0,0,0,235.4,357.97Z"
            transform="translate(-229.411 -355.452)"
            fill={color_fill}
          />
        </g>
      </svg>
  );
};


export default WatchComponent;
