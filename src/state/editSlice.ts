import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import initialText from '../markdown/initialText';
import {
    RootState,
} from './store';

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
            localStorage.setItem('editorText', action.payload);

        },
        switchMode: (state, action: PayloadAction<Mode>) => {

            state.mode = action.payload;
            localStorage.setItem('mobileSwitch', action.payload);

        },
    },
});

export const {
    updateText,
    switchMode,
} = editSlice.actions;

export const selectText =
    (state: RootState): string => state.edit.text;
export const selectMode =
    (state: RootState): Mode => state.edit.mode;

export default editSlice.reducer;
