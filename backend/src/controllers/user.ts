import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../emailTemplates";
import User, { IUser } from "../models/user";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import * as dotenv from "dotenv";
import { PRIORITY_LIMIT } from "bullmq";
dotenv.config();
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

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_SECRET_KEY as string,
} as CloudinaryConfig);

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
            return next(new ApiError(401, "Invalid Email or Password."));
        }
    }
);

const handleRegister = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, avatar } = req.body;

        // Check if the email is already registered
        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError(400, "Email is already registered"));
        }

        // Create a new user
        const newUser = new User({
            name: firstName + " " + lastName,
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
        const user = await User.findById(req.user.userId);
        const access_token = user.generateAccessToken();

        const apiResponse = new ApiResponse(
            200,
            { user, accessToken: access_token },
            "User profile retrieved successfully"
        );
        return res.status(200).json(apiResponse);
    }
);
const handleProfileUpdate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let newUserData: {
            name?: string;
            email?: string;
            avatar?: { public_id: string; url: string };
        } = {
            name: req.body.name,
            email: req.body.email,
        };

        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            if (user?.avatar?.public_id) {
                const imageId = user.avatar.public_id;
                await cloudinary.uploader.destroy(imageId);
            }

            const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            newUserData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        if (!user) {
            return next(new ApiError(404, "User not found."));
        }

        const apiResponse = new ApiResponse(
            200,
            "Profile Updated successfully."
        );
        res.status(apiResponse.statusCode).json(apiResponse);
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

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        //Send Email
        await sendEmail({
            data: {
                userName: user.name,
                resetPasswordURL: resetPasswordUrl,
            },
            email: user.email,
            queue: "send-forgot-password-email",
            subject: "Password Reset for your account",
            template: "forgot-password.ejs",
        });

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
        const user = await User.findOne({ resetPasswordToken: req.body.token });

        const currDate = new Date(Date.now());
        if (!user) {
            const apiError = new ApiError(404, "User Not Found");
            return next(apiError);
        }
        user.password = req.body.password;
        (user.resetPasswordExpires = null),
            (user.resetPasswordToken = null),
            user.save();
        const apiResponse = new ApiResponse(
            200,
            null,
            `Password reset successful.`
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

const handleLogout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const cookies = req.cookies;
        if (!cookies?.refresh_token) return res.sendStatus(204); //No content
        const refreshToken = cookies.refresh_token;

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
        res.clearCookie("refresh_token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        const apiResponse = new ApiResponse(
            200,
            null,
            "User Logged out successfully."
        );
        return res.status(apiResponse.statusCode).json(apiResponse);
    }
);
export {
    handleForgotPassword,
    handleLogin,
    handleLogout,
    handleProfile,
    handleProfileUpdate,
    handleRefreshToken,
    handleRegister,
    handleResetPassword,
};
