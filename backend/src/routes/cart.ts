import express from "express";
import {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCart,
} from "../controllers/cart";

const router = express.Router();

// Add an item to the cart
router.post("/cart/add", addToCart);

// Remove an item from the cart
router.post("/cart/remove", removeFromCart);

// Update the quantity of an item in the cart
router.put("/cart/update", updateCartItemQuantity);

// Clear the entire cart
router.delete("/cart/clear", clearCart);

// Get the cart for a specific user
router.get("/cart/:userId", getCart);

export default router;
