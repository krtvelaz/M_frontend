import Item from 'antd/lib/list/Item';
import { FC, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { iconoCheck } from '../../../utils/assets/img';
interface DocsTecPostulations {
    dataDoc?: any;
}
export const DocsAdminPostulations: FC<DocsTecPostulations> = ({ dataDoc }) => {
    const [valueInputFileAdmin, setValueInputFileAdmin] = useState(false);
    let valueImputFileViewAdmin = document.getElementById('fileFormat-docsAdmin');
    const CargaFormatAdmin = () => {
        if (valueImputFileViewAdmin == null) {
            setValueInputFileAdmin(true);
        }
    };
    return (
        <div>
            {valueInputFileAdmin && (
                <div
                    style={{
                        backgroundColor: 'rgb(0, 144, 76)',
                        position: 'absolute',
                        zIndex: '1',
                        width: '30.5%',
                        height: '34.5%',
                        top: '58.7%',
                        borderRadius: '5%',
                        opacity: '83%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '93%',
                            position: 'absolute',
                            top: '12%',
                            height: '9%',
                        }}
                    >
                        <img alt="circle-check" className="image-logo-container-login" src={iconoCheck} />
                    </div>
                    <div style={{ padding: '7.7%' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '13px' }}>Nombre Documento</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '23% 26% 0% 33%' }}>
                        <a>
                            <span style={{ fontSize: '10px', color: 'white' }}>Eliminar</span>
                        </a>
                        <label
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <input onClick={() => CargaFormatAdmin()} style={{ display: 'none' }} type="file" />
                            <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Cargado</span>
                        </label>
                    </div>
                </div>
            )}

            <ComponetCard>
                <div>
                    <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#000000' }}>{dataDoc.title}</span>
                    <div>
                        <p>{dataDoc.text}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a>
                        <span style={{ fontSize: '10px', color: '#FF8403' }}>DESCARGAR FORMATO</span>
                    </a>
                    <label
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <input
                            id="fileFormat-docsAdmin"
                            onClick={() => CargaFormatAdmin()}
                            style={{ display: 'none' }}
                            type="file"
                        />
                        <span style={{ fontSize: '10px' }}>CARGAR FORMATO</span>
                    </label>
                </div>
            </ComponetCard>
        </div>
    );
};
