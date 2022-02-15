import {
    createSlice,
} from '@reduxjs/toolkit';

import {
    AppThunk,
    RootState,
} from '../../state/store';
import {
    saveToLocal,
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
        toggleDarkMode: (state) => {

            state.darkMode = !state.darkMode;
            if (state.cookieAuth) localStorage.setItem(
                'lightMode',
                state.darkMode ? '' : 'on',
            );

        },
        openMenuDrawer: (state) => {

            state.menuDrawerOpen = true;

        },
        closeMenuDrawer: (state) => {

            state.menuDrawerOpen = false;

        },
        allowCookies: (state) => {

            state.cookieAuth = true;
            localStorage.setItem(
                'cookieAuth',
                'allow',
            );
            localStorage.setItem(
                'lightMode',
                state.darkMode ? '' : 'on',
            );

        },
    },
});

// extract actions
export const {
    toggleDarkMode,
    openMenuDrawer,
    closeMenuDrawer,
} = globalSlice.actions;

// selectors
export const selectDarkMode =
    (state: RootState): boolean => state.global.darkMode;

export const selectMenuDrawerOpen =
    (state: RootState): boolean => state.global.menuDrawerOpen;

export const selectCookieAuth =
    (state: RootState): boolean => state.global.cookieAuth;

// thunks which dispatch the reducers
export const allowCookies =
    (): AppThunk => (dispatch, getState) => {

        dispatch(globalSlice.actions.allowCookies());
        dispatch(saveToLocal());

    };

export default globalSlice.reducer;
