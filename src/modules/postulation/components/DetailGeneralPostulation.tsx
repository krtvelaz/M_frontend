import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';

interface detailPros {
    data?: any;
}

const DetailGeneralPostulation: FC<detailPros> = ({ data }) => {
    const dispatch = useDispatch<any>();
    const infoPosutlationsetail = useSelector((store: any) => store.postulation.detail_postulation.value);
    const infoGeneralGroup = infoPosutlationsetail && infoPosutlationsetail[0]?.postulation_info;

    const infoGroupPostulation = async () => {
        await dispatch(actions.get__postulationInfoDetail(data));
    };
    useEffect(() => {
        infoGroupPostulation();
    }, []);
    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="form-label">
                        Nombre y apellidos:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span className="">{infoGeneralGroup?.pos_business_name}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_descripcion" className="form-label">
                        Teléfono:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{infoGeneralGroup?.pos_number_contact}</span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Código:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>CC {infoGeneralGroup?.pos_document_id}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Tipo de persona:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{infoGeneralGroup?.pos_id_type_competitor}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Correo:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{infoGeneralGroup?.pos_email}</span>
                </div>
            </div>
        </>
    );
};

export default DetailGeneralPostulation;
