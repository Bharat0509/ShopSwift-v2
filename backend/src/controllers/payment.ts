import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";

export const processPayment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // const myPayment = await paymentIntent();

        res.status(200).json({
            success: true,
            // client_secret: myPayment.client_secret,
        });
    }
);

export const sendStripeApiKey = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            success: true,
            stripeApiKey: process.env.STRIPE_API_KEY,
        });
    }
);
