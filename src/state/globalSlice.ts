import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import {
    RootState,
} from './store';

// Slice of global state
export interface GlobalState {
    darkMode: boolean;
    menuDrawerOpen: boolean;
    toolbarHeight: number;
}

const initialState: GlobalState = {
    darkMode: !localStorage.getItem('lightMode'),
    menuDrawerOpen: false,
    toolbarHeight: 0,
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
        setToolbarHeight: (state, action: PayloadAction<number>) => {

            state.toolbarHeight = action.payload;

        },
    },
});

// extract actions
export const {
    toggleDarkMode,
    openMenuDrawer,
    closeMenuDrawer,
    setToolbarHeight,
} = globalSlice.actions;

// selectors
export const selectDarkMode =
    (state: RootState): boolean => state.global.darkMode;
export const selectMenuDrawerOpen =
    (state: RootState): boolean => state.global.menuDrawerOpen;
export const selectToolbarHeight =
    (state: RootState): number => state.global.toolbarHeight;

export default globalSlice.reducer;
