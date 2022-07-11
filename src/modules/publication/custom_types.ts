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