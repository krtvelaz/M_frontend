import { createSlice } from '@reduxjs/toolkit';
import { Loadable, IPageable } from '../../../custom_types';

interface State {
    user: Loadable<any | null>;
    countries: Loadable<any[] | null>;
    states: Loadable<any[] | null>;
    cities: Loadable<any[] | null>;
}

const buffer = localStorage.getItem('_uk_');
const uk = buffer && atob(buffer).replaceAll('Ã±', 'ñ');
const user: any = uk ? JSON.parse(uk) : null;
const token: string | null = localStorage.getItem('_tk_');

const initialState: State = {
    user: {
        value: token ? { detail_user: user, token, can_access: true } : null,
        loading: false,
        loaded: false,
    },
    countries: {
        value: [],
        loading: false,
        loaded: false,
    },
    states: {
        value: [],
        loading: false,
        loaded: false,
    },
    cities: {
        value: [],
        loading: false,
        loaded: false,
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loading_user: (state) => {
            state.user = {
                value: state.user.value,
                loading: true,
                loaded: false,
            };
        },
        success_user: (state, action) => {
            state.user = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
            localStorage.setItem('_tk_', state.user.value.token);
            const user_hash = btoa(
                JSON.stringify(state.user.value.detail_user)
            );
            localStorage.setItem('_uk_', user_hash);
        },
        fail_user: (state) => {
            state.user = {
                value: initialState.user.value,
                loading: false,
                loaded: false,
            };
        },
        loading_countries: (state) => {
            state.countries = {
                value: state.countries.value,
                loading: true,
                loaded: false,
            };
        },
        success_countries: (state, action) => {
            state.countries = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_countries: (state) => {
            state.countries = {
                value: initialState.countries.value,
                loading: false,
                loaded: false,
            };
        },
        loading_states: (state) => {
            state.states = {
                value: state.states.value,
                loading: true,
                loaded: false,
            };
        },
        success_states: (state, action) => {
            state.states = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_states: (state) => {
            state.states = {
                value: initialState.states.value,
                loading: false,
                loaded: false,
            };
        },
        loading_cities: (state) => {
            state.cities = {
                value: state.cities.value,
                loading: true,
                loaded: false,
            };
        },
        success_cities: (state, action) => {
            state.cities = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_cities: (state) => {
            state.cities = {
                value: initialState.cities.value,
                loading: false,
                loaded: false,
            };
        },
        logOut: (state) => {
            state.user = {
                value: initialState.user.value,
                loading: false,
                loaded: false,
            };
            localStorage.removeItem('_tk_');
            localStorage.removeItem('_uk_');
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loading_user,
    success_user,
    fail_user,
    logOut,
    loading_countries,
    success_countries,
    fail_countries,
    loading_states,
    success_states,
    fail_states,
    loading_cities,
    success_cities,
    fail_cities,
} = authSlice.actions;
