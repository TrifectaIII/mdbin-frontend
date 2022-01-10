import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import initialText from '../markdown/initialText';
import {
    AppThunk,
    RootState,
} from './store';
import {
    selectCookieAuth,
} from './globalSlice';

type Mode = 'editor' | 'preview';

// Slice of state for counter page
export interface EditState {
    text: string;
    mode: Mode;
}

// get any saved edit text from localstorage
const savedText =
    localStorage.getItem('editorText');
const savedMode =
    localStorage.getItem('editorMode') as Mode;

// initial state is saved text, or default if nothing was saved
const initialState: EditState = {
    text: savedText || initialText,
    mode: savedMode || 'editor',
};

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateText: (state, action: PayloadAction<string>) => {

            state.text = action.payload;

        },
        switchMode: (state, action: PayloadAction<Mode>) => {

            state.mode = action.payload;

        },
    },
});

// export reducers as actions
// export const {
//     updateText,
//     switchMode,
// } = editSlice.actions;

// selectors
export const selectText =
    (state: RootState): string => state.edit.text;
export const selectMode =
    (state: RootState): Mode => state.edit.mode;

// thunks which dispatch the reducers
export const updateText =
    (text: string): AppThunk => (dispatch, getState) => {

        dispatch(editSlice.actions.updateText(text));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editorText',
            text,
        );

    };

export const switchMode =
    (mode: Mode): AppThunk => (dispatch, getState) => {

        dispatch(editSlice.actions.switchMode(mode));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editorMode',
            mode,
        );

    };

export const saveToLocal =
    (): AppThunk => (dispatch, getState) => {

        localStorage.setItem(
            'editorText',
            selectText(getState()),
        );

        localStorage.setItem(
            'editorMode',
            selectMode(getState()),
        );

    };

export default editSlice.reducer;
