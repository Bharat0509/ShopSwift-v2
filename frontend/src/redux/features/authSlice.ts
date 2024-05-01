// profileSlice.ts

import { IUser } from "@/lib/typing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { AxiosError } from "axios";

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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProfile.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(
    //             fetchProfile.fulfilled,
    //             (
    //                 state,
    //                 action: PayloadAction<{ user: IUser; accessToken: string }>
    //             ) => {
    //                 state.loading = false;
    //                 state.status = "authenticated";
    //                 state.user = action.payload.user;
    //                 state.access_token = action.payload.accessToken;
    //             }
    //         )
    //         .addCase(fetchProfile.rejected, (state) => {
    //             state.loading = false;
    //             state.status = "idle";
    //         })
    //         .addCase(logOutUser.fulfilled, (state) => {
    //             state.loading = false;
    //             state.error = null;
    //             state.status = "idle";
    //             state.user = null;
    //             state.access_token = null;
    //         });
    // },
});
// Define the async thunk to fetch dashboard products
// export const fetchProfile = createAsyncThunk(
//     "/me",
//     async (access_token?: string | null) => {
//         try {
//             const { data: result } = await Axios.get("/api/v1/me", {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                 },
//             });
//             console.log(result);

//             return result.data;
//         } catch (error) {
//             if (error instanceof AxiosError) {
//                 if (error.response?.status === 403) {
//                     const { data: refreshResult } = await Axios.get(
//                         "/api/v1/refresh"
//                     );
//                     const { data: result } = await Axios.get("/api/v1/me", {
//                         headers: {
//                             Authorization: `Bearer ${refreshResult.data.accessToken}`,
//                         },
//                     });

//                     return result.data;
//                 }
//             }

//             throw new Error("Failed to fetch profile data");
//         }
//     }
// );

// export const logOutUser = createAsyncThunk(
//     "/logout",
//     async (_, { getState }) => {
//         const state = getState() as RootState;

//         try {
//             await Axios.get("/api/v1/logout", {
//                 headers: {
//                     Authorization: `Bearer ${state.auth.access_token}`,
//                 },
//             });
//         } catch (error) {
//             throw new Error("Failed to fetch logOut data");
//         }
//     }
// );
export const { authFailure, authRequest, authSuccess, logOut } =
    authSlice.actions;

export const selectAuthObject = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
