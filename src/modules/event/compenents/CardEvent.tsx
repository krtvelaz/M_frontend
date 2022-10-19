import { Avatar, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../utils/ui';
import { IEvent } from '../custom_types';

import ModalEvent from './ModalEvent';

interface ICardProps {
    event: IEvent | null;
}

const CardEvent: FC<ICardProps> = ({ event }) => {
    const loading = useSelector((store: any) => store.event.list_event.loading);
    return (
        <Card
            // style={{minHeight: '362px'}}
            // loading={loading}
            className="card-event"
            actions={[
                <div className="mb-3 d-flex justify-content-end">
                    {loading || event === null ? (
                        <>
                            <Skeleton.Input className="mt-1 me-5" active size="small" />
                            <Skeleton.Button className="me-3" active size="large" shape="round" />
                        </>
                    ) : (
                        <>
                            <div className='me-5' style={{color: '#FF9300', fontFamily: 'Montserrat-SemiBold',marginTop: '10px', cursor: 'auto' }}>{event?.eve_attendance_limit ? `Cupos limitados: ${event?.eve_attendance_quota}` :  'Cupos Ilimitados'}</div>
                            <ModalEvent  />
                            
                        </>
                    )}
                </div>,
            ]}
        >
            <Skeleton loading={loading || event === null} paragraph={{ rows: 3 }} avatar active>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-3">
                        <div className="text-white text-center date-event" style={{ lineHeight: 1 }}>
                            {moment(event?.eve_date).format('MMM').toUpperCase()}{' '}
                            <span style={{ fontSize: '25px', fontFamily: 'RedHat-Display-black' }}>
                                {moment(event?.eve_date).format('DD')}
                            </span>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-9">
                        <div className="title-card-event">{event?.eve_title}</div>
                        <p>{event?.eve_description}</p>
                        <div className="my-4">{event?.eve_place}</div>
                        <span>{moment(event?.eve_date).utc().format('LT')}</span>
                    </div>
                </div>
            </Skeleton>
        </Card>
    );
};

export default CardEvent;
