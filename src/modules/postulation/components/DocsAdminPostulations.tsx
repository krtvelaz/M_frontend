import Item from 'antd/lib/list/Item';
import { FC, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { iconoCheck } from '../../../utils/assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { Buffer } from 'buffer';
import { swal_error } from '../../../utils/ui';
interface DocsTecPostulations {
    dataDoc?: any;
    documentPos?: any;
}
export const DocsAdminPostulations: FC<DocsTecPostulations> = ({ dataDoc, documentPos }) => {
    const dispatch = useDispatch<any>();
    const challenge: any = useSelector((store: any) => store.postulation.challenge.value);

    return (
        <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', width: '100%', height: '100%' }}
        >
            {challenge?.map((item2: any, i: any) => {
                return (
                    item2.retdoc_tipo_formulario === 3 && (
                        <div key={i}>
                            <ComponetCard
                                style={{ border: '1px solid #AD0808', borderRadius: '13px', position: 'relative' }}
                                key={i}
                            >
                                <DocumentPostulation item2={item2} />
                            </ComponetCard>
                        </div>
                    )
                );
            })}
        </div>
    );
};

const DocumentPostulation = ({ item2 }: any) => {
    const [visibleCheckPostulation, setVisibleCheckPostulation] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const challenge: any = useSelector((store: any) => store.postulation.challenge.value);
    const onUploadFileChange = async (e: any) => {
        const target = e.target.files[0];
        if (target.type !== 'application/pdf') {
            e.target.value = null;
            await swal_error.fire({
                title: 'Tipo del documento',
                html:
                    '<div class="mysubtitle">El archivo no es del tipo requerido</div>' +
                    `<div class="mytext">Intente adjunta un archivo de tipo ${
                        target.type === 'img' ? 'imagen' : 'PDF'
                    }</div>`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return;
        }
        try {
            const data = {
                posarc_id_document: item2.retdoc_id_documento,
                posarc_id_postulation: 15,
            };
            await dispatch(actions.addDocumentPostulation(target, data));
            setVisibleCheckPostulation(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {visibleCheckPostulation && <ContainerCheckDocument />}
            <div>
                <span
                    style={{
                        width: '100%',
                        color: '#AD0808',
                        fontSize: '12px',
                        fontFamily: 'Montserrat-Bold',
                        marginBottom: '10px',
                    }}
                >
                    {item2.retdoc_nombre_plantilla}
                </span>
                <p
                    style={{
                        fontSize: '11px',
                        fontFamily: 'Work-Sans-Regular',
                        marginTop: '6px',
                    }}
                >
                    {item2.retdoc_descripcion_documento}
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}
                >
                    <a
                        style={{
                            color: '#FF8403',
                            fontSize: '10px',
                            fontFamily: 'Montserrat-Regular',
                        }}
                    >
                        DESCARGAR FORMATO
                    </a>
                    <label
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <input onChange={(e) => onUploadFileChange(e)} style={{ display: 'none' }} type="file" />
                        <span
                            style={{
                                fontSize: '10px',
                                fontFamily: 'Montserrat-Regular',
                                color: '#030303',
                            }}
                        >
                            CARGAR FORMATO
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

const ContainerCheckDocument = () => {
    return (
        <div
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 144, 76, 0.9)',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                borderRadius: '13px',
                padding: '24px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <span style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF' }}>Nombre documento</span>
                <img width="8%" height="8%" alt="circle-check" src={iconoCheck} />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '13%',
                }}
            >
                <span
                    style={{
                        fontFamily: 'Montserrat-Regular',
                        color: '#FFFFFF',
                        fontSize: '10px',
                    }}
                >
                    Eliminar
                </span>
                <span
                    style={{
                        fontFamily: 'Montserrat-Bold',
                        color: '#FFFFFF',
                        fontSize: '10px',
                    }}
                >
                    Cargado
                </span>
            </div>
        </div>
    );
};
