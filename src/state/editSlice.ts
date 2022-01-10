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
    localStorage.getItem('editText');
const savedMode =
    localStorage.getItem('editMode') as Mode;

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
        updateEditText: (state, action: PayloadAction<string>) => {

            state.text = action.payload;

        },
        switchEditMode: (state, action: PayloadAction<Mode>) => {

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
export const selectEditText =
    (state: RootState): string => state.edit.text;
export const selectEditMode =
    (state: RootState): Mode => state.edit.mode;

// thunks which dispatch the reducers
export const updateEditText =
    (text: string): AppThunk => (dispatch, getState) => {

        dispatch(editSlice.actions.updateEditText(text));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editText',
            text,
        );

    };

export const switchEditMode =
    (mode: Mode): AppThunk => (dispatch, getState) => {

        dispatch(editSlice.actions.switchEditMode(mode));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editMode',
            mode,
        );

    };

export const saveToLocal =
    (): AppThunk => (dispatch, getState) => {

        localStorage.setItem(
            'editText',
            selectEditText(getState()),
        );

        localStorage.setItem(
            'editMode',
            selectEditMode(getState()),
        );

    };

export default editSlice.reducer;
