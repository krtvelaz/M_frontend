export default {};
export interface IMainBanner {
    id?: number;

    ban_title: string;
    ban_description: string;
    ban_embedded_video: string;
    ban_background_image?: string;
    ban_image: any;
    cha_image_name: any;
    cha_background_image_buffer: any;
    ban_reference_url: string;
    ban_order: number;
    ban_create_at?: string;
    ban_updated_at?: string;
    key?: string;
   
}
export interface ITestimony {
    id?: number;
    tes_title: string;
    tes_description: string;
    tes_image?: string;
    tes_background_image?: any;
    tes_image_name?: string;
    tes_logo?: string;
    tes_background_logo?: File | any;
    tes_logo_name?: string;
    tes_order: number;
    tes_created_at?: string;
    tes_updated_at?: string;
    tes_image_buffer?: string
}
export interface IIndicator {
    sta_name?: string;
    sta_description: string;
    sta_value: number
    sta_order?: number
    id?: number;
    est_created_at?: string;
    est_updated_ad?: string;
}
