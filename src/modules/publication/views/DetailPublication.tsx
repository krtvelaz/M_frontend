import { trazado_amarillo } from '../../../utils/assets/img';
import { Card } from '../../../utils/ui';

const DetailPublication = () => {
    return (
        <div style={{ position: 'relative', paddingBottom: '50px', overflow: 'hidden'  }}>
            <div className="container-img-principal">
                <img src='https://images.pexels.com/photos/5560471/pexels-photo-5560471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="imagen" className="w-100 h-100 d-block" />
            </div>
            <img src={trazado_amarillo} alt="trazado"  style={{ position: 'absolute', bottom: '-12%', left: '-130%', maxWidth: '250%'}} />
            
            <div className="container">
                <div style={{position: 'relative', padding: '100px 0 100px 50px'}}>
                    <div>Medellín 9 de junio de 2022</div>
                    <h2>Titulo de la noticia</h2>
                    <div style={{fontSize: '16px', width: '450px'}}>
                        Introducción a la noticia con texto descriptivo del contenido a consultar o leer por el
                        visitante...
                    </div>
                    <div>Autor</div>
                    <div>Comunicaciones secretaría de Innovación</div>
                </div>

                <Card className='p-5'>
                    <h3 className='mb-3'>Un mundo de innovación</h3>
                    <p>
                        Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de darle like y de
                        compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de
                        darle like y de compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2
                        acciones de darle like y de compartir. Testo de la noticia que puede leer el usuario, además se
                        habilitan 2 acciones de darle like y de compartir.Testo de la noticia que puede leer el usuario,
                        además se habilitan 2 acciones de darle like y de compartir.
                    </p>
                    <h3 className='mb-3'>Más que Una ciudad del siglo XXI</h3>
                    <p>
                        Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de darle like y de
                        compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de
                        darle like y de compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2
                        acciones de darle like y de compartir. Testo de la noticia que puede leer el usuario, además se
                        habilitan 2 acciones de darle like y de compartir.Testo de la noticia que puede leer el usuario,
                        además se habilitan 2 acciones de darle like y de compartir.
                    </p>
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
                    <h3 className='mt-5 mb-3'>Un mundo de innovación</h3>
                    <p>
                        Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de darle like y de
                        compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2 acciones de
                        darle like y de compartir. Testo de la noticia que puede leer el usuario, además se habilitan 2
                        acciones de darle like y de compartir. Testo de la noticia que puede leer el usuario, además se
                        habilitan 2 acciones de darle like y de compartir.Testo de la noticia que puede leer el usuario,
                        además se habilitan 2 acciones de darle like y de compartir.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default DetailPublication;
