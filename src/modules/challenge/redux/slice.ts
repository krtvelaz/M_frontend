import { createSlice } from "@reduxjs/toolkit";
import { Loadable, IPageable, Pageable } from "../../../custom_types";
import { IChallenge, IDocument } from "../custom_types";

interface State {
  challenge: Loadable<IChallenge | null>;
  challenges: IPageable<any>;
  document_challenge: Loadable<IDocument | null>;
  documents_challenge: IPageable<IDocument>;
  reports: IPageable<any>;
  communes: Loadable<any | null>;
  dimensions: Loadable<any | null>;
  dependencies: Loadable<any | null>;
  profiles: Loadable<any | null>;
  neighborhoods: Loadable<any | null>;
  type_documents: Loadable<any | null>;
}

const initialState: State = {
  challenge: {
    value: null,
    loading: false,
    loaded: false,
  },
  challenges: {
    value: [],
    pagination: {
      current_page: 1,
      first_page: 1,
      first_page_url: "",
      last_page: null,
      last_page_url: "",
      next_page_url: "",
      per_page: 0,
      previous_page_url: null,
      total: 0,
    },
    loading: false,
    loaded: false
  },
  document_challenge: {
    value: null,
    loading: false,
    loaded: false,
  },
  documents_challenge: {
    value: [],
    pagination: {
      current_page: 1,
      first_page: 1,
      first_page_url: "",
      last_page: null,
      last_page_url: "",
      next_page_url: "",
      per_page: 0,
      previous_page_url: null,
      total: 0,
    },
    loading: false,
    loaded: false,
  },
  reports: {
    value: [],
    pagination: {
      current_page: 1,
      first_page: 1,
      first_page_url: "",
      last_page: null,
      last_page_url: "",
      next_page_url: "",
      per_page: 0,
      previous_page_url: null,
      total: 0,
    },
    loading: false,
    loaded: false,
  },
  type_documents: {
    value: [],
    loading: false,
    loaded: false,
  },
  communes: {
    value: [],
    loading: false,
    loaded: false,
  },
  dimensions: {
    value: [],
    loading: false,
    loaded: false,
  },
  dependencies: {
    value: [],
    loading: false,
    loaded: false,
  },
  profiles: {
    value: [],
    loading: false,
    loaded: false,
  },
  neighborhoods: {
    value: [],
    loading: false,
    loaded: false,
  },
};

