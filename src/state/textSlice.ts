import DOMPurify from 'dompurify';
import {marked} from 'marked';
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import {
    RootState,
} from './store';

// Slice of state for counter page
export interface TextState {
    inputMD: string;
    outputHTML: string;
}

const initialState: TextState = {
    inputMD: '',
    outputHTML: '',
};

export const textSlice = createSlice({
    name: 'text',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateText: (state, action: PayloadAction<string>) => {

            state.inputMD = action.payload;
            state.outputHTML = DOMPurify.sanitize(marked.parse(action.payload));

        },
    },
});

export const {updateText} = textSlice.actions;

export const selectInputMD = (state: RootState): string => state.text.inputMD;
export const selectOutputHTML = (state: RootState): string => state.text.outputHTML;

export default textSlice.reducer;
