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
    pubfil_image?: any;
    pubfil_name?: string;
    pubfil_type?: string;
    pubfil_title: string;
    pubfil_description: string;
    
    id?: number;
    key?: string;
   
}

export interface IGeneralInfo {
    pub_type?: string | number;
    pub_title: string;
    pub_description: string;
    pub_author: string;
    pub_imagen?: any;
    pub_gallery?: any;
    pub_attendance_quota?: number;
    pub_attendance_limit?: boolean;
    pub_place?: string;
    pub_subtitle?: string;
    pub_status?: string;
    pub_image?: any;
    pub_created_at?: string;
    pub_updated_at?: string;
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
