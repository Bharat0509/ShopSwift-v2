// store.ts
import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import authSlice from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardReducer,
        app: appSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
