import { FC } from 'react';
interface Icons {
    on_click?: () => {};
    color?: string;
    styles?: React.CSSProperties;
    type: 'down' | 'up';
}
const ArrowSelect: FC<Icons> = ({ color, type }) => {
    return (
        <>
            {type === 'down' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="8.508" height="5.308" viewBox="0 0 8.508 5.308">
                    <g id="proximo" transform="translate(0.542 4.808) rotate(-90)">
                        <g id="Grupo_935" data-name="Grupo 935" transform="translate(0 0)">
                            <path
                                id="Trazado_853"
                                data-name="Trazado 853"
                                d="M4.217,3.528.528.084a.325.325,0,0,0-.437,0,.276.276,0,0,0,0,.409l3.47,3.239L.091,6.971a.276.276,0,0,0,0,.409.32.32,0,0,0,.219.085.319.319,0,0,0,.218-.085l3.69-3.443a.276.276,0,0,0,0-.41Z"
                                transform="translate(0 0)"
                                fill={`${color}`}
                                stroke={`${color}`}
                                strokeWidth="1"
                            />
                        </g>
                    </g>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="8.508" height="5.308" viewBox="0 0 8.508 5.308">
                    <g id="proximo" transform="translate(7.966 0.5) rotate(90)">
                        <g id="Grupo_935" data-name="Grupo 935" transform="translate(0 0)">
                            <path
                                id="Trazado_853"
                                data-name="Trazado 853"
                                d="M4.217,3.528.528.084a.325.325,0,0,0-.437,0,.276.276,0,0,0,0,.409l3.47,3.239L.091,6.971a.276.276,0,0,0,0,.409.32.32,0,0,0,.219.085.319.319,0,0,0,.218-.085l3.69-3.443a.276.276,0,0,0,0-.41Z"
                                transform="translate(0 0)"
                                fill={`${color}`}
                                stroke={`${color}`}
                                strokeWidth="1"
                            />
                        </g>
                    </g>
                </svg>
            )}
        </>
    );
};

ArrowSelect.defaultProps = {
    color: '#1D98D1',
};

export default ArrowSelect;
