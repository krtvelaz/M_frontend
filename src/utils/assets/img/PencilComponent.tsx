import { FC } from 'react';

interface Icons {
    on_click?: () => any;
    styles?: React.CSSProperties;
}

const PencilComponent: FC<Icons> = ({ on_click, styles }) => {
    return (
        <svg
            id="pencil-svg"
            data-name="Componente 70 – 1"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            onClick={on_click}
            style={{cursor: 'pointer', ...styles }}
        >
            <g id="_001-editar" data-name="001-editar">
                <path
                    id="Trazado_2493"
                    data-name="Trazado 2493"
                    d="M119.171.8a1.841,1.841,0,0,0-2.6,0l-7.3,7.3a.409.409,0,0,0-.1.18l-.96,3.465a.409.409,0,0,0,.5.5l3.465-.96a.409.409,0,0,0,.18-.1l7.3-7.3a1.843,1.843,0,0,0,0-2.6Zm-9.011,7.564,5.973-5.973,1.926,1.926-5.973,5.973Zm-.385.772,1.539,1.539-2.129.59Zm9.3-5.831-.434.434-1.927-1.926.434-.434a1.023,1.023,0,0,1,1.446,0l.48.48A1.024,1.024,0,0,1,119.073,3.3Zm0,0"
                    transform="translate(-108.19 -0.261)"
                />
            </g>
        </svg>
    );
};

export default PencilComponent;
