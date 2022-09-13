export default {};

export interface IRegisterPersonaNatural {
    name: string;
    last_name: string;
    document_type: string;
    number_document: string;
    gender: string;
    email: string;
    direction: string;
    type_contact: string;
    number_contact: string;
    country: string;
    department: string;
    city: string;
}

export interface IRegisterPersonaJuridica {
    name: string;
    nit: string;
    entity_type: string;
    email: string;
    direccion_comercial: string;
    direccion_residencia: string;
    barrio: string;
    type_contact: string;
    number_contact: string;
    country: string;
    department: string;
    city: string;
}
export interface ILostPassword{
    user:string;
    email:string;
}
export interface IResetPassword{
    user:string;
    password:string;
    confirmPassword: string;
}