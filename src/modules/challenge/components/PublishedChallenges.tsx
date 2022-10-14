import { Card, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { actions } from '../redux';
import { formatDate } from '../../../utils';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { calendarLanding } from '../../../utils/assets/img';

const PublishedChallenges = () => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const context = useContext(TemplateContext);
    const user = useSelector((store: any) => store?.auth?.user?.value);
    useEffect(() => {
        getChallenges();
    }, []);

    const getChallenges = async () => {
        setLoading(true);
        const results = await dispatch(
            actions.get_list_challenges({
                page: 1,
                page_size: 4,
                is_published: true,
                order_by_value: 'desc',
                from: 'landing',
            })
        );

        if (results.length > 0) {
            setChallenges(results);
            setLoading(false);    
        } 
    };

    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-5" style={{ marginTop: '55px', position: 'relative' }}>
                <span style={{ fontSize: '16px' }}>
                    Solucionar e idear
                    <br />
                    <span className="text-stake">Convocatoria abierta</span>
                </span>
                <br />
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam provident voluptatem ipsum odit
                    modi ducimus reprehenderit illo, adipisci neque tenetur iusto in quod quas sed ut aliquam recusandae
                    illum beatae!
                </p>
            </div>
            <div className="col-12 col-md-12 col-lg-7">
                <div className="row">
                    {challenges?.map((challenge: any, i: number) => {
                        return (
                            <div
                                className="col-12 col-md-6"
                                id={`${i === 0 ? 'card-challenge-one' : i === 3 && 'card-challenge-four'}`}
                                key={`published-challenges-${i}`}
                            >
                                <Card
                                    hoverable
                                    className="card-challenge"
                                    cover={
                                        challenge?.cha_image_buffer?.data ? (
                                            <div className="colorear">
                                                <img
                                                alt="example"

                                                className="w-100 h-100"
                                                style={{ borderRadius: ' 40px 40px 0 0', objectFit: 'cover', objectPosition: '50% 50%' }}
                                                src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(challenge?.cha_image_buffer?.data).toString('base64')}`}
                                            />

                                            </div>
                                            
                                        ) : (
                                            <Skeleton.Image
                                                className="w-100"
                                                style={{ borderRadius: ' 40px 40px 0 0', minHeight: '200px' }}
                                                active={loading}
                                            />
                                        )
                                    }
                                >
                                    <Skeleton loading={loading} paragraph={{ rows: 3 }} active>
                                        <div className=" body-card-challenge">
                                            <h3 className="text-center">{challenge?.cha_name}</h3>
                                            <div className="row mb-4">
                                                <div className="col-2">
                                                    <img alt="imagen de calendario" src={calendarLanding} />
                                                </div>
                                                <div className="col-10 p-0">
                                                    <p>Fecha de vigencia para postulaciones</p>
                                                    <div className="date-card-challenge " style={{ fontSize: '10px' }}>
                                                        INICIO DEL RETO:{' '}
                                                        <span> {formatDate(challenge?.cha_start_date)}</span>
                                                    </div>
                                                    <div className="date-card-challenge" style={{ fontSize: '10px' }}>
                                                        FIN DEL RETO:{' '}
                                                        <span> {formatDate(challenge?.cha_end_date)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    if (!user) {
                                                        context.toggle_login_modal();
                                                        return;
                                                    }
                                                    navigate(`../detail-challenge/${challenge?.id}`);
                                                }}
                                                className="btn"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-20px',
                                                    left: '30%',
                                                    margin: 0,
                                                }}
                                            >
                                                Postularse al reto
                                            </button>
                                        </div>
                                    </Skeleton>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PublishedChallenges;
