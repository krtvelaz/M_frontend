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
    title: string;
    description: string;
    start_date: string;
    start_time: string;
    radiogrou: string;
    number_quotas: string;
    
}
