import {createSlice} from '@reduxjs/toolkit';

import {RootState} from './store';

// Slice of global state
export interface GlobalState {
    darkMode: boolean;
    menuDrawerOpen: boolean;
}

const initialState: GlobalState = {
    darkMode: !localStorage.getItem('lightMode'),
    menuDrawerOpen: false,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        // toggle the mode and save to localstorage
        toggleDarkMode: (state) => {

            state.darkMode = !state.darkMode;
            localStorage.setItem('lightMode', state.darkMode ? '' : 'on');

        },
        openMenuDrawer: (state) => {

            state.menuDrawerOpen = true;

        },
        closeMenuDrawer: (state) => {

            state.menuDrawerOpen = false;

        },
    },
});

// extract actions
export const {toggleDarkMode, openMenuDrawer, closeMenuDrawer} = globalSlice.actions;

// selectors
export const selectDarkMode = (state: RootState): boolean => state.global.darkMode;
export const selectMenuDrawerOpen = (state: RootState): boolean => state.global.menuDrawerOpen;

export default globalSlice.reducer;
