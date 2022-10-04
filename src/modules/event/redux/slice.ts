import { createSlice } from '@reduxjs/toolkit';
import { IPageable, Loadable, Pageable } from '../../../custom_types';
import { IEvent } from '../custom_types';

interface State {
    event: Loadable<IEvent | null>;
    events: Loadable<IEvent | any[]>;
    list_event: IPageable<IEvent>;
    newsletters: IPageable<any>;
    

    
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
    newsletters: {
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
    events: {
        value: [],
        loading: false,
        loaded: false,
    },
    
   
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        default_event: (state) => {
            state.event = {
                value: state.event.value,
                loading: true,
                loaded: false,
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
                    current_page: action.payload.pagination.current_page || 1,
                    first_page: action.payload.pagination.first_page || 1,
                    first_page_url: action.payload.pagination.first_page_url || '',
                    last_page: action.payload.pagination.last_page || null,
                    last_page_url: action.payload.pagination.last_page_url || '',
                    next_page_url: action.payload.pagination.next_page_url || '',
                    per_page: action.payload.pagination.per_page || 0,
                    previous_page_url: action.payload.pagination.previous_page_url || null,
                    total: action.payload.pagination.total || 0,
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
        default_list_bulletin: (state) => {
            state.newsletters = {
                value: state.newsletters.value,
                pagination: state.newsletters.pagination,
                loading: true,
                loaded: false,
            };
        },
        success_list_bulletin: (state, action) => {
            state.newsletters = {
                value: action.payload.results,
                pagination: {
                    current_page: action.payload.pagination.current_page || 1,
                    first_page: action.payload.pagination.first_page || 1,
                    first_page_url: action.payload.pagination.first_page_url || '',
                    last_page: action.payload.pagination.last_page || null,
                    last_page_url: action.payload.pagination.last_page_url || '',
                    next_page_url: action.payload.pagination.next_page_url || '',
                    per_page: action.payload.pagination.per_page || 0,
                    previous_page_url: action.payload.pagination.previous_page_url || null,
                    total: action.payload.pagination.total || 0,
                },
                loading: false,
                loaded: true,
            };
        },
        fail_list_bulletin: (state) => {
            state.newsletters = {
                value: initialState.newsletters.value,
                pagination: initialState.newsletters.pagination,
                loading: false,
                loaded: true,
            };
        },
        default_events: (state) => {
            state.events = {
                value: state.events.value,
                loading: true,
                loaded: false,
            };
        },
        success_events: (state, action) => {
            state.events = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_events: (state) => {
            state.events = {
                value: initialState.events.value,
                loading: false,
                loaded: false,
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
    default_events,
    success_events,
    fail_events,
    default_list_bulletin,
    success_list_bulletin,
    fail_list_bulletin,
    
} = eventSlice.actions;
