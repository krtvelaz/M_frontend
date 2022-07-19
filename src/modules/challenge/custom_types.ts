export interface IChallenge {
  general_information: IGeneralInformation;
  documents: IDocuments;
  reports: IDocument[];
}

export interface IGeneralInformation {
  key?: number;
  cha_name: string,
  cha_profile: any,
  cha_dimension: number | string,
  cha_dependence: number | string,
  cha_start_date: string,
  cha_end_date: string,
  cha_challenge_detail: string,
  cha_commune: number | string,
  cha_neighborhood: number | string,
  cha_population_detail: string,
  cha_principal_image: string,
  cha_principal_image_name: string,
  cha_video: string,
  cha_important_data: string,
  cha_expected_result: string,
  cha_economic_amount: number | string,
  cha_description: string;
  cha_impact_type: string;
}
export interface IDocuments {
  general: IDocument[];
  technical: IDocument[];
  administrative: IDocument[];
}

export interface IDocument {
  cha_document_type : number | string,
  cha_document_name: string,
  cha_profile : string,
  cha_template_path: string,
  cha_template_name: string
}

