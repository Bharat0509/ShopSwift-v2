import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import ApiError from "../utils/ApiError";

// Define a custom property on the Request object to store decoded user information
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return next(new ApiError(403, "Unauthorized Access"));

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return next(
                    new ApiError(403, `${err.message} : ${err.message}`)
                );
            }
            // Store decoded user information in the user property of the Request object
            req.user = decoded.userId;
            next();
        }
    );
};

export default verifyJWT;
