import { createSlice } from "@reduxjs/toolkit";
import { Loadable, Pageable } from "../../../../custom_types";
import { IChallenge, IDocument } from "../custom_types";

interface State {
  challenge: Loadable<IChallenge | null>;
  challenges: Pageable<IChallenge>;
  document_challenge: Loadable<IDocument | null>;
  documents_challenge: Pageable<IDocument>;
  masters: Loadable<IChallenge | null>;
}

const initialState: State = {
  challenge: {
    value: null,
    loading: false,
    loaded: false,
  },
  document_challenge: {
    value: null,
    loading: false,
    loaded: false,
  },
  documents_challenge: {
    value: [],
    pagination: {
      page: 1,
      count: 0,
      next_page: null,
      previous_page: null,
      total_results: 0,
    },
    loading: false,
    loaded: false,
  },
  challenges: {
    value: [],
    pagination: {
      page: 1,
      count: 0,
      next_page: null,
      previous_page: null,
      total_results: 0,
    },
    loading: false,
    loaded: false,
  },
  masters: {
    value: null,
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

    loading_get_list_documents: (state) => {
      state.documents_challenge = {
        ...state.documents_challenge,
        loading: true,
        loaded: false,
      };
    },
    success_get_list_documents: (state, action) => {      
      state.documents_challenge = {
        ...state.documents_challenge,
        value: action.payload || [],
        pagination: {
          page: action.payload?.page || 1,
          count: action.payload?.count || 0,
          next_page: action.payload?.next_page,
          previous_page: action.payload?.previous_page,
          total_results: action.payload?.total_results || 0,
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

    loading_list_master: (state) => {
      state.masters = {
        value: state.challenge.value,
        loading: true,
        loaded: false,
      };
    },
    success_list_master: (state, action) => {
      state.masters = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_list_master: (state) => {
      state.masters = {
        value: initialState.challenge.value,
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
  loading_list_master,
  success_list_master,
  fail_list_master,
} = challengeSlice.actions;
