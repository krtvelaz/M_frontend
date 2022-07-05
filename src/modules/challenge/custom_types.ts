export interface IChallenge {
  general_information: IGeneralInformation;
  documents: IDocuments;
  reports: IReport;
}

export interface IGeneralInformation {
  challenge_name: string;
  profiles: [];
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
}
export interface IDocuments {
  general: IDocumentGeneral[];
  technical: string;
  administrative: string;
}

export interface IReport {
  report: string;
}

interface IDocumentGeneral {
  document_type: string;
  template: string;
}
