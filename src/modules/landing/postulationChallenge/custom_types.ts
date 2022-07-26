export default {};

export interface IPostulation {
   name: string;
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
  