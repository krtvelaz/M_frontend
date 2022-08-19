import { number } from "yup";

export interface IChallenge {
  general_information: IGeneralInformation;
  documents: IDocuments;
  reports: Informe[];
}

export interface IGeneralInformation {
  id?: number;
  key?: number;
  cha_announcement?: number;
  cha_name: string;
  cha_start_date: string;
  cha_end_date: string;
  cha_details: string;
  cha_details_population_impact?: string | null;
  cha_principal_image_path?: string | null;
  cha_imagen_principal?: any;
  cha_name_image?: string;
  cha_video_url?: string | null;
  cha_description?: string | null;
  cha_important_data?: string | null;
  cha_expected_results?: string | null;
  cha_amount?: number | null;
  cha_impact_type?: string | null;
  cha_id_user?: number;
  cha_id_dimension?: number | null;
  cha_id_commune?: number | null;
  cha_id_dependency?: number | null;
  cha_id_neighborhood?: number | null;
  cha_status?: number;
  cha_profiles?: number[];
  cha_documents?: any[];
  cha_informs?: any[];
  cha_total_days?: number;
  cha_created_at?: null | any;
  cha_updated_at?: null | any;
}
export interface IDocuments {
  general: IDocument[];
  technical: IDocument[];
  administrative: IDocument[];
}

export interface IDocument {
  id?: number;
  ret_tipo_documento: number | any;
  ret_nombre_documento: string;
  ret_perfiles: number | any;
  ret_plantilla?: any;
  ret_ruta_plantilla: string;
  retdoc_nombre_plantilla: string;
  ret_tipo_formulario?: number;
  ret_creado?: string;
  ret_estado?: boolean;
  key?: string;
}
export interface Informe {
  id?: number;
  retinf_nombre: string;
  retinf_documento?: any;
  retinf_nombre_documento: string;
  retinf_ruta_archivo?: string;
  retinf_nombre_archivo?: string;
  retinf_creado?: string;
  retinf_modificado?: string;
  retinf_estado?: boolean;
  retinf_reto_general?: number;
  key?: string;
}

export interface IMasters {
  tbl_barrio: Master[];
  tbl_comunas: Master[];
  tbl_dependencia: Master[];
  tbl_dimensiones: Master[];
  tbl_perfil: Master[];
  tbl_tipo_documento_general: Master[];
  tbl_tipo_documento_tecnico: Master[];
  tbl_tipo_documento_admin: Master[];
}

interface Master {
  id: number;
  nombre: string;
}
