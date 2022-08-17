import { useSelector } from "react-redux";

const InfoDetailChallenge = () => {
  const challenge: any = useSelector(
    (store: any) => store.challenge.challenge.value
  );
  return (
    <div
      style={{
        // marginLeft: "350px",
      }}
    >
      <p>{challenge?.ret_descripcion}</p>
      
      <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px'}}>Sectores y población de impacto</span>
      <div>Que se solucionará con la solución</div>
      <br />
      <p>{challenge?.ret_detalles}</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, veniam rem ex tenetur provident voluptates, nesciunt quidem magnam consequuntur modi minus dolorum neque in. Veniam sint fuga ut voluptatibus omnis.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, veniam rem ex tenetur provident voluptates, nesciunt quidem magnam consequuntur modi minus dolorum neque in. Veniam sint fuga ut voluptatibus omnis.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, veniam rem ex tenetur provident voluptates, nesciunt quidem magnam consequuntur modi minus dolorum neque in. Veniam sint fuga ut voluptatibus omnis.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, veniam rem ex tenetur provident voluptates, nesciunt quidem magnam consequuntur modi minus dolorum neque in. Veniam sint fuga ut voluptatibus omnis.</p>

     
    

      <span style={{ fontFamily: 'Montserrat-Bold', fontSize: '16px'}}>Requisitos de participación</span>
      <div>Conoce los requisitos para postularse al reto</div>
      <br />
      <p>{challenge?.ret_dato_importante}</p>


      <div style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px'}}>Conformación del grupo</div>
      <br />
      <p>{challenge?.ret_resultado_esperado}</p>
     
      <button type="button" className="btn btn-outline-primary me-3">
        Descargar ficha reto
      </button>
      <button type="button" className="btn btn-outline-primary">
        descargar los términos de referencia
      </button>
      <div className="my-3" style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px'}}>Conformación del grupo</div>
      <p>Descripción del tipo de documentos que debe enviar para postularse al reto</p>
      <ol>
        <li>Nombre del documento</li>
        <li>Nombre del documento</li>
        <li>Nombre del documento</li>
        <li>Nombre del documento</li>
      </ol>
      <button type="button" className="btn btn-primary">
        POSTULAR AL RETO
      </button>
    </div>
  );
};

export default InfoDetailChallenge;
