import {
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';

import globalReducer from './globalSlice';
import counterReducer from './counterSlice';

// Store containing all state slices
export const store = configureStore({
    reducer: {
        global: globalReducer,
        counter: counterReducer,
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
