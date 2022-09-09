import { Popover } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { IEvent } from '../../custom_types';
interface ICardProps {
    event: IEvent;
    children: any;
}

const PopoverEvent:FC<ICardProps> = ({ event, children }) => {
    return (
            <Popover
                trigger="hover"
                className="popover-event"
                content={
                    <>
                        <div className="row " style={{ width: '350px' }}>
                            
                            <div className="col-12 col-md-12 col-lg-3">
                                <div className="text-white text-center date-event" style={{ lineHeight: 1 }}>
                                {moment(event?.eve_fecha).format('MMM')}<br /> <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>{+moment(event?.eve_fecha).format('D') + 1}</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-9">
                                <div className="title-card-event">
                                {event?.eve_titulo}
                                </div>
                                <p>
                                {event?.eve_descripcion}
                                </p>
                                <div className="my-4">{event?.eve_lugar_evento}</div>

                                <span>{moment(event?.eve_hora, 'hh:mm A').format('h:m a')}</span>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <button className="btn-cupos-primary " style={{marginRight: '80px'}}>{event?.eve_cupos_limitado === true ? ` Cupos limitados ${event?.eve_numero_cupos} `  : 'Cupos ilimitados'}</button>
                           
                            <button className="btn btn-primary me-3"
                            onClick={() => {
                                window.open('https://forms.office.com/r/qBLYjsgrm8', '_blank')
                            }}
                            >
                            Asistiré</button>
                        </div>
                    </>
                }
            >
               {children}
            </Popover>
    );
};

export default PopoverEvent;
