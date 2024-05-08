import { apiSlice } from "../api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminOrders: builder.query({
            query: () => ({
                url: "/api/v1/admin/orders",
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),
        adminUpdateOrder: builder.mutation({
            query: ({ orderId, updatedOrder }) => ({
                url: `/api/v1/admin/orders/${orderId}`,
                method: "PUT",
                body: updatedOrder,
            }),
            transformResponse: ({ data }) => data,
        }),
        getAdminProducts: builder.query({
            query: () => ({
                url: "/api/v1/admin/products",
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/api/v1/admin/products/add",
                method: "POST",
                body: { ...productData },
            }),
        }),
    }),
});

export const {
    useGetAdminOrdersQuery,
    useGetAdminProductsQuery,
    useAddProductMutation,
    useAdminUpdateOrderMutation,
} = dashboardApiSlice;
