import React, { useState } from 'react'
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGeneralInformation } from "../../../admin/challenge/custom_types";
import LogoPDF from "../../../../utils/assets/img/pdf.svg";
import { actions } from "../../../admin/challenge/redux";
import { ModalDetailDocument } from '../../../../utils/ui';

interface DetailChallenge {
  challenge: any;
}

const InfoDetailChallenge: FC<DetailChallenge> = ({ challenge }) => {
  const dispatch = useDispatch<any>();

  const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);

  const [url, setUrl] = useState<string>("");

  return (
    <div>
      <p>{challenge?.retgen_descripcion}</p>

      <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px' }}>Sectores y población de impacto</span>

      <div style={{ marginTop: '16px' }}>Que se beneficiará con la solución</div>

      <br />

      <p>{challenge?.retgen_detalles}</p>

      <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px' }}>Requisitos de participación</span>

      <div style={{ marginTop: '16px' }}>Conoce los requisitos para postularse al reto</div>

      <br />

      <div style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}>Conformación del equipo</div>

      <p style={{ marginTop: '16px' }}>{challenge?.retgen_datos_importante}</p>

      <br />

      <p>{challenge?.ret_resultado_esperado}</p>

      <button type="button" className="btn btn-outline-primary me-3">
        DESCARGAR Ficha Reto
      </button>

      <button type="button" className="btn btn-outline-primary">
        Descargar los términos de Referencia
      </button>

      <div className="my-5" style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}>Experiencia y documentación</div>

      <div style={{ marginTop: '16px' }}>Descripción del tipo de documentos que deben enviar para postularse al reto: </div>

      <ol className="my-4" style={{ position: "relative", zIndex: 4 }}>
        {challenge?.documents.map((document: any, index: number) =>
          <>
            <li onClick={async () => {
              const result = await dispatch(actions.get_document(document.id));

              if (result) {
                const pdfDocument = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));

                setUrl(pdfDocument);
                set_is_visible_doc(true);
              }

            }} key={index}>{document.retdoc_nombre_plantilla}</li>
            <ModalDetailDocument
              open={is_visibleDoc}
              setOpen={set_is_visible_doc}
              url={url}
            />
          </>
        )}
      </ol>

      <button type="button" className="btn btn-primary my-4" style={{ position: "relative", zIndex: 4 }}>
        POSTULAR AL RETO
      </button>

      <div className="my-3" style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px', color: '#603CE6' }}>Visualizar información del reto</div>

      <ol style={{ position: "relative", zIndex: 4, listStyle: 'none' }} className="my-4">
        {challenge?.informs.map((inform: any, index: number) =>
          <div className="d-flex my-2" onClick={async () => {
            const result = await dispatch(actions.get_document(inform.id, "report"));

            if (result) {
              const pdfDocument = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));

              setUrl(pdfDocument);
              set_is_visible_doc(true);
            }
          }}>
            <img src={LogoPDF} alt="Logo PDF" style={{ width: '20px', marginRight: '10px' }} />
            <li key={index}><a href="#">{inform.retinf_nombre}</a></li>

            <ModalDetailDocument
              open={is_visibleDoc}
              setOpen={set_is_visible_doc}
              url={url}
            />
          </div>
        )
        }
      </ol >
    </div >
  );
};

export default InfoDetailChallenge;
