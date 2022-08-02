export default {};

export interface IPublication {
    general_information: IPublicationInfo
    gallery: IPublicationInfo[],
}

export interface IPublicationInfo {
    title: string;
    description: string;
    image: string;
}

export interface IEvent {
    eve_titulo: string;
    eve_descripcion: string;
    eve_lugar_evento:string;
    eve_fecha: string;
    eve_hora: string;
    eve_cupos_limitado: boolean;
    eve_numero_cupos: number;
    
}
