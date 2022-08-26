import moment from 'moment';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mujerOk, piezaRompecabezas } from '../../../utils/assets/img';
import { Link } from '../../../utils/ui';
import { actions } from '../redux';
import InfoDetailChallenge from '../components/InfoDetailChallenge';
import ModalVideo from '../../home/components/ModalVideo';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';

const DetailChallenge = () => {
    const { id } = useParams<any>();
    const challenge: any = useSelector((store: any) => store.challenge.challenge.value);

    const [imgPrincipal, setImgPrincipal] = useState<any>({});
    const dispatch = useDispatch<any>();
    const context = useContext(TemplateContext);

    const getChallenge = async () => {
        const res = await dispatch(actions.get_detail_challenge(Number(id)));

        if (res) {
            const _imgPrincipal = await dispatch(actions.get_image_principal(res?.id));
            setImgPrincipal(Buffer.from(_imgPrincipal).toString('base64'));
        }
    };

    useEffect(() => {
        getChallenge();
    }, []);

    return (
        <>
            <div
                className="container-fluid container-info-detail"
                style={{
                    padding: '90px 50px',
                    // background: 'linear-gradient(to top, #ffffff 65%, transparent), url("https://images.pexels.com/photos/12470916/pexels-photo-12470916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div className="container-img-principal">
                    <img
                        src={`data:image/jpeg;charset=utf-8;base64,${imgPrincipal}`}
                        alt="imagen"
                        className="w-100"
                    />
                </div>

                {/* <img src={letras_medeinn} alt="letras medeinn" className="imagen-fondo-detalle" /> */}

                <img src={mujerOk} alt="" className="imagen-fondo-mujer" />

                <div className="row" style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                    <div className="col-12">
                        <div
                            className="row container-detail-challenge"
                            style={{
                                background: 'white',
                                borderRadius: '18px',
                                boxShadow: '0px 30px 80px #00000029',
                                opacity: 1,
                                paddingBottom: '300px',
                            }}
                        >
                            <div
                                className="col-12 col-md-12 col-lg-4"
                                style={{
                                    padding: 0,
                                    marginTop: '-120px',
                                }}
                            >
                                <div className="card-detail-challenge">
                                    <h5 className="my-4 card-title-challenge">{challenge?.cha_name}</h5>

                                    <div className="d-flex justify-content-center text-center align-items-center flex-column">
                                        <i
                                            className="fa fa-calendar-o mx-3"
                                            aria-hidden="true"
                                            style={{ fontSize: '25px', marginTop: '15px', color: '#DE096B' }}
                                        ></i>
                                        <div>
                                            <p className="my-3" style={{ fontFamily: 'Montserrat-SemiBold' }}>
                                                Fecha de vigencia para postulaciones
                                            </p>
                                            <div className="my-4">
                                                <span style={{ fontWeight: 'bold' }}>INICIO DEL RETO: </span>
                                                {moment(challenge?.cha_start_date).locale('es').format('LL')}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>FIN DEL RETO: </span>
                                                {moment(challenge?.cha_end_date).format('LL')}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="mx-auto my-5"
                                        style={{
                                            background: 'white',
                                            borderRadius: '50%',
                                            textAlign: 'center',
                                            height: '10rem',
                                            width: '10rem',
                                            boxShadow: '0px 3px 6px #00000029',
                                            opacity: 1,
                                        }}
                                    >
                                        <img
                                            src={piezaRompecabezas}
                                            alt="pieza rompecabezas"
                                            className="mx-auto"
                                            width={70}
                                            style={{
                                                paddingTop: '20px',
                                            }}
                                        />
                                    </div>

                                    <h5 style={{ textAlign: 'center' }}>El problema y el reto</h5>
                                    <div style={{ textAlign: 'center' }} className="my-3">
                                        Conoce la problemática actual
                                    </div>

                                    <hr className="hr-color" />

                                    {challenge?.ret_video && <Link to="/" name="Presentación" iconText=">" />}

                                    <div className="my-4" style={{ textAlign: 'center' }}>
                                        <ModalVideo urlVideo={challenge?.cha_video_url} />
                                    </div>

                                    <div
                                        className="my-5 mx-auto"
                                        style={{
                                            boxShadow: '0px 3px 6px #00000029',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            padding: '10px',
                                            width: '125px',
                                        }}
                                    >
                                        {challenge?.cha_total_days !== 0 ? (
                                            <div>
                                                <div
                                                    style={{
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    FALTAN
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: '30px',
                                                    }}
                                                >
                                                    {challenge?.cha_total_days}
                                                </div>
                                                <div style={{ fontSize: '10px' }}>Días para el cierre del reto</div>
                                            </div>
                                        ) : (
                                            <span style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
                                                {' '}
                                                RETO CERRADO
                                            </span>
                                        )}
                                    </div>
                                    <hr className="hr-color" />
                                </div>
                            </div>
                            <div
                                className="col-12 col-md-12 col-lg-7"
                                style={{
                                    padding: 0,   
                                }}
                            >
                                <div
                                    style={{
                                        borderRadius: '20px',
                                        padding: '20px',
                                    }}
                                >
                                    <InfoDetailChallenge challenge={challenge} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailChallenge;
