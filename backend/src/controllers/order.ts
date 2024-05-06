import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import Product from "../models/product";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import mongoose from "mongoose";
import { sendOrderPlacedEmail } from "../emailTemplates";

// Create New Order
export const newOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { paymentInfo, orderInfo } = req.body;

        const currentDate = new Date();
        const threeDaysFromNow = new Date(currentDate);
        threeDaysFromNow.setDate(currentDate.getDate() + 3);
        const order = await Order.create({
            shippingInfo: {
                address:
                    orderInfo.orderDeliveryInfo?.shippingAddressDetails +
                    " ," +
                    orderInfo.orderDeliveryInfo?.shippingAddress,
                city: paymentInfo.shipping?.city ?? "Unknown",
                state: paymentInfo.shipping?.state ?? "Unknown",
                country: paymentInfo.shipping?.country ?? "Unknown",
                pinCode: paymentInfo.shipping?.postal_code ?? 234567,
                phoneNo:
                    orderInfo.orderDeliveryInfo?.contactNumber ?? 12345678899,
            },
            orderItems: orderInfo.orderItems,
            user: req.user.userId,
            paymentInfo: {
                id: paymentInfo.id,
                status: paymentInfo.status,
            },
            paidAt: Date.now(),
            itemsPrice: orderInfo.orderSubTotalPrice,
            taxPrice: orderInfo.orderTaxPrice,
            shippingPrice: orderInfo.orderSubTotalPrice,
            totalPrice: orderInfo.orderTotalPayable,
            deliveredAt: threeDaysFromNow,
        });
        await sendOrderPlacedEmail(order, req?.user?.email);

        const apiResponse = new ApiResponse(
            200,
            { order },
            "Order created successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get Single Order
export const getSingleOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            const apiError = new ApiError(404, "Order Not Found With This Id");
            return next(apiError);
        }

        const apiResponse = new ApiResponse(
            200,
            { order },
            "Order details fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get All Orders -- Admin
export const getAllOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach((order) => (totalAmount += order.totalPrice));

        const apiResponse = new ApiResponse(
            200,
            { totalAmount, orders },
            "All orders fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Update Order Status -- Admin
export const updateOrderStatus = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let order = await Order.findById(req.params.id);
        if (order.orderStatus === "Delivered") {
            const apiError = new ApiError(404, "Order Delivered Successfully");
            return next(apiError);
        }
        if (
            order.orderStatus === "Processing" &&
            req.body.status == "Shipped"
        ) {
            order.orderItems.forEach(async (orderItem: any) => {
                await updateStock(orderItem.product, orderItem.quantity);
            });
        }

        order.orderStatus = req.body.status;
        // if (req.body.status === "Delivered") order.deliveredAt = Date.now();

        await order.save({ validateBeforeSave: false });

        const apiResponse = new ApiResponse(
            200,
            { order },
            "Order status updated successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);

        async function updateStock(id: string, quantity: number) {
            const product = await Product.findById(id);
            product.stock = product.stock - Number(quantity);
            await product.save();
        }
    }
);

// Delete Orders -- Admin
export const deleteOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const order = await Order.findById(req.params.id);
        // await order.remove();

        const apiResponse = new ApiResponse(
            200,
            null,
            "Order deleted successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get Logged in user Orders
export const myOrders = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const orders = await Order.find({ user: userId });

        const apiResponse = new ApiResponse(
            200,
            { orders },
            "User orders fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);
