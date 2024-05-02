import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import ApiError from "../utils/ApiError";

// Define a custom property on the Request object to store decoded user information
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                name: string;
                email: string;
                role: string;
            };
        }
    }
}
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader)
        return next(
            new ApiError(403, "Access Token Expired.Please Login Again")
        );

    const token = authHeader.split(" ")[1];
    if (!token)
        return next(
            new ApiError(403, "Access Token Expired.Please Login Again")
        );

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return next(
                    new ApiError(403, "Access Token Expired.Please Login Again")
                );
            }
            // Store decoded user information in the user property of the Request object
            req.user = decoded;
            next();
        }
    );
};

export default verifyJWT;