export const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    loading_challenge: (state) => {
      state.challenge = {
        value: state.challenge.value,
        loading: true,
        loaded: false,
      };
    },
    get_challenge: (state, action) => {
      state.challenge = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_challenge: (state) => {
      state.challenge = {
        value: initialState.challenge.value,
        loading: false,
        loaded: false,
      };
    },

    loading_challenges: (state) => {
      state.challenges = {
        value: state.challenges.value,
        pagination: state.challenges.pagination,
        loading: true,
        loaded: false,
      };
    },
    success_challenges: (state, action) => {
        state.challenges = {
        value:  action.payload.results,
        pagination: {
          current_page: action.payload.pagination.current_page || 1,
          first_page: action.payload.pagination.first_page || 1,
          first_page_url: action.payload.pagination.first_page_url || "",
          last_page: action.payload.pagination.last_page || null,
          last_page_url: action.payload.pagination.last_page_url || "",
          next_page_url: action.payload.pagination.next_page_url || "",
          per_page: action.payload.pagination.per_page || 0,
          previous_page_url: action.payload.pagination.previous_page_url || null,
          total: action.payload.pagination.total || 0,
        },
        loading: false,
        loaded: true,
      };
    },
    fail_challenges: (state) => {
      state.challenges = {
        value: initialState.challenges.value,
        pagination: initialState.challenges.pagination,
        loading: false,
        loaded: false,
      };
    },

    //documentos
    loading_document_challenge: (state) => {
      state.document_challenge = {
        value: state.document_challenge.value,
        loading: true,
        loaded: false,
      };
    },
    get_document_challenge: (state, action) => {
      state.document_challenge = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_document_challenge: (state) => {
      state.document_challenge = {
        value: initialState.document_challenge.value,
        loading: false,
        loaded: false,
      };
    },

    // lista de documentos
    loading_get_list_documents: (state) => {
      state.documents_challenge = {
        ...state.documents_challenge,
        pagination: state.documents_challenge.pagination,
        loading: true,
        loaded: false,
      };
    },
    success_get_list_documents: (state, action) => {
      state.documents_challenge = {
        ...state.documents_challenge,
        value: action.payload.results,
        pagination: {
          current_page: action.payload.pagination.current_page || 1,
          first_page: action.payload.pagination.first_page || 1,
          first_page_url: action.payload.pagination.first_page_url || "",
          last_page: action.payload.pagination.last_page || null,
          last_page_url: action.payload.pagination.last_page_url || "",
          next_page_url: action.payload.pagination.next_page_url || "",
          per_page: action.payload.pagination.per_page || 0,
          previous_page_url: action.payload.pagination.previous_page_url || null,
          total: action.payload.pagination.total || 0,
        },
        loading: false,
        loaded: true,
      };
    },
    fail_get_list_documents: (state) => {
      state.documents_challenge = {
        ...state.documents_challenge,
        value: initialState.documents_challenge.value,
        pagination: initialState.documents_challenge.pagination,
        loading: false,
        loaded: false,
      };
    },
    
    loading_reports: (state) => {
      state.reports = {
        ...state.reports,
        pagination: state.reports.pagination,
        loading: true,
        loaded: false,
      };
    },
    success_reports: (state, action) => {
      state.reports = {
        ...state.reports,
        value: action.payload.results,
        pagination: {
          current_page: action.payload.pagination.current_page || 1,
          first_page: action.payload.pagination.first_page || 1,
          first_page_url: action.payload.pagination.first_page_url || "",
          last_page: action.payload.pagination.last_page || null,
          last_page_url: action.payload.pagination.last_page_url || "",
          next_page_url: action.payload.pagination.next_page_url || "",
          per_page: action.payload.pagination.per_page || 0,
          previous_page_url: action.payload.pagination.previous_page_url || null,
          total: action.payload.pagination.total || 0,
        },
        loading: false,
        loaded: true,
      };
    },
    fail_reports: (state) => {
      state.reports = {
        ...state.reports,
        value: initialState.reports.value,
        pagination: initialState.reports.pagination,
        loading: false,
        loaded: false,
      };
    },

    loading_get_types_documents: (state) => {
      state.type_documents = {
        value: state.type_documents.value,
        loading: true,
        loaded: false,
      };
    },
    success_get_types_documents: (state, action) => {
      state.type_documents = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_get_types_documents: (state) => {
      state.type_documents = {
        value: initialState.type_documents.value,
        loading: false,
        loaded: false,
      };
    },

    //lista de maestras
    loading_list_communes: (state) => {
      state.communes = {
        value: state.communes.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_communes: (state, action) => {
      state.communes = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_communes: (state) => {
      state.communes = {
        value: initialState.communes.value,
        loading: false,
        loaded: false,
      };
    },
    loading_list_dimensions: (state) => {
      state.dimensions = {
        value: state.dimensions.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_dimensions: (state, action) => {
      state.dimensions = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_dimensions: (state) => {
      state.communes = {
        value: initialState.dimensions.value,
        loading: false,
        loaded: false,
      };
    },
    loading_list_dependencies: (state) => {
      state.dependencies = {
        value: state.dependencies.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_dependencies: (state, action) => {
      state.dependencies = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_dependencies: (state) => {
      state.dependencies = {
        value: initialState.dependencies.value,
        loading: false,
        loaded: false,
      };
    },
    loading_list_profiles: (state) => {
      state.profiles = {
        value: state.profiles.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_profiles: (state, action) => {
      state.profiles = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_profiles: (state) => {
      state.profiles = {
        value: initialState.profiles.value,
        loading: false,
        loaded: false,
      };
    },
    loading_list_neighborhoods: (state) => {
      state.neighborhoods = {
        value: state.neighborhoods.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_neighborhoods: (state, action) => {
      state.neighborhoods = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_neighborhoods: (state) => {
      state.neighborhoods = {
        value: initialState.neighborhoods.value,
        loading: false,
        loaded: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loading_challenge,
  get_challenge,
  fail_challenge,
  loading_document_challenge,
  get_document_challenge,
  fail_document_challenge,
  loading_get_list_documents,
  success_get_list_documents,
  fail_get_list_documents,
  loading_get_types_documents,
  success_get_types_documents,
  fail_get_types_documents,
  loading_reports,
  success_reports,
  fail_reports,
  loading_list_communes,
  success_list_communes,
  fail_list_communes,
  loading_list_dimensions,
  success_list_dimensions,
  fail_list_dimensions,
  loading_list_dependencies,
  success_list_dependencies,
  fail_list_dependencies,
  loading_list_profiles,
  success_list_profiles,
  fail_list_profiles,
  loading_list_neighborhoods,
  success_list_neighborhoods,
  fail_list_neighborhoods,
  loading_challenges,
  success_challenges,
  fail_challenges,
} = challengeSlice.actions;
