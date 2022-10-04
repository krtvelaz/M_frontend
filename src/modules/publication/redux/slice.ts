import { createSlice } from '@reduxjs/toolkit';
import { IPageable, Loadable, Pageable } from '../../../custom_types';
import {  IGalleryInfo, IGeneralInfo } from '../custom_types';

interface State {    

    publication: Loadable<IGeneralInfo | null>;
    publications: Loadable<IGeneralInfo | null>;
    list_publication: IPageable<IGeneralInfo>;

    gallery: Loadable<IGalleryInfo | null>;
    gallerys: Pageable<IGalleryInfo>;
    list_gallery: any;
}

const initialState: State = {
    
    publication: {
        value: null,
        loading: false,
        loaded: false,
    },
    list_publication: {
        value: [],
        pagination: {
            current_page: 1,
            first_page: 1,
            first_page_url: '',
            last_page: null,
            last_page_url: '',
            next_page_url: '',
            per_page: 0,
            previous_page_url: null,
            total: 0,
        },
        loading: false,
        loaded: false,
    },
    publications: {
        value: null,
        loading: false,
        loaded: false,
    },
    gallery: {
        value: null,
        loading: false,
        loaded: false,
    },
    gallerys: {
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
    list_gallery: {
        value: [],
        loading: false,
        loaded: false,
    },
   
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {
        
        default_publication: (state) => {
            state.publication = {
                value: state.publication.value,
                loading: true,
                loaded: false,
            };
        },
        success_publication: (state, action) => {
            state.publication = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_publication: (state) => {
            state.publication = {
                value: state.publication.value,
                loading: false,
                loaded: true,
            };
        },
        default_list_publication: (state) => {
            state.list_publication = {
                value: state.list_publication.value,
                pagination: state.list_publication.pagination,
                loading: true,
                loaded: false,
            };
        },
        success_list_publication: (state, action) => {
            state.list_publication = {
                value: action.payload.results,
                pagination: {
                    current_page: action.payload.pagination?.current_page || 1,
                    first_page: action.payload.pagination?.first_page || 1,
                    first_page_url: action.payload.pagination?.first_page_url || '',
                    last_page: action.payload.pagination?.last_page || null,
                    last_page_url: action.payload.pagination?.last_page_url || '',
                    next_page_url: action.payload.pagination?.next_page_url || '',
                    per_page: action.payload.pagination?.per_page || 0,
                    previous_page_url: action.payload.pagination?.previous_page_url || null,
                    total: action.payload.pagination?.total || 0,
                },
                loading: false,
                loaded: true,
            };
        },
        fail_list_publication: (state) => {
            state.list_publication = {
                value: initialState.list_publication.value,
                pagination: initialState.list_publication.pagination,
                loading: false,
                loaded: true,
            };
        },

        default_gallery: (state) => {
            state.gallery = {
                value: state.gallery.value,
                loading: true,
                loaded: false,
            };
        },
        success_gallery: (state, action) => {
            state.gallery = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_gallery: (state) => {
            state.gallery = {
                value: state.gallery.value,
                loading: false,
                loaded: true,
            };
        },

        default_list_gallery: (state) => {
            state.list_gallery = {
                value: state.list_gallery.value,
                loading: true,
                loaded: false,
            };
        },
        success_list_gallery: (state, action) => {
            state.list_gallery = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_list_gallery: (state) => {
            state.list_gallery = {
                value: initialState.list_gallery.value,
                loading: false,
                loaded: false,
            };
        },
    },
});

export const {
    
    default_publication,
    success_publication,
    fail_publication,
    success_list_publication,
    default_list_publication,
    fail_list_publication,
    default_gallery,
    success_gallery,
    fail_gallery,
    default_list_gallery,
    success_list_gallery,
    fail_list_gallery,
} = publicationSlice.actions;
