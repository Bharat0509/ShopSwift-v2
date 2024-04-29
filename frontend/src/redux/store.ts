// store.ts
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import dashboardReducer from "./features/dashboardSlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
