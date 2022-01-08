import DOMPurify from 'dompurify';
import {
    marked,
} from 'marked';
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import initialText from '../markdown/initialText';
import {
    RootState,
} from './store';

// Slice of state for counter page
export interface EditState {
    inputMD: string;
    outputHTML: string;
    modeSwitch: 'editor' | 'preview';
    modeSwitchHeight: number;
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
    modeSwitch: savedMobileSwitch || 'editor',
    modeSwitchHeight: 0,
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
        switchModeToEditor: (state) => {

            state.modeSwitch = 'editor';
            localStorage.setItem('mobileSwitch', 'editor');

        },
        switchModeToPreview: (state) => {

            state.modeSwitch = 'preview';
            localStorage.setItem('mobileSwitch', 'preview');

        },
        setModeSwitchHeight: (state, action: PayloadAction<number>) => {

            state.modeSwitchHeight = action.payload;

        },
    },
});

export const {
    updateText,
    switchModeToEditor,
    switchModeToPreview,
    setModeSwitchHeight,
} = editSlice.actions;

export const selectInputMD =
    (state: RootState): string => state.edit.inputMD;
export const selectOutputHTML =
    (state: RootState): string => state.edit.outputHTML;
export const selectModeSwitch =
    (state: RootState): 'editor' | 'preview' => state.edit.modeSwitch;
export const selectModeSwitchHeight =
    (state: RootState): number => state.edit.modeSwitchHeight;

export default editSlice.reducer;
