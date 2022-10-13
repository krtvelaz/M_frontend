import { FC } from 'react';
import { Card, Divider, Skeleton } from 'antd';
import { Buffer } from 'buffer';
import { formatDate } from '../../../utils';
import { calendarLanding } from '../../../utils/assets/img';

interface IPropsCards {
    data: any;
}

const CardImgChallenge: FC<IPropsCards> = ({ data }) => {
    let _img = null;
    if (Array.isArray(data?.cha_image_buffer?.data)) {
        _img = Buffer.from(data?.cha_image_buffer?.data).toString('base64');
    }

    return (
        <Card
            onClick={() => {}}
            hoverable
            className="card-challenge"
            cover={
                _img ? (
                        <img
                        className="w-100 h-100"
                            style={{ borderRadius: ' 40px 40px 0 0',  objectFit: 'cover', objectPosition: '50% 50%' }}
                            src={`data:image/jpeg;charset=utf-8;base64,${_img}`}
                            alt="Imagen principal del reto"
                        />
                ) : (
                    <Skeleton.Image className="w-100" style={{ minHeight: '150px', borderRadius: ' 40px 40px 0 0' }} />
                )
            }
        >
            <div className="text-center body-card-challenge">
                <h3 className="mt-3">{data?.cha_name}</h3>
                <div className="row">
                    <div className="col-2">
                        <img alt="imagen de calendario" src={calendarLanding} />
                    </div>
                    <div className="col-10">
                        <p>Fecha de vigencia para postulaciones</p>
                        <div className="date-card-challenge">INICIO DEL RETO: {formatDate(data?.cha_start_date)}</div>
                        <div className="date-card-challenge">FIN DEL RETO: {formatDate(data?.cha_end_date)}</div>
                    </div>
                </div>

                <button className="btn" style={{ position: 'absolute', top: '-20px', left: '20px', margin: 0 }}>
                    {data?.cha_dimension?.maedim_nombre}
                </button>
            </div>
        </Card>
    );
};

export default CardImgChallenge;
