import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface IDetailCardPublication {

};

export const DetailCardPublication: FC<IDetailCardPublication> = () => {
    const publications = useSelector((store: any) => store.event.list_publication.value);
    const navigate = useNavigate();
    return (
        <div className="row my-5 pe-5 ps-5">
            {
                publications?.map((publication: any, index: any) => (
                    <div style={{cursor: 'pointer'}} onClick={()=> {  navigate(`../detail-publication/${publication?.id}`)}} className="col-12 col-md-12 col-lg-6 imagen-events" key={`detailPublication${index}`}>
                        <div
                            className="text-white text-start ps-5 pe-5"
                            style={{ position: 'absolute', bottom: '10%' }}
                        >
                            <div style={{ fontFamily: 'Montserrat-Bold' }}>{publication.hec_titulo}</div>
                            <p>
                                {publication.hec_descripcion}
                            </p>
                        </div>
                        <img
                            style={{ borderRadius: '16px 16px 0 0' }}
                            className="w-100"
                            src="https://images.pexels.com/photos/6958766/pexels-photo-6958766.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt={publication.hec_titulo}
                        />
                    </div>
                ))
            }
        </div>
    )
}
