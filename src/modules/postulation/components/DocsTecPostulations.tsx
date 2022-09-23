import { FC, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { iconoCheck } from '../../../utils/assets/img';
import { useSelector } from 'react-redux';

interface DocsTecPostulations {
    data?: any;
    documentPos?: any;
}

export const DocsTecPostulations: FC<DocsTecPostulations> = ({ data, documentPos }) => {
    const [valueInputFile, setValueInputFile] = useState(false);

    let valueImputFileView = document.getElementById('fileFormat-docsTec');
    const CargaFormat = () => {
        if (valueImputFileView === null) {
            setValueInputFile(true);
        }
    };
    return (
        <div>
            {valueInputFile && (
                <div
                    style={{
                        backgroundColor: 'rgb(0, 144, 76)',
                        position: 'absolute',
                        zIndex: '1',
                        width: '30.5%',
                        height: '34.5%',
                        top: '12.7%',
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
                        <img alt="hola" className="image-logo-container-login" src={iconoCheck} />
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
                            <input
                                id="fileFormat-docsTec"
                                onClick={() => CargaFormat()}
                                style={{ display: 'none' }}
                                type="file"
                            />
                            <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Cargado</span>
                        </label>
                    </div>
                </div>
            )}
            {documentPos.cha_documents?.map(
                (item: any) =>
                    item.id === 2 && (
                        <ComponetCard>
                            <div>
                                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#000000' }}>
                                    {item.title}
                                </span>
                                <div>
                                    <p>{item.text}</p>
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
                                        id="fileFormat-docsTec"
                                        onClick={() => CargaFormat()}
                                        style={{ display: 'none' }}
                                        type="file"
                                    />
                                    <span style={{ fontSize: '10px' }}>CARGAR FORMATO</span>
                                </label>
                            </div>
                        </ComponetCard>
                    )
            )}
        </div>
    );
};
