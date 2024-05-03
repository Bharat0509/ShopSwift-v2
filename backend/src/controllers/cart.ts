import { Request, Response } from "express";
import Cart, { ICartDocument, ICartItem } from "../models/cart";

// Controller function to add an item to the cart
export const addToCart = async (req: Request, res: Response) => {
    const { userId, productId, name, images, price, quantity } = req.body;

    try {
        let cart: ICartDocument | null = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item: ICartItem) => item.productId === productId
        );

        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, name, images, price, quantity });
        }

        cart.totalItems += quantity;
        cart.totalPrice += price * quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
        });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// Controller function to remove an item from the cart
export const removeFromCart = async (req: Request, res: Response) => {
    const { userId, productId } = req.body;

    try {
        let cart: ICartDocument | null = await Cart.findOne({ userId });

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        const itemToRemoveIndex = cart.items.findIndex(
            (item: ICartItem) => item.productId === productId
        );

        if (itemToRemoveIndex !== -1) {
            const removedItem = cart.items.splice(itemToRemoveIndex, 1)[0];
            cart.totalItems -= removedItem.quantity;
            cart.totalPrice -= removedItem.price * removedItem.quantity;
            await cart.save();
            res.status(200).json({
                success: true,
                message: "Item removed from cart successfully",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// Controller function to update the quantity of an item in the cart
export const updateCartItemQuantity = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart: ICartDocument | null = await Cart.findOne({ userId });

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        const itemToUpdate = cart.items.find(
            (item: ICartItem) => item.productId === productId
        );

        if (!itemToUpdate) {
            return res
                .status(404)
                .json({ success: false, message: "Item not found in cart" });
        }

        const quantityDifference = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        cart.totalItems += quantityDifference;
        cart.totalPrice += quantityDifference * itemToUpdate.price;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart item quantity updated successfully",
        });
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// Controller function to clear the entire cart
export const clearCart = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        let cart: ICartDocument | null = await Cart.findOne({ userId });

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// Controller function to get the cart for a specific user
export const getCart = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const cart: ICartDocument | null = await Cart.findOne({ userId });

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
