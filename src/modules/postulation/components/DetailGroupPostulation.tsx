import { FC } from 'react';

interface detailPros {
    data?: any;
}

const DetailGroupPostulation: FC<detailPros> = ({ data }) => {
    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Nombre del reto:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>¿Cómo mejorar la conectividad en los corregimientos de Medellín?...</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Fecha y hora de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>05 / 03 / 2023 - 12:33 PM</span>
                </div>
            </div>
            <div className="row  mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Código de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>0010</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Dimensión:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>Movilidad</span>
                </div>
            </div>
        </>
    );
};

export default DetailGroupPostulation;
