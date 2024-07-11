import { apiSlice } from "../api/apiSlice";

export const appApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query({
            query: () => ({
                url: "/api/v1/me/orders",
                method: "GET",
            }),
            keepUnusedDataFor: 60,
            transformResponse: ({ data }) => data,
        }),
        getMyOrder: builder.query({
            query: ({ orderId }) => ({
                url: `/api/v1/orders/${orderId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 60,
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
        getPublishableKey: builder.query({
            query: () => ({
                url: `/api/v1/payment/config`,
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
            keepUnusedDataFor: 10 * 60,
        }),
        getPaymentIntent: builder.mutation({
            query: ({ orderData }) => ({
                url: `/api/v1/payment/create-payment-intent`,
                method: "POST",
                body: orderData,
            }),
            transformResponse: ({ data }) => data,
        }),
        addItemToCart: builder.mutation({
            query: ({ cartData }) => ({
                url: `/api/v1/cart/add`,
                method: "POST",
                body: cartData,
            }),
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetMyOrdersQuery,
    useGetProductsByIdQuery,
    useGetMyOrderQuery,
    useGetPublishableKeyQuery,
    useGetPaymentIntentMutation,
} = appApiSlice;
