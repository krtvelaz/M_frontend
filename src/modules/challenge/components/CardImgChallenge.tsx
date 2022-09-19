import { FC } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { Buffer } from 'buffer';

interface IPropsCards {
    data: any;
}

const CardImgChallenge: FC<IPropsCards> = ({ data }) => {
    let _img = null;
    if (Array.isArray(data?.cha_image_stream?.data)) {
        _img = Buffer.from(data?.cha_image_stream?.data).toString('base64');
    }

  

    return (
        <Card
            onClick={() => {}}
            hoverable
            className="card-challenge"
            cover={
                _img ? (
                    <img
                        style={{ borderRadius: ' 40px 40px 0 0' }}
                        src={`data:image/jpeg;charset=utf-8;base64,${_img}`}
                        alt="Imagen principal del reto"
                    />
                ) : (
                    <img
                        alt="example"
                        style={{ borderRadius: ' 40px 40px 0 0' }}
                        src="https://images.pexels.com/photos/205416/pexels-photo-205416.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                )
            }
        >
            <div className="text-center body-card-challenge">
                <h3 className="mt-3">nombre</h3>
                <div className="row">
                    <div className="col-2">
                        <i
                            className="fa fa-calendar-o"
                            aria-hidden="true"
                            style={{ fontSize: '30px', color: '#DE096B' }}
                        ></i>
                    </div>
                    <div className="col-10">
                        <p>Fecha de vigencia para postulaciones</p>
                        <div className="date-card-challenge">INICIO DEL RETO: {moment().format('LL')}</div>
                        <div className="date-card-challenge">FIN DEL RETO: {moment().format('LL')}</div>
                    </div>
                </div>

                <button className="btn" style={{ position: 'absolute', top: '-20px', left: '20px', margin: 0 }}>
                    Postularse al reto
                </button>
            </div>
        </Card>
    );
};

export default CardImgChallenge;