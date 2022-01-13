import {
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';

import globalReducer from './globalSlice';
import editReducer from './editSlice';
import publishReducer from './publishSlice';

// Store containing all state slices
export const store = configureStore({
    reducer: {
        global: globalReducer,
        edit: editReducer,
        publish: publishReducer,
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
