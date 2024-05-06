import mongoose, { Document, Model } from "mongoose";

interface IOrder extends Document {
    shippingInfo: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
        phoneNo: number;
    };
    orderItems: {
        name: string;
        price: number;
        quantity: number;
        image?: string;
        product: mongoose.Schema.Types.ObjectId;
    }[];
    user: mongoose.Schema.Types.ObjectId;
    paymentInfo: {
        id: string;
        status: string;
    };
    paidAt: Date;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    deliveredAt: Date;
    createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        shippingInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            pinCode: { type: Number, required: true },
            phoneNo: { type: Number, required: true },
        },
        orderItems: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String },
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },
        paymentInfo: {
            id: { type: String, required: true },
            status: { type: String, required: true },
        },
        paidAt: { type: Date, required: true },
        itemsPrice: { type: Number, default: 0, required: true },
        taxPrice: { type: Number, default: 0, required: true },
        shippingPrice: { type: Number, default: 0, required: true },
        totalPrice: { type: Number, default: 0, required: true },
        orderStatus: { type: String, default: "Processing" },
        deliveredAt: Date,
    },
    { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model("Order", orderSchema);
export default Order;
