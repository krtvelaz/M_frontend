import { number } from "yup";

export interface IChallenge {
  general_information: IGeneralInformation;
  documents: IDocuments;
  reports: Informe[];
}

export interface IGeneralInformation {
  key?: number;
  id?: number;
  ret_nombre: string;
  ret_perfil: any;
  ret_dimension: number | string;
  ret_dependencia: number | string;
  ret_fecha_inicio: string;
  ret_fecha_final: string;
  ret_detalles: string;
  ret_comuna: number | string;
  ret_barrio: number | string;
  ret_detalle_postulacion: string;
  ret_imagen_principal?: any;
  ret_ruta_imagen_principal: string;
  ret_nombre_imagen: string;
  ret_video: string;
  ret_dato_importante: string;
  ret_resultado_esperado: string;
  ret_monto: number | string;
  ret_descripcion: string;
  ret_tipo_impacto: string;
}
export interface IDocuments {
  general: IDocument[];
  technical: IDocument[];
  administrative: IDocument[];
}

export interface IDocument {
  id?: number;
  ret_tipo_documento: number;
  ret_nombre_documento: string;
  ret_perfiles: number;
  ret_plantilla?: any;
  ret_ruta_plantilla: string;
  ret_nombre_plantilla: string;
  ret_tipo_formulario?: number;
  ret_creado?: string;
  ret_estado?: boolean;
  key?: string;

}
export interface Informe {
  id?: number;
  ret_titulo_reporte: string;
  ret_documento?: any;
  ret_ruta_documento: string;
  ret_nombre_documento: string;
  ret_creado?: string;
  ret_estado?: boolean;
  ret_reto_general?: number;
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