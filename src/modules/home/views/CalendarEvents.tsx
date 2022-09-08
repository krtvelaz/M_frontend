import { BadgeProps, Card } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEvent } from '../../publication/custom_types';
import { actions } from '../../publication/redux';
// import { actions } from '../../banner/redux';




const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const CalendarEvents = () => {
    useEffect(() => {
        get_events();

    }, []);

    const dispatch = useDispatch<any>();
    // const event = useSelector((store: any) => store.banner.testimonials.value);
    const list_events: IEvent[] = useSelector((store: any) => store.event.list_event.value);


    const get_events = async () => {
        try {
            //    await dispatch(actions.get_list_testimonials());
            await dispatch(actions.get_list_events({}));
        } catch (error) {
            console.error(error)
        }
    };
    console.log(list_events)
    
    const getListData = (value: Moment) => {
        let listData;

        switch (value.year()) {
            case 2022:
                switch (value.month()) {
                    case 8:
                        switch (value.date()) {
                            case 7:
                                listData = [
                                    {
                                        type: 'undefined', content: {
                                            // titulo:event[1]?.tes_titulo,
                                            titulo: list_events[1]?.eve_titulo,
                                            evento: ' evento..'
                                        }
                                    },
                                ];
                                break;
                            case 9:
                                listData = [
                                    {
                                        type: 'undefined', content: {
                                            // titulo:event[3]?.tes_titulo,
                                            titulo: list_events[1]?.eve_titulo,

                                            evento: ' evento..'
                                        }
                                    },
                                ];
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
        }
        return listData || [];
    };
    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul  >
                {listData.map(item => (
                    <li className="card events " style={{ background: '#FF8403', listStyle: 'none' }} >
                        <Badge style={{ color: '#FFFFFF' }} status={item.type as BadgeProps['status']} text={item.content.titulo} />
                        <Badge style={{ color: '#FFFFFF' }} status={item.type as BadgeProps['status']} text={item.content.evento} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <div className="container col-10 box-calendar ">
            <div className="container text-white text-center pt-5">
                <div><p>Medellin 10 de agosto 2022</p></div>
                <div><h1 className=" text-white text-stake">Calendario de eventos</h1></div>
                <div><h3 className=" text-white text-stake-mediun">Conoce y participa en los eventos de innovación</h3></div>
            </div>
            <Card className='m-5 ' style={{ borderRadius: '40px', boxShadow: '0px 30px 80px #00000029' }}>
                <Calendar dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            </Card>
        </div>
    )
};

export default CalendarEvents