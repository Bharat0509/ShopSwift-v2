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
        update: builder.mutation({
            query: (profileData) => ({
                url: "/api/v1/me/update",
                method: "POST",
                body: { ...profileData },
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

export const { useLoginMutation, useMeQuery } = authApiSlice;
