import { processPayment, sendStripeApiKey } from "../controllers/payment";
import express, { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = express.Router();

router.route("/payment/process").get(processPayment);
router.route("/stripeapikey").get(verifyJWT, sendStripeApiKey);

export default router;
