import { useSelector } from 'react-redux';
import moment from 'moment';

const DetailGroupPostulation = () => {
    const { challenge_info } = useSelector((store: any) => store.postulation.detail_postulation.value)
   
    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Nombre del reto:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{challenge_info?.cha_name}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Fecha y hora de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span> {moment(challenge_info?.pos_updated_at).format('DD / MM / YYYY - HH:mm: A')}</span>
                </div>
            </div>
            <div className="row  mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Código de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{challenge_info?.pos_settled || '-'}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Dimensión:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{challenge_info?.maedim_name}</span>
                </div>
            </div>
        </>
    );
};

export default DetailGroupPostulation;
