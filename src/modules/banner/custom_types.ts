export default {};
export interface IMainBanner {
    title: string;
    description: string;
    button_url: string;
    video_url: string;
    background_image: string;
}
export interface ITestimony {
    id?: number;
    mas_title: string;
    mas_description: string;
    mas_image: string;
    mas_logo: string;
   
}
export interface IIndicator {
    mas_challenges_number:string | number;
    mas_impacted_people:string | number;
    mas_connected_actors:string | number;
    mas_implemented_solutions:string | number;
    mas_description_challenges_number:string;
    mas_description_impacted_people:string;
    mas_description_connected_actors:string;
    mas_description_implemented_solutions:string;
}
