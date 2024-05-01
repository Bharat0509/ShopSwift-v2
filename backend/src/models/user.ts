import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    accessToken?: string;
    refreshToken?: string;
    generateAccessToken(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
    generatePasswordResetToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please provide your name."],
            maxLength: [30, "Name cannot exceed 30 characters."],
            minLength: [4, "Name should have at least 4 characters."],
        },
        email: {
            type: String,
            required: [true, "Please provide your email address."],
            unique: true,
            validate: [
                validator.isEmail,
                "Please provide a valid email address.",
            ],
        },
        password: {
            type: String,
            required: [true, "Please provide your password."],
            minLength: [8, "Password should have at least 8 characters."],
            select: false,
        },
        avatar: {
            public_id: {
                type: String,
                required: [
                    true,
                    "Please provide the public ID for your avatar.",
                ],
            },
            url: {
                type: String,
                required: [true, "Please provide the URL for your avatar."],
            },
        },
        role: {
            type: String,
            default: "user",
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,

        refreshToken: String,
    },
    { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    // If the password has not been modified, move to the next middleware
    if (!user.isModified("password")) {
        return next();
    }

    try {
        // Generate a salt
        const salt = await bcryptjs.genSalt();

        // Hash the password with the generated salt
        const hash = await bcryptjs.hash(user.password, salt);

        // Replace the plain password with the hashed password
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN,
        }
    );
};

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    return resetToken;
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN,
        }
    );
};

const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
