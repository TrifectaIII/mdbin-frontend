import {
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';

import globalReducer from './globalSlice';
import textReducer from './textSlice';

// Store containing all state slices
export const store = configureStore({
    reducer: {
        global: globalReducer,
        text: textReducer,
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
