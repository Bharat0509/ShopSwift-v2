import { getDashboardData } from "../controllers/dashboard";
import express from "express";

const router = express.Router();

// Add an item to the cart
router.get("/dashboard", getDashboardData);

export default router;
