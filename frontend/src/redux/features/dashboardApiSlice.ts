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
        updateOrder: builder.mutation({
            query: ({ orderId, updatedOrder }) => ({
                url: `/api/v1/admin/orders/${orderId}`,
                method: "PUT",
                body: updatedOrder,
            }),
            transformResponse: ({ data }) => data,
        }),
        updateProduct: builder.mutation({
            query: ({ productId, updatedProduct }) => ({
                url: `/api/v1/admin/product/${productId}`,
                method: "PUT",
                body: updatedProduct,
            }),
            transformResponse: ({ data }) => data,
        }),
        adminDeleteProduct: builder.mutation({
            query: ({ productId }) => ({
                url: `/api/v1/admin/products/${productId}/delete`,
                method: "DELETE",
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
        getProductById: builder.query({
            query: ({ productId }) => ({
                url: `/api/v1/products/${productId}`,
                method: "GET",
            }),
            transformResponse: ({ data }) => data,
        }),

        getDashboardData: builder.query({
            query: () => ({
                url: "/api/v1/dashboard",
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
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useAddProductMutation,
    useUpdateOrderMutation,
    useAdminDeleteProductMutation,
    useGetDashboardDataQuery,
} = dashboardApiSlice;
