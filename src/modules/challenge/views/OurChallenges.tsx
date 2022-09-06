import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { figuraRetos } from '../../../utils/assets/img';
import CardImgChallenge from '../components/CardImgChallenge';
import { actions } from '../redux';

const OurChallenges = () => {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState<number>(1);
    const dispath = useDispatch<any>();
    const onChange = (key: string) => {
        setActiveKey(Number(key));
    };

    const challenges = useSelector((store: any) => store.challenge.challenges.value);
    const dimensions = useSelector((store: any) => store.challenge.dimensions.value);

    const onDimiension = (dimension: any) => {
        dispath(actions.get_history_challenges(activeKey, dimension?.id));
    };

    useEffect(() => {
        dispath(actions.get_history_challenges(activeKey));
    }, [activeKey]);

    useEffect(() => {
        dispath(actions.get_dimensions());
    }, []);

    return (
        <>
            <div
                className="tab-our-challenges"
                style={{ background: '#fff', position: 'relative', paddingBottom: '120px' }}
            >
                <img
                    src="src/utils/assets/img/fondo_retos.svg"
                    alt=""
                    style={{
                        position: 'absolute',
                        bottom: '-8%',
                        left: '-50%',
                        maxWidth: '300%',
                    }}
                />
                <img
                    src={figuraRetos}
                    alt="figuras de fondo"
                    style={{ position: 'absolute', top: 0, right: 0, width: '21%' }}
                />
                <div className="text-center" style={{ fontSize: '18px', paddingTop: '20px' }}>
                    Conoce todos
                </div>
                <div className="text-center" style={{ fontSize: '25px', fontFamily: 'Montserrat-Bold' }}>
                    Nuestros Retos
                </div>
                <Tabs defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="Retos actuales" key="1">
                        <div className="container mt-5" style={{ position: 'relative' }}>
                            <button className="btn btn-outline-primary me-3">Todos</button>
                            {dimensions.map((dimension: any, index: number) => (
                                <button
                                    className="btn btn-outline-primary me-3"
                                    id={`btn-dimension-${dimension.id}`}
                                    key={`dimension-${index}`}
                                    onClick={() => {
                                        var matches = document.querySelectorAll(`.btn-dimension-active`);
                                        for (let i = 0; i < matches.length; i++) {
                                            matches[i].classList.remove('btn-dimension-active');
                                        }                                        
                                        const element: any = document.querySelector(`#btn-dimension-${dimension.id}`);
                                        element.classList.add('btn-dimension-active');

                                        onDimiension(dimension);
                                    }}
                                >
                                    {dimension?.maedim_nombre}
                                </button>
                            ))}

                            <div className="row my-5 history-challenges">
                                {challenges.map((challenge: any) => (
                                    <div className="col-12 col-md-6 col-lg-4 pt-3">
                                        {' '}
                                        <CardImgChallenge data={challenge} />
                                    </div>
                                ))}
                                <div className="col-12 text-right">
                                    <button className="btn btn-outline-primary">Cargar más retos</button>
                                </div>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Historial de nuestros retos" key="2">
                        <div className="container mt-5" style={{ position: 'relative' }}>
                            <button className="btn btn-outline-primary me-3">Todos</button>
                            {dimensions.map((dimension: any, index: number) => (
                                <button className="btn btn-outline-primary me-3" key={`dimensionaHistory-${index}`}>
                                    {dimension?.maedim_nombre}
                                </button>
                            ))}
                            <div className="row my-5 history-challenges">
                                {challenges.map((challenge: any) => (
                                    <div className="col-12 col-md-6 col-lg-4 pt-3">
                                        <CardImgChallenge data={challenge} />
                                    </div>
                                ))}
                                <div className="col-12 text-right">
                                    <button className="btn btn-outline-primary">Cargar más retos</button>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
};

export default OurChallenges;
