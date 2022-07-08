export interface IChallenge {
  general_information: IGeneralInformation;
  documents: IDocuments;
  reports: IDocument[];
}

export interface IGeneralInformation {
  challenge_name: string;
  profiles: string[];
  dimension: string | null;
  dependence: string | null;
  start_date: string;
  closing_date: string;
  description: string;
  commune: string | null;
  neighborhood: string | null;
  main_image: string;
  economic_amount: string;
  video_url: string;
  expected_results: string;
  important_data: string;
  population_impact: string;
  challenge_details: string;
  impact_type?: string;
}
export interface IDocuments {
  general: IDocument[];
  technical: IDocument[];
  administrative: IDocument[];
}

export interface IDocument {
  document_type?: string;
  template?: File | Blob;
  profile?: string;
  document_name?: string;
}

