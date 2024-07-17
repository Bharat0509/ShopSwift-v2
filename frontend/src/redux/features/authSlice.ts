// profileSlice.ts

import { IUser } from "@/lib/typing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { AxiosError } from "axios";

interface ProfileState {
    status: "idle" | "loading" | "authenticated" | "unauthenticated";
    loading: boolean;
    user: IUser | null;
    error: unknown;
    access_token: string | null;
}

const initialState: ProfileState = {
    loading: false,
    status: "idle",
    user: null,
    error: null,
    access_token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authRequest(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(
            state,
            action: PayloadAction<{ user: IUser; accessToken: string }>
        ) {
            state.loading = false;
            state.status = "authenticated";
            state.user = action.payload.user;
            state.access_token = action.payload.accessToken;
            state.error = null;
        },
        authFailure(state, action: PayloadAction<unknown>) {
            state.loading = false;
            state.status = "unauthenticated";
            state.error = action.payload;
        },

        logOut(state) {
            state.loading = false;
            state.status = "unauthenticated";
            state.user = null;
            state.access_token = null;
            state.error = null;
        },
    },
});

export const { authFailure, authRequest, authSuccess, logOut } =
    authSlice.actions;

export const selectAuthObject = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
