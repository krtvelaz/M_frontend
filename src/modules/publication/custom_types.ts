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
    publication_id?: number,
    image?: any;
    title: string;
    description: string;
    id?: number;
    key?: string;
   
}

export interface IGeneralInfo {
    pub_title: string;
    pub_description: string;
    pub_author: string;
    pub_imagen?: any;
    id?: number;
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
