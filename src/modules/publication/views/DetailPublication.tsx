import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { trazado_amarillo } from '../../../utils/assets/img';
import { Card } from '../../../utils/ui';
import { actions } from '../redux';
import { Buffer } from 'buffer';
import ModalDetailGallery from '../components/ModalDetailGallery';
import { TemplateContext } from '../../../utils/components/template/templateContext';
import { Skeleton } from 'antd';
import ComponetLoading from '../../event/compenents/ComponetLoading';
import moment from 'moment';
import { formatDate } from '../../../utils';

const DetailPublication = () => {
    const { id } = useParams();
    const context = useContext(TemplateContext);
    const dispatch = useDispatch<any>();
    const publication: any = useSelector((states: any) => states.publication.publication.value);
    const loading: any = useSelector((states: any) => states.publication.publication.loading);

    useEffect(() => {
        dispatch(actions.get_publication_by_id(Number(id), 'landing'));
    }, []);

    useEffect(() => {
        if (publication?.pub_description) {
            const content: any = document.getElementById('description-postulation');
            var htmlObject: any = document.createElement('div');
            htmlObject.innerHTML = publication?.pub_description;
            while (content?.firstChild) {
                content?.removeChild(content.firstChild);
            }
            content?.appendChild(htmlObject);
        }
    }, [publication?.pub_description, loading]);

    return (
        <div style={{ position: 'relative', paddingBottom: '50px', overflow: 'hidden' }}>
            {!loading ? (
                <>
                    <div className="container-img-principal">
                        <img
                            src={
                                publication?.pub_image_buffer?.data &&
                                `data:image/jpeg;charset=utf-8;base64,${Buffer.from(
                                    publication?.pub_image_buffer?.data
                                ).toString('base64')}`
                            }
                            alt="imagen"
                            className="w-100"
                            style={{ position: 'relative', top: '-13%' }}
                        />
                    </div>
                    {context.device !== 'sm' && (
                        <img
                            src={trazado_amarillo}
                            alt="trazado"
                            style={{ position: 'absolute', bottom: '-12%', left: '-130%', maxWidth: '250%' }}
                        />
                    )}
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-4"></div>
                            <div className="col">
                                <div
                                    className={`text-white ${context.device === 'lg' ? 'my-5' : 'my-2'}`}
                                    style={{ position: 'relative' }}
                                >
                                    <div>Medellín { formatDate(moment(publication?.pub_created_at).format('DD MMMM YYYY').toLowerCase()) }</div>
                                    <h2 className="text-white">{publication?.pub_title}</h2>
                                    <div style={{ fontSize: '16px' }}>
                                        Introducción a la noticia con texto descriptivo del contenido a consultar o leer
                                        por el visitante...
                                    </div>
                                    <div>Autor</div>
                                    <div>{publication?.pub_author}</div>
                                </div>
                            </div>
                        </div>

                        <Card loading={loading} className={`${context.device === 'lg' && 'p-5'}`}>
                            <div id="description-postulation" className="mb-5 "></div>

                            <div className="row justify-content-center">
                                {publication?.pub_gallery?.map((gallery: any, i: number) => (
                                    <div
                                        key={`detail-publication-${i}`}
                                        className={` col-12 col-md-4 col-lg-4 p-0 container-publication-detail`}
                                    >
                                        {loading ? (
                                            <Skeleton.Image className="w-100" active={true} />
                                        ) : (
                                            <ModalDetailGallery gallery={gallery} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </>
            ) : (
                // <div className="container">
                //     <div className="row my-5">
                //         <div className="col"></div>
                //         <div className="col">
                //             <Skeleton active />
                //         </div>
                //     </div>
                //     <Card className="my-5">
                //         <Skeleton active />
                //         <Skeleton active />
                //         <div className="row mt-3">
                //             <div className="col p-0">
                //                 <Skeleton.Image className="w-100" active />
                //             </div>
                //             <div className="col p-0">
                //                 <Skeleton.Image className="w-100" active />
                //             </div>
                //             <div className="col p-0">
                //                 <Skeleton.Image className="w-100" active />
                //             </div>
                //         </div>
                //     </Card>
                // </div>
                <div className='my-5'>
                    <ComponetLoading height='450px' color='rgba(33, 25, 21, 0.4)' />
                </div>
            )}
        </div>
    );
};

export default DetailPublication;
