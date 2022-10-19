import { useSelector } from 'react-redux';

const DetailGeneralPostulation = () => {
    const postulation = useSelector((store: any) => store.postulation.detail_postulation.value);

    return (
        <>
            <div style={{ position: 'absolute', right: '50%', top: '0px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '20px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '40px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '60px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '80px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '100px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '120px', fontSize: '20px' }}>.</div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="form-label label-landing">
                        Nombre y apellidos:
                    </label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span className="">{postulation?.postulation_info?.pos_business_name}</span>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_descripcion" className="form-label label-landing">
                        Teléfono:
                    </label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.postulation_info?.pos_number_contact}</span>
                    <hr />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label label-landing">
                        Código:
                    </label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>CC {postulation?.postulation_info?.pos_document_id}</span>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label label-landing">
                        Tipo de persona:
                    </label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.postulation_info?.pos_id_type_competitor}</span>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="eve_lugar_evento_id" className="form-label label-landing">
                        Correo:
                    </label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.postulation_info?.pos_email}</span>
                </div>
            </div>
        </>
    );
};

export default DetailGeneralPostulation;
