import {
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';

import globalReducer from './globalSlice';
import editReducer from './editSlice';

// Store containing all state slices
export const store = configureStore({
    reducer: {
        global: globalReducer,
        edit: editReducer,
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
