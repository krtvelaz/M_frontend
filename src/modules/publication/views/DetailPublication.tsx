import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { trazado_amarillo } from '../../../utils/assets/img';
import { Card } from '../../../utils/ui';
import { actions } from '../redux';

const DetailPublication = () => {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const publication: any = useSelector((states: any) => states.event.publication.value);

    useEffect(() => {
        dispatch(actions.get_publication_by_id(Number(id)));
    }, []);

    useEffect(() => {
        if (publication?.pub_description) {
            const content: any = document.getElementById('description-postulation');
            var htmlObject: any = document.createElement('div');
            htmlObject.innerHTML = publication?.pub_description;
            while (content.firstChild) {
                content?.removeChild(content.firstChild);
            }
            content?.appendChild(htmlObject);
        }
    }, [publication?.pub_description]);

    return (
        <div style={{ position: 'relative', paddingBottom: '50px', overflow: 'hidden' }}>
            <div className="container-img-principal">
                <img
                    src="https://images.pexels.com/photos/5560471/pexels-photo-5560471.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="imagen"
                    className="w-100 h-100 d-block"
                />
            </div>
            <img
                src={trazado_amarillo}
                alt="trazado"
                style={{ position: 'absolute', bottom: '-12%', left: '-130%', maxWidth: '250%' }}
            />

            <div className="container">
                <div style={{ position: 'relative', padding: '100px 0 100px 50px' }}>
                    <div>Medellín 9 de junio de 2022</div>
                    <h2>{publication?.pub_title}</h2>
                    {/* <div style={{ fontSize: '16px', width: '450px' }}>
                        Introducción a la noticia con texto descriptivo del contenido a consultar o leer por el
                        visitante...
                    </div> */}
                    <div>Autor</div>
                    <div>{publication?.pub_author}</div>
                </div>

                <Card className="p-5">
                    <div id="description-postulation" className="mb-5 "></div>

                    <div className="row">
                        <div className="col-12 col-md-4">
                            <img
                                src="https://images.pexels.com/photos/6731324/pexels-photo-6731324.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt=""
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <img
                                src="https://images.pexels.com/photos/4201333/pexels-photo-4201333.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt=""
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <img
                                src="https://images.pexels.com/photos/4458425/pexels-photo-4458425.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt=""
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DetailPublication;
