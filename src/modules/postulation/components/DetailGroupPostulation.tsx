import { FC } from 'react';
import { useSelector } from 'react-redux';

interface detailPros {
    data?: any;
    infoPost?: any;
}

const DetailGroupPostulation: FC<detailPros> = ({ data, infoPost }) => {
    const infoPosutlations = useSelector((store: any) => store.postulation.inforPostulation.value);
    const filterInfoPost = infoPosutlations?.filter((item: any) => item.id_postulation === infoPost);

    return (
        <>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Nombre del reto:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0].cha_name}</span>
                </div>
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Fecha y hora de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0].pos_updated_at}</span>
                </div>
            </div>
            <div className="row  mb-3">
                <div className="col-12 col-md-6 col-lg-3" style={{ textAlign: 'end' }}>
                    <label htmlFor="title_id">Código de postulación:</label>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <span>{filterInfoPost[0].pos_settled}</span>
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
