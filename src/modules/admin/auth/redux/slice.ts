import { createSlice } from '@reduxjs/toolkit';
import { Loadable, IPageable } from '../../../../custom_types';

interface State {
    user: Loadable<any | null>;
}

const buffer = localStorage.getItem('_uk_');
const uk = buffer && atob(buffer).replaceAll('Ã±', 'ñ');
const user: any = uk ? JSON.parse(uk) : null;
const token: string | null = localStorage.getItem('_tk_');

const initialState: State = {
    user: {
        value: token ? {detail_user: user, token, can_access: true } : null,
        loading: false,
        loaded: false,
    },
};

export const userSlice = createSlice({
    name: 'user',
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
export const { loading_user, success_user, fail_user, logOut } = userSlice.actions;
