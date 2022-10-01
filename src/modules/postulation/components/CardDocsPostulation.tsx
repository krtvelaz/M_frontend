import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { iconoCheck } from '../../../utils/assets/img';
import { Card, swal_error } from '../../../utils/ui';
import { actions } from '../redux';

const CardDocsPostulation = () => {
    const documents: any = useSelector((store: any) => store.postulation.challenge.value);

    return (
        <>
            <div className="row">
                {documents?.map((doc: any, i: any) => (
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            // className="my-3"
                            style={{
                                position: 'relative',
                                // maxWidth: '350px',
                                // padding: '10px 20px 10px 15px',
                                // boxShadow: '0px 3px 6px #00000029',
                                // borderRadius: '13px',
                            }}
                        >
                            <DocumentPostulation doc={doc} />
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

const DocumentPostulation = ({ doc, i }: any) => {
    const [visibleCheckPostulation, setVisibleCheckPostulation] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const inputRef = useRef<any>(null);

    const addDocument: any = useSelector((store: any) => store.postulation.addDocument.value);
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
                posarc_id_document: doc.retdoc_id_documento,
                posarc_id_postulation: 15,
            };
            await dispatch(actions.addDocumentPostulation(target, data, i));
            setVisibleCheckPostulation(true);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDocumentPostulations = async (e: any) => {
        const dataaddDocument = addDocument.find((item: any) => item.i === i);
        const data = {
            filename: dataaddDocument.posarc_path_file,
            id: dataaddDocument.id,
        };
        await dispatch(actions.deleteDocumentPostulation(data));
        inputRef.current.value = '';
        inputRef.current.files = null;
        setVisibleCheckPostulation(false);
    };

    return (
        <>
            {visibleCheckPostulation && (
                <ContainerCheckDocument deleteDocumentPostulations={deleteDocumentPostulations} />
            )}
            <div>
                <div
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Montserrat-Bold',
                    }}
                >
                    {doc?.retdoc_descripcion_documento}
                </div>
                <p
                    style={{
                        fontSize: '11px',
                        fontFamily: 'Work-Sans-Regular',
                        marginTop: '6px',
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida nibh quis lectus finibus, at
                    condimentum enim pulvinar. Quisque vulputate bibendum libero quis venenatis.
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
                        <input
                            ref={inputRef}
                            onChange={(e) => onUploadFileChange(e)}
                            style={{ display: 'none' }}
                            type="file"
                        />
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
        </>
    );
};

const ContainerCheckDocument = ({ deleteDocumentPostulations }: any) => {
    return (
        <div
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 144, 76, 0.9)',
                width: '100%',
                height: '102%',
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
                        cursor: 'pointer',
                    }}
                    onClick={deleteDocumentPostulations}
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

export default CardDocsPostulation;
