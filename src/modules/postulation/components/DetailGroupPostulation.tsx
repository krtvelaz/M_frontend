import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { number } from 'yup';
import { actions } from '../redux';
import moment from 'moment';

interface detailPros {
    data?: any;
    infoPost?: any;
}

const DetailGroupPostulation: FC<detailPros> = ({ data, infoPost }) => {
    const infoPosutlations = useSelector((store: any) => store.postulation.inforPostulation.value);
    const filterInfoPost = infoPosutlations?.filter((item: any) => item.id_postulation === infoPost);
    const fecAndHour = moment(filterInfoPost[0]?.pos_updated_at).format('YYYY-MM-DD HH:mm:ss');
    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Nombre del reto:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0]?.cha_name}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Fecha y hora de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span> {fecAndHour}</span>
                </div>
            </div>
            <div className="row  mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Código de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0]?.pos_settled}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Dimensión:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0]?.maedim_name}</span>
                </div>
            </div>
        </>
    );
};

export default DetailGroupPostulation;
