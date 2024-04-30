import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

// Define a custom property on the Request object to store decoded user information
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

const handleLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "email and password are required.");
        }

        // Find user in the database
        const user: IUser | null = await User.findOne({ email }).select(
            "+password"
        );

        if (!user) {
            return next(new ApiError(401, "Invalid Email or Password"));
        }

        // Compare passwords
        const isPasswordMatched = await user.comparePassword(password);

        if (isPasswordMatched) {
            // Create AccessToken and Refresh Token
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken;
            await user.save();

            // Set refresh token as cookie
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            // Return access token
            const apiResponse = new ApiResponse<{
                user: IUser;
                accessToken: string;
            }>(200, {
                user: user,
                accessToken: accessToken,
            });
            return res.json(apiResponse);
        } else {
            return next(new ApiError(401, "Unauthorized"));
        }
    }
);

const handleRegister = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, avatar } = req.body;

        // Check if the email is already registered
        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError(400, "Email is already registered"));
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            avatar,
            role: "user", // Set default role
        });

        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();
        newUser.refreshToken = refreshToken;

        // Save the user to the database
        await newUser.save();

        // Set refresh token as cookie
        res.cookie("access_token", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Return success response
        const apiResponse = new ApiResponse(
            201,
            accessToken,
            "User registered successfully"
        );
        return res.status(201).json(apiResponse);
    }
);

const handleProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findById(req.user);
        const access_token = user.generateAccessToken();

        const apiResponse = new ApiResponse(
            200,
            { user, accessToken: access_token },
            "User profile retrieved successfully"
        );
        return res.status(200).json(apiResponse);
    }
);

const handleRefreshToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const cookies = req.cookies;

        if (!cookies?.refresh_token) {
            const apiError = new ApiError(
                401,
                "JWT token not found in cookies"
            );
            return res.status(apiError.statusCode).json(apiError);
        }

        const refreshToken = cookies.refresh_token;

        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) {
            const apiError = new ApiError(403, "Invalid refresh token");
            return res.status(apiError.statusCode).json(apiError);
        }

        // Verify the refresh token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err: Error, decoded: JwtPayload) => {
                if (err || foundUser._id.toString() !== decoded.userId) {
                    const apiError = new ApiError(
                        403,
                        "Invalid or expired refresh token"
                    );
                    return res.status(apiError.statusCode).json(apiError);
                }

                // Generate a new access token
                const accessToken = foundUser.generateAccessToken();
                // Respond with the new access token
                const apiResponse = new ApiResponse(
                    200,
                    { accessToken },
                    "New access token generated successfully"
                );
                res.status(apiResponse.statusCode).json(apiResponse);
            }
        );
    }
);

const handleForgotPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const apiError = new ApiError(404, "User Not Found");
            return next(apiError);
        }

        // Generate reset password token and save user
        const resetToken = user.generatePasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // Construct reset password URL
        const resetPasswordUrl = `${req.protocol}://${req.get(
            "host"
        )}/password/reset/${resetToken}`;

        // Construct email message
        const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

        const apiResponse = new ApiResponse(
            200,
            null,
            `Email sent to ${user.email} successfully`
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

const handleResetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const apiError = new ApiError(404, "User Not Found");
            return next(apiError);
        }

        const apiResponse = new ApiResponse(
            200,
            null,
            `Email sent to ${user.email} successfully`
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

const handleLogout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content
        const refreshToken = cookies.jwt;

        // Is refreshToken in db?
        const foundUser = User.findOneAndUpdate(
            { refreshToken },
            { refreshToken: null }
        );
        if (!foundUser) {
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res.sendStatus(204);
        }

        return new ApiResponse(200, null, "User Logged out successfully.");
    }
);
export {
    handleLogin,
    handleRegister,
    handleProfile,
    handleRefreshToken,
    handleForgotPassword,
    handleResetPassword,
    handleLogout,
};
