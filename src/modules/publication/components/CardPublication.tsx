import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../../utils/assets/img/ArrowLeft';
import ArrowRight from '../../../utils/assets/img/ArrowRight';
import { actions } from '../redux';

interface IDetailCardPublication {
    keyTab: string;
}

export const DetailCardPublication: FC<IDetailCardPublication> = ({ keyTab }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const publications = useSelector((store: any) => store.event.list_publication.value);
    const {total} = useSelector((store: any) => store.event.list_publication.pagination);
    const {current_page} = useSelector((store: any) => store.event.list_publication.pagination);
    const {last_page} = useSelector((store: any) => store.event.list_publication.pagination);
    const {first_page} = useSelector((store: any) => store.event.list_publication.pagination);
    const number_pages = Number(total)/4;
    let paginationPublications: any[] = []


    for(let i=1; i<= Math.ceil(number_pages); i++) {
        paginationPublications = [...paginationPublications, i]
    }

    const get_publications = async (page: number) => {
        await dispatch(actions.get_history_publications({ page, page_size: 4, only: 'published',...(keyTab !== '0' && { form: Number(keyTab) })}))
    }

    return (
        <>
            <div
                id="carouselPoblications"
                className="carousel slide"
                data-bs-interval="false"
                data-ride="carousel"
                data-pause="hover"
            >
                <div className="carousel-inner">
                    {paginationPublications.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carousel-events-${i}`}>
                            <div className="container">
                                <div className="row my-5 pe-5 ps-5">
                                    {publications?.map((publication: any, index: any) => (
                                        <div
                                            className="col-12 col-md-12 col-lg-6 imagen-events"
                                            key={`detailPublication${index}`}
                                        >
                                            <div
                                                className="text-white text-start ps-5 pe-5"
                                                style={{ position: 'absolute', bottom: '10%' }}
                                            >
                                                <div style={{ fontFamily: 'Montserrat-Bold' }}>
                                                    {publication.hec_titulo}
                                                </div>
                                                <p>{publication.hec_descripcion}</p>
                                                <button className='btn btn-primary'onClick={() => {
                                                navigate(`../detail-publication/${publication?.id}`);
                                            }}>Conoce más</button>
                                            </div>
                                            
                                            <img
                                                style={{ borderRadius: '16px 16px 0 0' }}
                                                className="w-100"
                                                src="https://images.pexels.com/photos/6958766/pexels-photo-6958766.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                alt={publication.hec_titulo}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'relative', bottom: '5px', right: '100px', textAlign: 'end' }}>
                    <div
                        data-bs-target="#carouselPoblications"
                        data-bs-slide="prev"
                        style={{ marginRight: '50px', cursor: 'pointer' }}
                        onClick={() => {
                            setTimeout(function () {
                                get_publications(current_page-1 >= first_page ? current_page-1 : last_page  )
                            }, 200);
                        }}
                    >
                        <ArrowLeft color_fill={'#FFFFFF'} />
                        <span className="visually-hidden">Anterior</span>
                    </div>

                    <div
                        data-bs-target="#carouselPoblications"
                        data-bs-slide="next"
                        className="ms-5"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setTimeout(function () {
                                get_publications(current_page+1 <= last_page ? current_page+1 : first_page  )
                            }, 200);
                        }}
                    >
                        <ArrowRight color_fill="#ffffff" />
                        <span className="visually-hidden">Siguiente</span>
                    </div>
                </div>
            </div>
        </>
    );
};
