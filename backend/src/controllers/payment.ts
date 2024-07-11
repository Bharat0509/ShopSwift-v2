import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const getPublishableKey = asyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
        const apiResponse = new ApiResponse(200, {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });

        return res.status(apiResponse.statusCode).json(apiResponse);
    }
);
