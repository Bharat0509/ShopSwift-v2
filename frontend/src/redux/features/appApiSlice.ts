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
        getProducts: builder.query({
            query: ({ searchQueryUrl }) => ({
                url: searchQueryUrl,
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),
        getProductsById: builder.query({
            query: ({ productId }) => ({
                url: `/api/v1/products/${productId}`,
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetMyOrdersQuery,
    useGetProductsByIdQuery,
} = appApiSlice;
