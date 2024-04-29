// profileSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "@/lib/typing";

interface ProfileState {
    status: "idle" | "loading" | "authenticated";
    loading: boolean;
    user: IUser | null;
    error: string | null;
}

const initialState: ProfileState = {
    loading: false,
    status: "idle",
    user: null,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        authRequest(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(state, action: PayloadAction<IUser>) {
            state.loading = false;
            (state.status = "authenticated"),
                (state.user = action.payload),
                (state.error = null);
        },
        authFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.status = "idle";
            state.error = action.payload;
        },
    },
});

export const { authFailure, authRequest, authSuccess } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
