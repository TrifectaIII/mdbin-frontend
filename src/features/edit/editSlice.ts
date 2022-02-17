import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import initialText from '../../markdown/initialText';
import {
    AppThunk,
    RootState,
} from '../../state/store';
import {
    selectCookieAuth,
} from '../global/globalSlice';

type EditMode = 'editor' | 'preview';

// Slice of state for counter page
export interface EditState {
    text: string;
    mode: EditMode;
}

// fetch data from local, or start with defaults
export const initialState: EditState = {
    text: localStorage.getItem('editText') || initialText,
    mode: localStorage.getItem('editMode') as EditMode || 'editor',
};

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateEditTextAction: (state, action: PayloadAction<string>) => {

            state.text = action.payload;

        },
        switchEditModeAction: (state, action: PayloadAction<EditMode>) => {

            state.mode = action.payload;

        },
    },
});

// export reducers as actions
export const {
    updateEditTextAction,
    switchEditModeAction,
} = editSlice.actions;

// selectors
export const selectEditText =
    (state: RootState): string => state.edit.text;

export const selectEditMode =
    (state: RootState): EditMode => state.edit.mode;

// thunks which dispatch the reducers
export const updateEditText =
    (text: string): AppThunk => (dispatch, getState) => {

        dispatch(updateEditTextAction(text));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editText',
            text,
        );

    };

export const switchEditMode =
    (mode: EditMode): AppThunk => (dispatch, getState) => {

        dispatch(switchEditModeAction(mode));
        if (selectCookieAuth(getState())) localStorage.setItem(
            'editMode',
            mode,
        );

    };

export const saveEditToLocalStorage =
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
