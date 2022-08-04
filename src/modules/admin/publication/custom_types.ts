export default {};

export interface IPublication {
    general_information: IGeneralInfo
    gallery: IGalleryInfo[],
}

export interface IPublicationInfo {
    title: string;
    description: string;
    image: string;
}
export interface IGalleryInfo {
    gal_titulo: string;
    gal_descripcion: string;
    img: string;
}

export interface IGeneralInfo {
    hec_titulo: string;
    hec_descripcion: string;
    hec_autor:string;
    img: string;
    hec_id_tipo_publicacion: string;
}

export interface IEvent {
    id?: number;
    eve_titulo: string;
    eve_descripcion: string;
    eve_lugar_evento:string;
    eve_fecha: string;
    eve_hora: string;
    eve_cupos_limitado: boolean;
    eve_numero_cupos: number;
    eve_publicada?:boolean;
    
}
