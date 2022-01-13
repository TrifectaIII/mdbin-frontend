import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

import {
    RootState,
    AppThunk,
} from './store';
import {
    requestPublishDocument,
} from '../api/publishAPI';
import {
    selectEditText,
} from './editSlice';

type RequestStatus = 'idle' | 'pending' | 'success' | 'error';

// Slice of state for counter page
export interface PublishState {
    requestStatus: RequestStatus;
    documentKey: string | null;
}

// fetch data from local, or start with defaults
const initialState: PublishState = {
    requestStatus: 'idle',
    documentKey: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
const publishDocumentAsync = createAsyncThunk(
    'publish/publishDocument',
    async (text: string) => {

        const response = await requestPublishDocument(text);
        // The value we return becomes the `fulfilled` action payload
        return response.key;

    },
);


export const publishSlice = createSlice({
    name: 'publish',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetPublish: (state) => {

            state.requestStatus = 'idle';
            state.documentKey = null;

        },
    },
    extraReducers: (builder) => {

        builder.
            addCase(publishDocumentAsync.pending, (state) => {

                state.requestStatus = 'pending';

            }).
            addCase(publishDocumentAsync.fulfilled, (state, action) => {

                state.requestStatus = 'success';
                state.documentKey = action.payload;

            }).
            addCase(publishDocumentAsync.rejected, (state) => {

                state.requestStatus = 'error';

            });

    },
});

// export reducers as actions
export const {
    resetPublish,
} = publishSlice.actions;

// selectors
export const selectRequestStatus =
    (state: RootState): RequestStatus => state.publish.requestStatus;
export const selectDocumentKey =
    (state: RootState): string | null => state.publish.documentKey;

// thunk to fetch editor text directly
export const publishDocument =
    (): AppThunk => (dispatch, getState) => {

        const text = selectEditText(getState());
        dispatch(publishDocumentAsync(text));

    };

export default publishSlice.reducer;
