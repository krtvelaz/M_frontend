import { createSlice } from "@reduxjs/toolkit";
import { Loadable, Pageable } from "../../../../custom_types"
import { IEvent } from "../custom_types"

interface State {
    event: Loadable<IEvent | null>;
    events: Pageable<IEvent>;
    list_event: any;
}

const initialState: State = {
    event: {
        value: null,
        loading: false,
        loaded: false,
    },
    list_event: {
        value: [],
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
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        event_default: (state) => {
            state.event = {
                value: state.event.value,
                loading: false,
                loaded: true,
            };
        },
        get_event: (state, action) => {
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
        get_list_event: (state) => {
            state.list_event = {
                value: state.list_event.value,
                loading: true,
                loaded: false,
              };
        },
        event_list_success: (state, action) => {
            state.list_event = {
                value: action.payload,
                loading: false,
                loaded: true,
              };
        },
        fail_list_event: (state) => {
            state.list_event = {
                value: state.list_event.value,
                loading: false,
                loaded: true,
            };
        },
     

    },
});

export const {
    event_default,
    get_event,
    fail_event,
    event_list_success,
    get_list_event,
    fail_list_event
} = eventSlice.actions;
