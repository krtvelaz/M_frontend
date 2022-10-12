
import { useSelector } from 'react-redux';



const DetailGeneralPostulation = () => {
    const { postulation_info } = useSelector((store: any) => store.postulation.detail_postulation.value)

    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="form-label">
                        Nombre y apellidos:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span className="">{postulation_info?.pos_business_name}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_descripcion" className="form-label">
                        Teléfono:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation_info?.pos_number_contact}</span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Código:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>CC {postulation_info?.pos_document_id}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Tipo de persona:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation_info?.pos_id_type_competitor}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label">
                        Correo:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation_info?.pos_email}</span>
                </div>
            </div>
        </>
    );
};

export default DetailGeneralPostulation;
