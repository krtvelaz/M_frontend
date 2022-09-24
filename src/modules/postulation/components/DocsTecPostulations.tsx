import { FC, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { iconoCheck } from '../../../utils/assets/img';
import { useSelector } from 'react-redux';

export const DocsTecPostulations = () => {
    const [valueInputFile, setValueInputFile] = useState(false);
    let valueImputFileView = document.getElementById('fileFormat-docsTec');
    const challenge: any = useSelector((store: any) => store.postulation.challenge.value);
    console.log('ff', challenge);
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
            {challenge?.map(
                (item: any, i: any) =>
                    item.retdoc_tipo_formulario === 2 && (
                        <ComponetCard key={i}>
                            <div style={{ display: 'contents' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#000000' }}>
                                    {item.retdoc_nombre_plantilla}
                                </span>
                                <div>
                                    <p>{item.retdoc_descripcion_documento}</p>
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
