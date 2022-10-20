import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { ModalDetailDocument } from '../../../utils/ui';
import { LogoPDF } from '../../../utils/assets/img';
import { useNavigate } from 'react-router-dom';

interface DetailChallenge {
    challenge: any;
}

const InfoDetailChallenge: FC<DetailChallenge> = ({ challenge }) => {
    const dispatch = useDispatch<any>();
    const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
    const navigate = useNavigate();
    const [url, setUrl] = useState<string>('');

    return (
        <div>
            <p>{challenge?.cha_description}</p>

            <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px' }}>Sectores y población de impacto</span>

            <div style={{ marginTop: '16px' }}>Que se beneficiará con la solución</div>

            <br />

            <p>{challenge?.cha_details}</p>

            <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px' }}>Requisitos de participación</span>

            <div style={{ marginTop: '16px' }}>Conoce los requisitos para postularse al reto</div>

            <br />

            <div style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}>Conformación del equipo</div>

            <p style={{ marginTop: '16px' }}>{challenge?.cha_important_data}</p>

            <br />

            <p>{challenge?.cha_expected_results}</p>

            <div className="my-5" style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}>
                Experiencia y documentación
            </div>

            <div style={{ marginTop: '16px' }}>
                Descripción del tipo de documentos que deben enviar para postularse al reto:{' '}
            </div>

            <ol className="my-4" style={{ position: 'relative', zIndex: 100 }}>
                {challenge?.cha_documents?.map(
                    (document: any, index: number) =>
                        document.chafil_nombre_plantilla && (
                            <li
                                style={{ cursor: 'pointer' }}
                                className="list-documents-general-detail"
                                onClick={async () => {
                                    const result = await dispatch(actions.get_document(document.id));

                                    if (result) {
                                        const pdfDocument = URL.createObjectURL(
                                            new Blob([result], { type: 'application/pdf' })
                                        );

                                        setUrl(pdfDocument);
                                        set_is_visible_doc(true);
                                    }
                                }}
                                key={`docs-general-${index}`}
                            >
                                {document?.chafil_nombre_plantilla}
                            </li>
                        )
                )}
            </ol>
            {challenge?.cha_total_days !== 0 && (
                <button
                    onClick={() => {
                        navigate(`../postulation/challenge/${challenge?.id}`, { state: { challenge: challenge } });
                    }}
                    type="button"
                    className="btn btn-landing-primary my-4"
                    style={{ position: 'relative', zIndex: 4 }}
                >
                    POSTULAR AL RETO
                </button>
            )}

            <div className="my-3" style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px', color: '#603CE6' }}>
                Visualizar informes del reto
            </div>
            {challenge?.informs?.length > 0 ? (
                <ol style={{ position: 'relative', zIndex: 4, listStyle: 'none' }} className="my-4">
                    {challenge?.informs?.map((inform: any, index: number) => (
                        <div
                            key={`informs-detail-${index}`}
                            className="d-flex my-2"
                            onClick={async () => {
                                const result = await dispatch(actions.get_document(inform.id, 'report'));

                                if (result) {
                                    const pdfDocument = URL.createObjectURL(
                                        new Blob([result], { type: 'application/pdf' })
                                    );

                                    setUrl(pdfDocument);
                                    set_is_visible_doc(true);
                                }
                            }}
                        >
                            <img src={LogoPDF} alt="Logo PDF" style={{ width: '20px', marginRight: '10px' }} />
                            <li>
                                <a href="#">{inform?.retinf_nombre}</a>
                            </li>
                        </div>
                    ))}
                </ol>
            ) : (
                <span>Este reto no tiene informes</span>
            )}

            <ModalDetailDocument open={is_visibleDoc} setOpen={set_is_visible_doc} url={url} />
        </div>
    );
};

export default InfoDetailChallenge;
