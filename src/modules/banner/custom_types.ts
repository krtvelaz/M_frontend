export default {};
export interface IMainBanner {
    car_codigo_usuario?:string;
    car_titulo: string;
    car_descripcion: string;
    car_url: string;
    car_url_video: string;
    car_ruta_imagen: string;
    car_nombre_imagen: string;
}
export interface ITestimony {
    id?: number;
    mas_title: string;
    mas_description: string;
    mas_image: string;
    mas_logo: string;
   
}
export interface IIndicator {
    est_numero_reto: string | number;
    est_persona_impacto: string | number;
    est_actores_conectados: string | number;
    est_solucion_implementada: string | number;
    est_descripcion_numero_reto: string;
    est_descripcion_persona_impacto: string;
    est_descripcion_actores_conectados: string;
    est_descripcion_solucion_implementada: string;
}
