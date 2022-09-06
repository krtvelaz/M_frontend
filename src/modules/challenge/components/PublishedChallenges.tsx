import { Card } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { actions } from '../redux';
import { formatDate } from '../../../utils';

const PublishedChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [images, setImages] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    useEffect(() => {
        getChallenges();
    }, []);

    const getChallenges = async () => {
        const results = await dispatch(actions.get_four_challenge());
        if (results.length > 0) {
            setChallenges(results);
            const _images = await Promise.all(
                results?.map((result: any) => dispatch(actions.get_image_principal(result?.id)))
                );                
                setImages(_images?.map(image => Buffer.from(image).toString('base64')));
                

           
        }
    };
    
    
    

    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-5" style={{ marginTop: '55px', position: 'relative' }}>
                <h2>
                    Solucionar e ider
                    <br />
                    <span className="text-stake">Convocatoria abierta</span>
                </h2>
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
                                key={`published-challenges-${challenge?.id}`}
                            >
                                <Card
                                    onClick={() => {
                                        navigate(`../detail-challenge/${challenge?.id}`);
                                    }}
                                    hoverable
                                    className="card-challenge"
                                    cover={<img alt="example" style={{borderRadius:' 40px 40px 0 0'}} src={`data:image/jpeg;charset=utf-8;base64,${images[i]}`}/>}
                                >
                                    <div className="text-center body-card-challenge">
                                        <h3>{challenge?.cha_name}</h3>
                                        <p>Fecha de vigencia para postulaciones</p>
                                        <div className="date-card-challenge">
                                            INICIO DEL RETO: {formatDate(challenge?.cha_start_date)}
                                        </div>
                                        <div className="date-card-challenge">
                                            FIN DEL RETO: {formatDate(challenge?.cha_end_date) }
                                        </div>
                                        <button className="btn">Postularse al reto</button>
                                    </div>
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
