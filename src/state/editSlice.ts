import DOMPurify from 'dompurify';
import {
    marked,
} from 'marked';
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import initialText from '../initialText';
import {
    RootState,
} from './store';

// Slice of state for counter page
export interface EditState {
    inputMD: string;
    outputHTML: string;
}

// get any saved edit text from localstorage
const savedText = localStorage.getItem('editorText');

// initial state is saved text, or default if nothing was saved
const initialState: EditState = {
    inputMD: savedText || initialText,
    outputHTML: savedText
        ? DOMPurify.sanitize(marked.parse(savedText))
        : DOMPurify.sanitize(marked.parse(initialText)),
};

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateText: (state, action: PayloadAction<string>) => {

            state.inputMD = action.payload;
            state.outputHTML = DOMPurify.sanitize(marked.parse(action.payload));
            localStorage.setItem('editorText', action.payload);

        },
    },
});

export const {
    updateText,
} = editSlice.actions;

export const selectInputMD =
    (state: RootState): string => state.edit.inputMD;
export const selectOutputHTML =
    (state: RootState): string => state.edit.outputHTML;

export default editSlice.reducer;
