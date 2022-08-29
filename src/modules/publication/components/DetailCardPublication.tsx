import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";

interface IDetailCardPublication {
    
};

export const DetailCardPublication: FC<IDetailCardPublication> = () => {  
    return (
        <div className="row my-5 pe-5 ps-5">
            <div className="col-12 col-md-12 col-lg-6 imagen-events">
                <div
                    className="text-white text-start ps-5 pe-5"
                    style={{ position: 'absolute', bottom: '10%' }}
                >
                    <div style={{ fontFamily: 'Montserrat-Bold' }}>Nombre del reto</div>
                    <p>
                        Introducción a la noticia con texto descriptivo del contenido a
                        consultar o leer por el visitante...
                    </p>
                </div>
                <img
                    style={{ borderRadius: '16px 16px 0 0' }}
                    className="w-100"
                    src="https://images.pexels.com/photos/6958766/pexels-photo-6958766.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="imagen 1"
                />
            </div>
            <div className="col-12 col-md-12 col-lg-6 imagen-events">
                <div
                    className="text-white text-start ps-5 pe-5"
                    style={{ position: 'absolute', bottom: '10%' }}
                >
                    <div style={{ fontFamily: 'Montserrat-Bold' }}>Nombre del reto</div>
                    <p>
                        Introducción a la noticia con texto descriptivo del contenido a
                        consultar o leer por el visitante...
                    </p>
                </div>
                <img
                    style={{ borderRadius: '16px 16px 0 0' }}
                    className="w-100"
                    src="https://images.pexels.com/photos/7567309/pexels-photo-7567309.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="imagen 2"
                />
            </div>
            <div className="col-12 col-md-12 col-lg-6 imagen-events">
                <div
                    className="text-white text-start ps-5 pe-5"
                    style={{ position: 'absolute', bottom: '10%' }}
                >
                    <div style={{ fontFamily: 'Montserrat-Bold' }}>Nombre del reto</div>
                    <p>
                        Introducción a la noticia con texto descriptivo del contenido a
                        consultar o leer por el visitante...
                    </p>
                </div>
                <img
                    style={{ borderRadius: '0 0 16px 16px' }}
                    className="w-100"
                    src="https://images.pexels.com/photos/7550532/pexels-photo-7550532.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="imagen 3"
                />
            </div>
            <div className="col-12 col-md-12 col-lg-6 imagen-events">
                <div
                    className="text-white text-start ps-5 pe-5"
                    style={{ position: 'absolute', bottom: '10%' }}
                >
                    <div style={{ fontFamily: 'Montserrat-Bold' }}>Nombre del reto</div>
                    <p>
                        Introducción a la noticia con texto descriptivo del contenido a
                        consultar o leer por el visitante...
                    </p>
                </div>
                <img
                    style={{ borderRadius: '0 0 16px 16px' }}
                    className="w-100"
                    src="https://images.pexels.com/photos/7610525/pexels-photo-7610525.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="imagen 4"
                />
            </div>
        </div>
    )
}
