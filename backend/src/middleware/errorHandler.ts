import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorHandlerMiddleware = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number = err.statusCode || 500;
    let message: string = err.message || "Internal Server Error";

    // Default error handling
    if (err instanceof ApiError) {
        statusCode = err.statusCode || 500;
        message = err.message || "Internal Server Error";
    }

    // MongoDB Error handling
    if (err.name === "CastError") {
        const errorMessage = `Resource Not found. Invalid: ${
            (err as any).path
        }`;
        statusCode = 400;
        message = errorMessage;
    }

    // Mongoose Duplicate Error handling
    if (err.name === "MongoError" && (err as any).code === 11000) {
        const errorMessage = `Duplicate ${(err as any).keyValue} entered`;
        statusCode = 400;
        message = errorMessage;
    }

    // JWT Error handling
    if (err.name === "JsonWebTokenError") {
        console.log("Json", err);

        statusCode = 401;
        message = "Json Web Token is invalid, please try again.";
    }

    // JWT Token Expired Error handling
    if (err.name === "TokenExpiredError") {
        const expiredTokenType = (err as any).expiredTokenType;
        if (expiredTokenType === "access") {
            statusCode = 403; // Change status code to 403 Forbidden
            message = "Access token has expired, please log in again.";
        } else if (expiredTokenType === "refresh") {
            statusCode = 401;
            message = "Refresh token has expired, please log in again.";
        } else {
            statusCode = 401;
            message = "Token has expired, please log in again.";
        }
    }
    let response: { success: boolean; error: string; stack?: string } = {
        success: false,
        error: message,
    };
    if (process.env.NODE_ENV !== "production") {
        response = { ...response, stack: err.stack };
    }
    res.status(statusCode).json(response);
};

export default errorHandlerMiddleware;
