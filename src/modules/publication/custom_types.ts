export default {};

export interface IPublication {
    general_information: IGeneralInfo;
    gallery: IGalleryInfo[];
}

export interface IPublicationInfo {
    title: string;
    description: string;
    image: string;
}
export interface IGalleryInfo {
    gal_titulo: string;
    gal_descripcion: string;
    gal_nombre_imagen?: any;
    gal_imagen?: any;
    gal_nombre_imagen_gallery?: string;
    gal_nombre_codificado_imagen?: string;
    gal_ruta_imagen?: string;
    gal_id_hechos_noticias?: number;
    id?: number;
    key?: string;
    gal_creado?: string;
    gal_estado?: boolean;
}

export interface IGeneralInfo {
    hec_titulo: string;
    hec_descripcion: string;
    hec_autor: string;
    hec_nombre_imagen_principal: string;
    hec_id_tipo_publicacion: string | number;
    hec_ruta_imagen_principal?: string;
    hec_nombre_imagen?: any;
    hec_nombre_codificado_imagen_principal?: string;
    id?: number;
    hec_publicada?: boolean;
    hec_creado?: string;
    hec_estado?: boolean;
}

export interface IEvent {
    id?: number;
    eve_titulo: string;
    eve_descripcion: string;
    eve_lugar_evento: string;
    eve_fecha: string;
    eve_hora: string;
    eve_cupos_limitado: boolean;
    eve_numero_cupos: number;
    eve_publicada?: boolean;
}
