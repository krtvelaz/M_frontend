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
    const onChange = async (key: string) => {
        await dispath(
            actions.get_list_challenges({
                page: 1,
                page_size: 10,
                from: 'landing',
                is_published: true,
                ...(key === '1' ? { is_opened: true } : { is_closed: true }),
            })
        );
        setActiveKey(Number(key));
    };

    const challenges = useSelector((store: any) => store.challenge.challenges.value);
    const { last_page } = useSelector((store: any) => store.challenge.challenges.pagination);
    const { first_page } = useSelector((store: any) => store.challenge.challenges.pagination);
    const loading = useSelector((store: any) => store.challenge.challenges.loading);
    const dimensions = useSelector((store: any) => store.challenge.dimensions.value);

    const onDimiension = (dimension: any) => {
        dispath(
            actions.get_list_challenges({
                page: 1,
                page_size: 10,
                from: 'landing',
                is_published: true,
                ...(activeKey === 1 ? { is_opened: true } : { is_closed: true }),
                dimension: `${dimension?.id}`,
            })
        );
    };

    useEffect(() => {
        dispath(
            actions.get_list_challenges({
                page: 1,
                page_size: 10,
                from: 'landing',
                is_published: true,
                is_opened: true,
            })
        );
    }, []);

    useEffect(() => {
        dispath(actions.get_dimensions());
    }, []);

    return (
        <>
            <div
                className="tab-our-challenges"
                style={{ background: '#fff', position: 'relative', paddingBottom: '120px' }}
            >
                {!loading && challenges?.length > 0 && (
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
                )}

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
                <div style={{ position: 'relative'}}>
                    <hr style={{
                            position: 'absolute',
                            width: '91%',
                            top: '37px',
                            left: '0px',
                            opacity: 1,
                        
                        
                            borderTop: '1px solid #603CE6', borderBottom: 'none'}} />
                    <Tabs
                        tabBarStyle={{
                            fontSize: '16px',
                            marginBottom: 0,
                        }}
                        className="container tab-our-challenges"
                        defaultActiveKey="1"
                        onChange={onChange}
                    >
                        <TabPane tab="Retos actuales" key="1">
                            <div className="mt-5" style={{ position: 'relative' }}>
                                <button
                                    className="btn btn-outline-landing-primary me-3 btn-dimension-active"
                                    id={`btn-dimension-all`}
                                    onClick={() => {
                                        var matches = document.querySelectorAll(`.btn-dimension-active`);
                                        for (let i = 0; i < matches.length; i++) {
                                            matches[i].classList.remove('btn-dimension-active');
                                        }
                                        const element: any = document.querySelector(`#btn-dimension-all`);
                                        element.classList.add('btn-dimension-active');
                                        dispath(
                                            actions.get_list_challenges({
                                                page: 1,
                                                page_size: 10,
                                                from: 'landing',
                                                is_published: true,
                                                is_opened: true,
                                            })
                                        );
                                    }}
                                >
                                    Todos
                                </button>
                                {dimensions.map((dimension: any, index: number) => (
                                    <button
                                        className="btn  btn-outline-landing-primary me-3"
                                        id={`btn-dimension-${dimension.id}`}
                                        key={`dimension-${index}`}
                                        onClick={() => {
                                            var matches = document.querySelectorAll(`.btn-dimension-active`);
                                            for (let i = 0; i < matches.length; i++) {
                                                matches[i].classList.remove('btn-dimension-active');
                                            }
                                            const element: any = document.querySelector(
                                                `#btn-dimension-${dimension.id}`
                                            );
                                            element.classList.add('btn-dimension-active');

                                            onDimiension(dimension);
                                        }}
                                    >
                                        {dimension?.maedim_nombre}
                                    </button>
                                ))}

                                {loading ? (
                                    <div className="mx-auto text-center mt-5" style={{ width: '200px' }}>
                                        Cargando...{' '}
                                        <i
                                            className="fa fa-circle-o-notch fa-spin"
                                            style={{ fontSize: 12, marginLeft: 10, color: '#000' }}
                                        />
                                    </div>
                                ) : challenges?.length > 0 ? (
                                    <div className="row my-5 history-challenges">
                                        {challenges.map((challenge: any, i: number) => (
                                            <div className="col-12 col-md-6 col-lg-4 pt-3" key={`card-img-${i}`}>
                                                {' '}
                                                <CardImgChallenge data={challenge} />
                                            </div>
                                        ))}
                                        {first_page !== last_page && (
                                            <div className="col-12 text-right">
                                                <button className="btn btn-outline-primary">Cargar más retos</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mx-auto text-center mt-5" style={{ width: '200px' }}>
                                        No hay resultados
                                    </div>
                                )}
                            </div>
                        </TabPane>

                        <TabPane tab="Historial de nuestros retos" key="2">
                            <div className="mt-5" style={{ position: 'relative' }}>
                                <button
                                    className="btn btn-outline-landing-primary me-3 btn-dimension-active"
                                    id={`btn-dimension-close-all`}
                                    onClick={() => {
                                        var matches = document.querySelectorAll(`.btn-dimension-active`);
                                        for (let i = 0; i < matches.length; i++) {
                                            matches[i].classList.remove('btn-dimension-active');
                                        }
                                        const element: any = document.querySelector(`#btn-dimension-close-all`);
                                        element.classList.add('btn-dimension-active');
                                        dispath(
                                            actions.get_list_challenges({
                                                page: 1,
                                                page_size: 10,
                                                from: 'landing',
                                                is_published: true,
                                                is_closed: true,
                                            })
                                        );
                                    }}
                                >
                                    Todos
                                </button>
                                {dimensions.map((dimension: any, index: number) => (
                                    <button
                                        className="btn  btn-outline-landing-primary me-3"
                                        id={`btn-dimension-close-${dimension.id}`}
                                        key={`dimension-${index}`}
                                        onClick={() => {
                                            var matches = document.querySelectorAll(`.btn-dimension-active`);
                                            for (let i = 0; i < matches.length; i++) {
                                                matches[i].classList.remove('btn-dimension-active');
                                            }
                                            const element: any = document.querySelector(
                                                `#btn-dimension-close-${dimension.id}`
                                            );
                                            element.classList.add('btn-dimension-active');

                                            onDimiension(dimension);
                                        }}
                                    >
                                        {dimension?.maedim_nombre}
                                    </button>
                                ))}
                                {loading ? (
                                    <div className="mx-auto text-center mt-5" style={{ width: '200px' }}>
                                        Cargando...{' '}
                                        <i
                                            className="fa fa-circle-o-notch fa-spin"
                                            style={{ fontSize: 12, marginLeft: 10, color: '#000' }}
                                        />
                                    </div>
                                ) : challenges?.length > 0 ? (
                                    <div className="row my-5 history-challenges">
                                        {challenges.map((challenge: any, i: number) => (
                                            <div className="col-12 col-md-6 col-lg-4 pt-3" key={`card-img-${i}`}>
                                                {' '}
                                                <CardImgChallenge data={challenge} />
                                            </div>
                                        ))}
                                        {first_page !== last_page && (
                                            <div className="col-12 text-right">
                                                <button className="btn btn-outline-primary">Cargar más retos</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mx-auto text-center mt-5" style={{ width: '200px' }}>
                                        No hay resultados
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default OurChallenges;
