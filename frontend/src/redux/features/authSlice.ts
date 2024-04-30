// profileSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "@/lib/typing";
import { Axios } from "@/lib/utils";
import { AxiosError } from "axios";

interface ProfileState {
    status: "idle" | "loading" | "authenticated";
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
            state.status = "idle";
            state.error = action.payload;
        },

        logOut(state) {
            state.loading = false;
            state.status = "idle";
            state.user = null;
            state.access_token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProfile.fulfilled,
                (
                    state,
                    action: PayloadAction<{ user: IUser; access_token: string }>
                ) => {
                    state.loading = false;
                    (state.status = "authenticated"),
                        (state.user = action.payload.user);
                    state.access_token = action.payload.access_token;
                }
            );
    },
});
// Define the async thunk to fetch dashboard products
export const fetchProfile = createAsyncThunk(
    "/me",
    async (access_token?: string | null) => {
        try {
            const { data: result } = await Axios.get("/api/v1/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            console.log(result);

            return result.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 403) {
                    const { data: refreshResult } = await Axios.get(
                        "/api/v1/refresh"
                    );
                    const { data: result } = await Axios.get("/api/v1/me", {
                        headers: {
                            Authorization: `Bearer ${refreshResult.data.accessToken}`,
                        },
                    });
                    return result.data;
                }
            }

            throw new Error("Failed to fetch profile data");
        }
    }
);
export const { authFailure, authRequest, authSuccess, logOut } =
    authSlice.actions;

export const selectAuthObject = (state: RootState) => state.auth;

export default authSlice.reducer;
