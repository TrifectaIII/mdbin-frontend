import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

import {
    RootState,
} from '../../state/store';
import {
    requestViewDocument,
} from './viewAPI';

type RequestStatus = 'idle' | 'pending' | 'success' | 'error';

export interface ViewState {
    requestStatus: RequestStatus;
    documentKey: string | null;
    text: string | null;
    published: string | null;
}

// fetch data from local, or start with defaults
const initialState: ViewState = {
    requestStatus: 'idle',
    documentKey: null,
    text: null,
    published: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const viewDocument = createAsyncThunk(
    'view/viewDocument',
    async (documentKey: string) => {

        const response = await requestViewDocument(documentKey);
        // The value we return becomes the `fulfilled` action payload
        return response;

    },
);

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetView: (state) => {

            state.requestStatus = 'idle';
            state.documentKey = null;
            state.text = null;
            state.published = null;

        },
    },
    extraReducers: (builder) => {

        builder.
            addCase(viewDocument.pending, (state) => {

                state.requestStatus = 'pending';

            }).
            addCase(viewDocument.fulfilled, (state, action) => {

                state.requestStatus = 'success';
                state.documentKey = action.payload.documentKey;
                state.text = action.payload.text;
                state.published = action.payload.published;

            }).
            addCase(viewDocument.rejected, (state) => {

                state.requestStatus = 'error';

            });

    },
});

// export reducers as actions
export const {
    resetView,
} = viewSlice.actions;

// selectors
export const selectViewRequestStatus =
    (state: RootState): RequestStatus => state.view.requestStatus;

export const selectViewDocumentKey =
    (state: RootState): string | null => state.view.documentKey;

export const selectViewText =
    (state: RootState): string | null => state.view.text;

export const selectViewPublished =
    (state: RootState): string | null => state.view.published;

export default viewSlice.reducer;
