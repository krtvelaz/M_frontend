import { useSelector } from 'react-redux';
import moment from 'moment';

const DetailGroupPostulation = () => {
    const postulation = useSelector((store: any) => store.postulation.detail_postulation.value);

    return (
        <>
            <div style={{ position: 'absolute', right: '50%', top: '0px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '20px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '40px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '60px', fontSize: '20px' }}>.</div>
            <div style={{ position: 'absolute', right: '50%', top: '80px', fontSize: '20px' }}>.</div>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="label-landing">Nombre del reto:</label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.challenge_info?.cha_name}</span>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="label-landing">Fecha y hora de postulación:</label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>
                        {' '}
                        {moment(postulation?.challenge_info?.pos_updated_at).format('DD / MM / YYYY - HH:mm: A')}
                    </span>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="label-landing">Código de postulación:</label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.challenge_info?.pos_settled || '-'}</span>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id" className="label-landing">Dimensión:</label>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{postulation?.challenge_info?.maedim_name}</span>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default DetailGroupPostulation;
