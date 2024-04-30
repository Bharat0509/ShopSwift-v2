import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user)) {
            const apiError = new ApiError(
                403,
                `Role: ${req.user} is not allowed to access this resource`
            );
            return next(apiError);
        }
        next();
    };
};
