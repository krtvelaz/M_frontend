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
                        AGO <span style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>05</span>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-9">
                    <div className="title-card-event">Título del evento próximo, no debe sobrepasar dos líneas</div>
                    <p>
                        Agregar contenido descriptivo para esta sección donde se pueda entender por parte del usuario si
                        el contenido es de su interés.
                    </p>
                    <div className="my-4">Lugar del evento</div>

                    <span>3: 00 pm</span>
                </div>
            </div>
        </Card>
    );
};

export default CardEvent;
