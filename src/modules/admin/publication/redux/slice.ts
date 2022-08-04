import { createSlice } from "@reduxjs/toolkit";
import { IPageable, Loadable, Pageable } from "../../../../custom_types"
import { IEvent } from "../custom_types"

interface State {
    event: Loadable<IEvent | null>;
    events: Pageable<IEvent>;
    list_event: IPageable<IEvent>;

    publication: Loadable<IEvent | null>;
    publications: Pageable<IEvent>;
    list_publication: IPageable<IEvent>;
}

const initialState: State = {
    event: {
        value: null,
        loading: false,
        loaded: false,
    },
    list_event: {
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
    events: {
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
    publications: {
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
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        default_event: (state) => {
            state.event = {
                value: state.event.value,
                loading: false,
                loaded: true,
            };
        },
        success_event: (state, action) => {
            state.event = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_event: (state) => {
            state.event = {
                value: state.event.value,
                loading: false,
                loaded: true,
            };
        },
        default_list_event: (state) => {
            state.list_event = {
                value: state.list_event.value,
                pagination: state.list_event.pagination,
                loading: true,
                loaded: false,
            };
        },
        success_list_event: (state, action) => {
            state.list_event = {
                value: action.payload.results,
                pagination: {
                    current_page: action.payload.current_page || 1,
                    first_page: action.payload.first_page || 1,
                    first_page_url: action.payload.first_page_url || "",
                    last_page: action.payload.last_page || null,
                    last_page_url: action.payload.last_page_url || "",
                    next_page_url: action.payload.next_page_url || "",
                    per_page: action.payload.per_page || 0,
                    previous_page_url: action.payload.previous_page_url || null,
                    total: action.payload.total || 0,
                },
                loading: false,
                loaded: true,
            };
        },
        fail_list_event: (state) => {
            state.list_event = {
                value: initialState.list_event.value,
                pagination: initialState.list_event.pagination,
                loading: false,
                loaded: true,
            };
        },
        default_publication: (state) => {
            state.publication = {
                value: state.publication.value,
                loading: false,
                loaded: true,
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
                    current_page: action.payload.current_page || 1,
                    first_page: action.payload.first_page || 1,
                    first_page_url: action.payload.first_page_url || "",
                    last_page: action.payload.last_page || null,
                    last_page_url: action.payload.last_page_url || "",
                    next_page_url: action.payload.next_page_url || "",
                    per_page: action.payload.per_page || 0,
                    previous_page_url: action.payload.previous_page_url || null,
                    total: action.payload.total || 0,
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


    },
});

export const {
    default_event,
    success_event,
    fail_event,
    success_list_event,
    default_list_event,
    fail_list_event,
    default_publication,
    success_publication,
    fail_publication,
    success_list_publication,
    default_list_publication,
    fail_list_publication,
} = eventSlice.actions;
