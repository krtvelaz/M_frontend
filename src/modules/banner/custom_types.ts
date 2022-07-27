export default {};
export interface IMainBanner {
    car_codigo_usuario?:string;
    car_titulo: string;
    car_descripcion: string;
    car_url: string;
    car_url_video: string;
    car_imagen?: any;
    car_ruta_imagen?: string;
    car_nombre_imagen?: string;
    id?: number;
    key?: string;
    car_creado?: string;
   
}
export interface ITestimony {
    id?: number;
    key?: string;
    tes_titulo: string;
    tes_descripcion: string;
    tes_ruta_imagen?: string;
    tes_nombre_imagen: string;
    tes_ruta_logo?: string;
    tes_nombre_logo: string;
    tes_imagen?: any;
    tes_logo?: any;
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
    est_creacion?: string;
    est_estado?: string;
    id?: number;
}
