import { Popover } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { IEvent } from '../custom_types';
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
                                {moment(event?.eve_date).format('MMM')}<br /> <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>{+moment(event?.eve_date).format('D') + 1}</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-9">
                                <div className="title-card-event">
                                {event?.eve_title}
                                </div>
                                <p>
                                {event?.eve_description}
                                </p>
                                <div className="my-4">{event?.eve_place}</div>

                                <span>{moment(event?.eve_date).utc().format('LT')}</span>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <div className="" style={{marginRight: '50px', color: '#FF8403', fontFamily: 'Montserrat-SemiBold', marginTop: '10px'}}>{event?.eve_attendance_limit === true ? ` Cupos limitados ${event?.eve_attendance_quota} `  : 'Cupos ilimitados'}</div>
                           
                            <button className="btn btn-landing-primary me-3"
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
