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

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAppProducts.fulfilled,
                (state, action: PayloadAction<IProduct[]>) => {
                    state.loading = false;
                    state.products = action.payload;
                }
            )
            .addCase(
                fetchAppOrders.fulfilled,
                (state, action: PayloadAction<IOrder[]>) => {
                    state.loading = false;
                    state.orders = action.payload;
                }
            )
            .addCase(fetchAppProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action?.error?.message ??
                    "Failed to fetch dashboard products";
            })
            .addCase(fetchAppOrders.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action?.error?.message ??
                    "Failed to fetch dashboard products";
            });
    },
});

// Define the async thunk to fetch dashboard products
export const fetchAppProducts = createAsyncThunk(
    "dashboard/fetchAppProducts",
    async () => {
        try {
            const response = await Axios.get("/api/v1/products");
            return response.data.products as IProduct[];
        } catch (error) {
            throw new Error("Failed to fetch dashboard products");
        }
    }
);

// Define the async thunk to fetch dashboard orders
export const fetchAppOrders = createAsyncThunk(
    "dashboard/fetchAppOrders",
    async () => {
        try {
            const response = await Axios.get("/api/v1/me/orders");
            return response.data.orders as IOrder[];
        } catch (error) {
            throw new Error("Failed to fetch dashboard orders");
        }
    }
);

export default appSlice.reducer;
