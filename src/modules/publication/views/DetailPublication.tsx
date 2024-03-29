import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { invalidateImg, trazado_amarillo } from '../../../utils/assets/img';
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
            let htmlObject: any = document.createElement('div');
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
                    <div className="container-img-publication-principal">
                        {publication?.pub_image_buffer?.data ? (
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
                        ) : (
                            <div
                                className="p-4"
                                style={{
                                    height: '100%',
                                    backgroundColor: '#1D98D1',
                                }}
                            >
                                <div className="row" style={{ marginTop: '40px' }}>

                                    <div className="col-12 col-lg-4 text-center">
                                        <img className="" src={invalidateImg} alt="" />
                                        <div className="mt-3 text-white">
                                            Lo sentimos actualmente no se puede visualizar la imagen, inténtalo más
                                            tarde.
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {(context.device !== 'sm' && publication?.pub_description.length > 1500) && (
                        <img
                            src={trazado_amarillo}
                            alt="trazado"
                            style={{ position: 'absolute', top: '-5%', left: '-50%', maxWidth: '4000px' }}
                        />
                    )}
                    <div className="container" style={{ marginBottom: '100px' }}>
                        <div className="row" style={context.device !== 'lg' ? { marginTop: '130px' } : {}}>
                            <div className="col-12 col-md-12 col-lg-4"></div>
                            <div className="col">
                                <div
                                    className={`text-white ${context.device === 'lg' ? 'my-5' : 'my-2'}`}
                                    style={{ position: 'relative', margin: '0 20px' }}
                                >
                                    <div className="mt-5">
                                        Medellín{' '}
                                        {formatDate(
                                            moment(publication?.pub_created_at).format('DD MMMM YYYY').toLowerCase()
                                        )}
                                    </div>
                                    <h2 className="text-white">{publication?.pub_title}</h2>
                                    <div style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{
                                        __html:
                                            publication?.pub_description?.length > 60
                                                ? `${publication?.pub_description
                                                    .split('.')[0]
                                                    .substring(0, 57)}...`
                                                : publication?.pub_description,
                                    }}>
                                    </div>
                                    <div>Autor</div>
                                    <div>{publication?.pub_author}</div>
                                </div>
                            </div>
                        </div>

                        <Card style={{ margin: '0 20px' }} loading={loading} className={`${context.device === 'lg' && 'p-5'}`}>
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
                <div className="my-5">
                    <ComponetLoading height="450px" color="rgba(33, 25, 21, 0.4)" />
                </div>
            )}
        </div>
    );
};

export default DetailPublication;
