import { BadgeProps, Card, Popover } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopoverEvent from './PopoverEvent';
import { actions } from '../redux';

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
    const events: any = useSelector((store: any) => store.event.list_event.value);
    

    const get_events = async () => {
        try {
            await dispatch(actions.get_list_events({page: 1, is_published: true}));
        } catch (error) {
            console.error(error)
        }
    };
    
    const getListData = (value: Moment) => {
        let listData: any;
        events?.map((item: any) => {
            let year = +moment(item?.eve_date).format('YYYY');
            let month = +moment(item?.eve_date).format('M');
            let day = +moment(item?.eve_date).format('D');
            
            switch (value.year()) {
                case year:
                    switch (value.month()) {
                        case --month:
                            switch (value.date()) {
                                case +day:
                                    listData = [
                                        {
                                            type: 'undefined', content: {
                                                titulo: item?.eve_title,
                                                evento: item,
                                            }
                                        },
                                    ];
                                    break;
                                default:
                            }
                            break;
                        default:
                    }
                    break;
                default:
            }
        })
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
                {listData.map((item: any) => (
                    <PopoverEvent event={item.content.evento}>
                        <li className="card events " style={{ background: '#FF8403' }} >
                            <Badge style={{ color: '#FFFFFF', height: '30px' }} status={item.type as BadgeProps['status']} text={item.content.titulo} />
                        </li>
                    </PopoverEvent>
                ))}
            </ul>
        );
    };
    return (
        <div className="box-calendar">
        <div className="container-fluid ">
            <div className="text-white text-center pt-5">
                <div><p>Medellin {moment().format('D')} de {moment().format('MMM YYYY')} </p></div>
                <div><h1 className=" text-white text-stake">Calendario de eventos</h1></div>
                <div><h3 className=" text-white text-stake-mediun">Conoce y participa en los eventos de innovación</h3></div>
            </div>
            <Card className='m-5 ' style={{ borderRadius: '40px', boxShadow: '0px 30px 80px #00000029' }}>
                <Calendar  dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            </Card>
        </div>
        </div>
    )
};

export default CalendarEvents