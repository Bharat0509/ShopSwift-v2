// dashboardSlice.ts
import { ICart, IOrder, IProduct } from "@/lib/typing";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface appState {
    loading: boolean;
    products: IProduct[] | null;
    product: IProduct | null;
    orders: IOrder[] | null;
    order: IProduct[] | null;
    customers: IProduct | null;
    customer: IProduct[] | null;
    error: unknown;
    cart: ICart;
}

const initialState: appState = {
    loading: false,
    products: null,
    customers: null,
    orders: null,
    product: null,
    order: null,
    customer: null,
    error: null,
    cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    },
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addToCart(state, action) {
            // Add item to cart
            const newItem = action.payload;

            state.cart.items.push(newItem);
        },
        removeFromCart(state, action) {
            // Remove item from cart
            const productIdToRemove = action.payload;
            state.cart.items = state.cart.items.filter(
                (item) => item.productId !== productIdToRemove
            );
        },
        updateCartItemQuantity(state, action) {
            // Update quantity of an item in the cart
            const { productId, quantity } = action.payload;
            const itemToUpdate = state.cart.items.find(
                (item) => item.productId === productId
            );
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
        clearCart(state) {
            // Clear the entire cart
            state.cart.items = [];
            state.cart.totalItems = 0;
            state.cart.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.app.cart;

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
    appSlice.actions;

export default appSlice.reducer;
