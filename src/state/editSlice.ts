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
    mobileSwitch: 'editor' | 'preview';
    mobileSwitchHeight: number;
}

// get any saved edit text from localstorage
const savedText =
    localStorage.getItem('editorText');
const savedMobileSwitch =
    localStorage.getItem('mobileSwitch') as 'editor' | 'preview';

// initial state is saved text, or default if nothing was saved
const initialState: EditState = {
    inputMD: savedText || initialText,
    outputHTML: savedText
        ? DOMPurify.sanitize(marked.parse(savedText))
        : DOMPurify.sanitize(marked.parse(initialText)),
    mobileSwitch: savedMobileSwitch || 'editor',
    mobileSwitchHeight: 0,
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
        switchToEditor: (state) => {

            state.mobileSwitch = 'editor';
            localStorage.setItem('mobileSwitch', 'editor');

        },
        switchToPreview: (state) => {

            state.mobileSwitch = 'preview';
            localStorage.setItem('mobileSwitch', 'preview');

        },
        setSwitchHeight: (state, action: PayloadAction<number>) => {

            state.mobileSwitchHeight = action.payload;

        },
    },
});

export const {
    updateText,
    switchToEditor,
    switchToPreview,
    setSwitchHeight,
} = editSlice.actions;

export const selectInputMD =
    (state: RootState): string => state.edit.inputMD;
export const selectOutputHTML =
    (state: RootState): string => state.edit.outputHTML;
export const selectMobileSwitch =
    (state: RootState): 'editor' | 'preview' => state.edit.mobileSwitch;
export const selectSwitchHeight =
    (state: RootState): number => state.edit.mobileSwitchHeight;

export default editSlice.reducer;
