import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../../utils/assets/img/ArrowLeft';
import ArrowRight from '../../../utils/assets/img/ArrowRight';
import { actions } from '../redux';
import { Buffer } from 'buffer';
import { Skeleton } from 'antd';
import ComponetLoading from '../../event/compenents/ComponetLoading';

interface IDetailCardPublication {
    keyTab: string;
}

export const DetailCardPublication: FC<IDetailCardPublication> = ({ keyTab }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const publications = useSelector((store: any) => store.publication.list_publication.value);
    const loading = useSelector((store: any) => store.publication.list_publication.loading);
    const { total } = useSelector((store: any) => store.publication.list_publication.pagination);
    const { current_page } = useSelector((store: any) => store.publication.list_publication.pagination);
    const { last_page } = useSelector((store: any) => store.publication.list_publication.pagination);
    const { first_page } = useSelector((store: any) => store.publication.list_publication.pagination);
    const number_pages = Number(total) / 4;
    let paginationPublications: any[] = [1];

    for (let i = 1; i <= Math.ceil(number_pages); i++) {
        paginationPublications = [i];
    }

    const get_publications = async (page: number) => {
        await dispatch(
            actions.get_list_publications({
                page,
                page_size: 4,
                from: 'landing',
                is_published: true,
                ...(keyTab !== '0' && { type: keyTab }),
            })
        );
    };
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
                    {paginationPublications?.map((item: any, i: number) => (
                        <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={`carousel-events-${i}`}>
                            {loading ? (
                                <ComponetLoading height="450px" />
                            ) : publications.length > 0 ? (
                                <div className="container">
                                    <div className="row my-5 pe-5 ps-5">
                                        {publications?.map((publication: any, index: any) => (
                                            <div
                                                className={`col-12 col-md-12 col-lg-6 p-0 imagen-events `}
                                                key={`detailPublication${index}`}
                                                style={{
                                                    borderRadius: `${index === 0 || index === 1 ? '16px 16px 0 0' : '0 0 16px 16px'
                                                        } `,
                                                }}
                                            >
                                                <>
                                                    <div
                                                        className="text-white text-start ps-5 pe-5"
                                                        style={{ position: 'absolute', bottom: '10%' }}
                                                    >
                                                        <div style={{ fontFamily: 'Montserrat-Bold' }}>
                                                            {publication?.pub_title}
                                                        </div>

                                                        <p dangerouslySetInnerHTML={{
                                                            __html: publication?.pub_description?.length > 60
                                                                ? `${publication.pub_description
                                                                    .split('.')[0]
                                                                    .substring(0, 57)}...`
                                                                : publication.pub_description
                                                        }}></p>
                                                        
                                                        <button
                                                            className="btn btn-landing-primary"
                                                            onClick={() => {
                                                                const hola = navigate(
                                                                    `../detail-publication/${publication?.id}`
                                                                );
                                                            }}
                                                        >
                                                            Conoce más
                                                        </button>
                                                    </div>

                                                    {publication?.pub_image?.pubfil_image_buffer?.data ? (
                                                        <img
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: '50% 50%',
                                                                minHeight: '350px',
                                                                borderRadius: `${index === 0 || index === 1
                                                                        ? '16px 16px 0 0'
                                                                        : '0 0 16px 16px'
                                                                    } `,
                                                            }}
                                                            className="w-100"
                                                            src={`data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                                                publication?.pub_image?.pubfil_image_buffer?.data
                                                            ).toString('base64')}`}
                                                            alt={publication.hec_titulo}
                                                        />
                                                    ) : (
                                                        <Skeleton.Image
                                                            active={loading}
                                                            className="w-100 "
                                                            style={{
                                                                minHeight: '350px',
                                                                paddingBottom: '20px',
                                                                borderRadius: `${index === 0 || index === 1
                                                                        ? '16px 16px 0 0'
                                                                        : '0 0 16px 16px'
                                                                    } `,
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <ComponetLoading
                                    height="450px"
                                    title={`No hay publicaciones de ${keyTab.toLocaleLowerCase()}`}
                                    loading={false}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {number_pages && (
                    <div style={{ position: 'relative', bottom: '5px', right: '100px', textAlign: 'end' }}>
                        <div
                            data-bs-target="#carouselPoblications"
                            data-bs-slide="prev"
                            style={{ marginRight: '50px', cursor: 'pointer' }}
                            onClick={() => {
                                setTimeout(function () {
                                    get_publications(current_page - 1 >= first_page ? current_page - 1 : last_page);
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
                                    get_publications(current_page + 1 <= last_page ? current_page + 1 : first_page);
                                }, 200);
                            }}
                        >
                            <ArrowRight color_fill="#ffffff" />
                            <span className="visually-hidden">Siguiente</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
