import { FC } from "react";

interface Icons {
    color_fill: string;
    on_click?: () => {}
    styles?:React.CSSProperties;
  }
const ArrowLeft: FC<Icons> = ({ color_fill }) => {
    
    return (
        <svg
            id="Componente_71_2"
            data-name="Componente 71 – 2"
            xmlns="http://www.w3.org/2000/svg"
            width="48.002"
            height="29.999"
            viewBox="0 0 48.002 29.999"
        >
            <path
                id="Trazado_12929"
                data-name="Trazado 12929"
                d="M.659,31.4a2.253,2.253,0,0,1,3.182,0L12.75,40.32V2.25a2.25,2.25,0,0,1,4.5,0V40.32l8.909-8.909a2.25,2.25,0,0,1,3.182,3.182L16.59,47.343a2.249,2.249,0,0,1-3.182,0L.659,34.593A2.257,2.257,0,0,1,.659,31.4Z"
                transform="translate(48.002) rotate(90)"
                fill={color_fill}
            />
        </svg>
    );
};

export default ArrowLeft;
