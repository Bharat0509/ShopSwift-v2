import express from "express";
import {
    handleForgotPassword,
    handleLogin,
    handleLogout,
    handleProfile,
    handleProfileUpdate,
    handleRefreshToken,
    handleRegister,
    handleResetPassword,
} from "../controllers/user";
import verifyJWT from "../middleware/verifyJWT";
const router = express.Router();

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.get("/me", [verifyJWT, handleProfile]);

router.get("/refresh", handleRefreshToken);

router.put("/me/update", [verifyJWT, handleProfileUpdate]);

router.post("/forgot-password", handleForgotPassword);

router.put("/reset-password", handleResetPassword);

router.get("/logout", handleLogout);

export default router;
