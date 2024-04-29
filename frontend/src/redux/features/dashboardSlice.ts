// dashboardSlice.ts
import { IOrder, IProduct } from "@/lib/typing";
import { Axios } from "@/lib/utils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DashboardState {
    loading: boolean;
    products: IProduct[] | null;
    product: IProduct | null;
    orders: IOrder[] | null;
    order: IProduct[] | null;
    customers: IProduct | null;
    customer: IProduct[] | null;
    error: unknown;
}

const initialState: DashboardState = {
    loading: false,
    products: null,
    customers: null,
    orders: null,
    product: null,
    order: null,
    customer: null,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchDashboardProducts.fulfilled,
                (state, action: PayloadAction<IProduct[]>) => {
                    state.loading = false;
                    state.products = action.payload;
                }
            )
            .addCase(
                fetchDashboardOrders.fulfilled,
                (state, action: PayloadAction<IOrder[]>) => {
                    state.loading = false;
                    state.orders = action.payload;
                }
            )
            .addCase(fetchDashboardProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action?.error?.message ??
                    "Failed to fetch dashboard products";
            })
            .addCase(fetchDashboardOrders.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action?.error?.message ??
                    "Failed to fetch dashboard products";
            });
    },
});

// Define the async thunk to fetch dashboard products
export const fetchDashboardProducts = createAsyncThunk(
    "dashboard/fetchDashboardProducts",
    async () => {
        try {
            const response = await Axios.get("/api/v1/admin/products");
            return response.data.products as IProduct[];
        } catch (error) {
            throw new Error("Failed to fetch dashboard products");
        }
    }
);

// Define the async thunk to fetch dashboard orders
export const fetchDashboardOrders = createAsyncThunk(
    "dashboard/fetchDashboardOrders",
    async () => {
        try {
            const response = await Axios.get("/api/v1/admin/orders");
            return response.data.orders as IOrder[];
        } catch (error) {
            throw new Error("Failed to fetch dashboard orders");
        }
    }
);

export default dashboardSlice.reducer;
