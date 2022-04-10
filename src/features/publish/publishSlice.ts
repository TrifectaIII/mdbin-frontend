import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../state/store";
import { selectEditText } from "../edit/editSlice";
import { PublishData, requestPublishDocument } from "./publishAPI";

type RequestStatus = "idle" | "pending" | "success" | "error";

export interface PublishState {
    requestStatus: RequestStatus;
    errorMessage: string | null;
    documentKey: string | null;
}

export const initialState: PublishState = {
    requestStatus: "idle",
    errorMessage: null,
    documentKey: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
const publishDocumentAsync = createAsyncThunk<
    // return type of success
    string,
    // type of input
    PublishData,
    // AsyncThunkConfig settings
    { rejectValue: string }
>("publish/publishDocument", async (data: PublishData, { rejectWithValue }) => {
    const response = await requestPublishDocument(data);
    const { type } = response;

    // if there was an error, reject with a message
    if (type === "error") return rejectWithValue(response.message);

    // The value we return becomes the `fulfilled` action payload
    return response.key;
});

export const publishSlice = createSlice({
    name: "publish",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetPublish: (state) => {
            state.requestStatus = "idle";
            state.errorMessage = null;
            state.documentKey = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishDocumentAsync.pending, (state) => {
                state.requestStatus = "pending";
            })
            .addCase(publishDocumentAsync.fulfilled, (state, { payload }) => {
                state.requestStatus = "success";
                state.documentKey = payload;
            })
            .addCase(publishDocumentAsync.rejected, (state, { payload }) => {
                state.requestStatus = "error";
                state.errorMessage = payload || null;
            });
    },
});

// export reducers as actions
export const { resetPublish } = publishSlice.actions;

// selectors
export const selectPublishRequestStatus = (state: RootState): RequestStatus =>
    state.publish.requestStatus;

export const selectPublishDocumentKey = (state: RootState): string | null =>
    state.publish.documentKey;

export const selectPublishErrorMessage = (state: RootState): string | null =>
    state.publish.errorMessage;

// thunk to fetch editor text directly
export const publishDocument =
    (creator: string, recaptchaToken: string): AppThunk =>
    (dispatch, getState) => {
        const text = selectEditText(getState());
        dispatch(
            publishDocumentAsync({
                text,
                creator,
                recaptchaToken,
            }),
        );
    };

export default publishSlice.reducer;
