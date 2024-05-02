import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/v1/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: "/api/v1/me/update",
                method: "PUT",
                body: { ...profileData },
            }),
        }),
        sendForgotPasswordEmail: builder.mutation({
            query: (email) => ({
                url: "/api/v1/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ password, token }) => ({
                url: "/api/v1/reset-password",
                method: "PUT",
                body: { password, token },
            }),
        }),
        me: builder.query({
            query: () => ({
                url: "/api/v1/me",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useMeQuery,
    useUpdateProfileMutation,
    useSendForgotPasswordEmailMutation,
    useResetPasswordMutation,
} = authApiSlice;
