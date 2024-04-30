// store.ts
import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import authSlice from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardReducer,
        app: appSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
