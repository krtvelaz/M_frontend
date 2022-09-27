
import { FC } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { IEvent } from '../../event/custom_types';

interface detailPros {
    data?: any;
}

const DetailGeneralPostulation: FC<detailPros> = ({ data }) => {
    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="form-label">
                        Nombre y apellidos:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span className="">Andrea Ceballos Villareal</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_descripcion" className="form-label">
                        Teléfono:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>3006183669</span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Código:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>CC 101719606</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Tipo de persona:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>Persona jurídica</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Correo:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>correo@ejemplo.com</span>
                </div>
            </div>
        </>
    );
};

export default DetailGeneralPostulation;
