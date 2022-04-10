import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import editReducer from "../features/edit/editSlice";
import globalReducer from "../features/global/globalSlice";
import publishReducer from "../features/publish/publishSlice";
import viewReducer from "../features/view/viewSlice";

// Store containing all state slices
export const store = configureStore({
    reducer: {
        global: globalReducer,
        edit: editReducer,
        publish: publishReducer,
        view: viewReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
