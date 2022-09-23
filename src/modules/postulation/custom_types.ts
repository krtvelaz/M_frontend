export default {};

export interface IPostulation {
   name: string;
   car_imagen?: any;
   document_type: string;
   number_document: string;
   type_profiles: string;
   email: string;
   type_contact: string;
   number_contact: string;
   direction: string;
}

  export interface IPostulationTeam{
   name_last_name: string;
   document_type: string;
   number_document: string;
   type_sex: string;
   gender_identity: string;
   sexual_orientation: string;
   ethnicity: string;
   radiogroup_victim: string;
   radiogroup_disability:string;
}
export interface IAddress{
   type_via: string; 
   character: string; 
   character2: string;
   number: string;
   number2: string;
   number3: string;
   zone: string; 
   zone2: string; 
   observations: string;  
   address: string;
}
  
export interface IIndicator {
   est_numero_reto: string | number;
   est_persona_impacto: string | number;
   est_actores_conectados: string | number;
   est_solucion_implementada: string | number;
   est_descripcion_numero_reto: string;
   est_descripcion_persona_impacto: string;
   est_descripcion_actores_conectados: string;
   est_descripcion_solucion_implementada: string;
   est_creacion?: string;
   est_estado?: string;
   id?: number;
}
export interface ITestimony {
   id?: number;
   key?: string;
   tes_titulo: string;
   tes_descripcion: string;
   tes_ruta_imagen?: string;
   tes_nombre_imagen: string;
   tes_ruta_logo?: string;
   tes_nombre_logo: string;
   tes_imagen?: any;
   tes_logo?: any;
}