import moment from "moment";
import { FC } from "react";
import { Card } from "../../../../utils/ui";
import { IEvent } from "../../custom_types";

interface ICardProps {
    event: IEvent;
}

const CardEvent: FC<ICardProps> = ({ event }) => {
    return (
        <Card
            className="card-event"
            actions={[
                <div className="mb-3 d-flex justify-content-end">
                    <button className="btn-cupos-primary me-5">Cupos limitados</button>
                    <button className="btn btn-primary me-3">Asistiré</button>
                </div>,
            ]}
        >
            <div className="row">
                <div className="col-12 col-md-12 col-lg-3">
                    <div className="text-white text-center date-event" style={{ lineHeight: 1 }}>
                        {moment(event?.eve_fecha).format('MMM').toUpperCase()} <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>{moment(event?.eve_fecha).format('DD')}</span>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-9">
                    <div className="title-card-event">{event?.eve_titulo}</div>
                    <p>
                        {event?.eve_descripcion}
                    </p>
                    <div className="my-4">{event?.eve_lugar_evento}</div>

                    <span>{moment().format('LT')}</span>
                </div>
            </div>
        </Card>
    );
};

export default CardEvent;
