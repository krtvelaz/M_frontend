import { createSlice } from '@reduxjs/toolkit';
import { IPageable, Loadable } from '../../../custom_types';

interface State {
    notification: Loadable<any | null>;
    notifications: IPageable<any | null>;
}

const initialState: State = {
    notification: {
        value: null,
        loading: false,
        loaded: false,
    },
    notifications: {
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
};

export const notificationSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        notification_default: (state) => {
            state.notification = {
                value: state.notification.value,
                loading: true,
                loaded: false,
            };
        },
        notification_success: (state, action) => {
            state.notification = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        notification_fail: (state) => {
            state.notification = {
                value: initialState.notification.value,
                loading: false,
                loaded: false,
            };
        },

        notifications_list_default: (state) => {
            state.notifications = {
                value: state.notifications.value,
                pagination: state.notifications.pagination,
                loading: true,
                loaded: false,
            };
        },
        notifications_list_success: (state, action) => {
            state.notifications = {
                value: action.payload.results,
                pagination: {
                    current_page: action.payload.pagination.current_page || 1,
                    first_page: action.payload.pagination.first_page || 1,
                    first_page_url:
                        action.payload.pagination.first_page_url || '',
                    last_page: action.payload.pagination.last_page || null,
                    last_page_url:
                        action.payload.pagination.last_page_url || '',
                    next_page_url:
                        action.payload.pagination.next_page_url || '',
                    per_page: action.payload.pagination.per_page || 0,
                    previous_page_url:
                        action.payload.pagination.previous_page_url || null,
                    total: action.payload.pagination.total || 0,
                },
                loading: false,
                loaded: true,
            };
        },
        notifications_list_fail: (state) => {
            state.notifications = {
                value: initialState.notifications.value,
                pagination: initialState.notifications.pagination,
                loading: false,
                loaded: false,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    notification_default,
    notification_success,
    notification_fail,
    notifications_list_default,
    notifications_list_success,
    notifications_list_fail,
} = notificationSlice.actions;
