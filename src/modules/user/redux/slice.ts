import { createSlice } from '@reduxjs/toolkit';
import { IPageable, Loadable, Pageable } from '../../../custom_types';

interface State {
    list_users: IPageable<any>;
    

    
}

const initialState: State = {
    list_users: {
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        default_list_users: (state) => {
            state.list_users = {
                value: state.list_users.value,
                pagination: state.list_users.pagination,
                loading: true,
                loaded: false,
            };
        },
        success_list_users: (state, action) => {
            state.list_users = {
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
        fail_list_users: (state) => {
            state.list_users = {
                value: initialState.list_users.value,
                pagination: initialState.list_users.pagination,
                loading: false,
                loaded: true,
            };
        },
       
    },
});

export const {
    default_list_users,
    success_list_users,
    fail_list_users
    
    
} = userSlice.actions;
