import {
    createSlice,
} from '@reduxjs/toolkit';

import {
    AppThunk,
    RootState,
} from '../../state/store';
import {
    saveEditToLocalStorage,
} from '../edit/editSlice';

// Slice of global state
export interface GlobalState {
    darkMode: boolean;
    menuDrawerOpen: boolean;
    cookieAuth: boolean;
}

export const initialState: GlobalState = {
    darkMode: !localStorage.getItem('lightMode'),
    menuDrawerOpen: false,
    // cookieAuth: Boolean(localStorage.getItem('cookieAuth')),
    cookieAuth: true,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        // toggle the mode and save to localstorage
        toggleDarkModeAction: (state) => {

            state.darkMode = !state.darkMode;

        },
        openMenuDrawer: (state) => {

            state.menuDrawerOpen = true;

        },
        closeMenuDrawer: (state) => {

            state.menuDrawerOpen = false;

        },
        allowCookiesAction: (state) => {

            state.cookieAuth = true;

        },
    },
});

// extract actions
export const {
    toggleDarkModeAction,
    openMenuDrawer,
    closeMenuDrawer,
    allowCookiesAction,
} = globalSlice.actions;

// selectors
export const selectDarkMode =
    (state: RootState): boolean => state.global.darkMode;

export const selectMenuDrawerOpen =
    (state: RootState): boolean => state.global.menuDrawerOpen;

export const selectCookieAuth =
    (state: RootState): boolean => state.global.cookieAuth;

// thunks which dispatch the reducers
export const toggleDarkMode =
    (): AppThunk => (dispatch, getState) => {

        dispatch(toggleDarkModeAction());
        const state = getState();
        if (state.global.cookieAuth) localStorage.setItem(
            'lightMode',
            state.global.darkMode ? '' : 'on',
        );

    };

export const allowCookies =
    (): AppThunk => (dispatch, getState) => {

        dispatch(globalSlice.actions.allowCookiesAction());

        localStorage.setItem(
            'cookieAuth',
            'allow',
        );
        localStorage.setItem(
            'lightMode',
            getState().global.darkMode ? '' : 'on',
        );

        dispatch(saveEditToLocalStorage());

    };

export default globalSlice.reducer;
