import { apiSlice } from "../api/apiSlice";

export const appApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query({
            query: () => ({
                url: "/api/v1/orders/me",
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),
        products: builder.query({
            query: (profileData) => ({
                url: "/api/v1/products",
                method: "GET",
                body: { ...profileData },
            }),
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const { useGetMyOrdersQuery, useProductsQuery } = appApiSlice;
