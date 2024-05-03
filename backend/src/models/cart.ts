import mongoose, { Document } from "mongoose";
interface ICartImage {
    url: string;
    public_id?: string;
}

export interface ICartItem {
    productId: mongoose.Schema.Types.ObjectId;
    name: string;
    images: ICartImage[];
    price: number;
    quantity: number;
}

export interface ICartDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: ICartItem[];
    totalItems: number;
    totalPrice: number;
}

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema<ICartItem>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            url: String,
            alt: String,
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity to 1
    },
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema<ICartDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    items: [cartItemSchema], // Array of cart items
    totalItems: {
        type: Number,
        default: 0, // Default total items to 0
    },
    totalPrice: {
        type: Number,
        default: 0, // Default total price to 0
    },
});

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
