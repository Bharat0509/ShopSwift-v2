// import { processPayment, sendStripeApiKey } from "../controllers/payment";
import express, { Router } from "express";
import { getPublishableKey } from "../controllers/payment";

// import verifyJWT from "../middleware/verifyJWT";
import stripeModule from "stripe";

const stripe = new stripeModule(process.env.STRIPE_SECRET_KEY);

const router: Router = express.Router();

// router.route("/payment/process").get(processPayment);
// router.route("/stripeapikey").get(verifyJWT, sendStripeApiKey);

router.get("/payment/config", getPublishableKey);

router.post("/payment/create-payment-intent", async (req, res) => {
    const orderDeliveryInfo = req.body.orderDeliveryInfo;
    let paymentIntent;
    try {
        paymentIntent = await stripe.paymentIntents.create({
            description: "Software development services",
            shipping: {
                name: orderDeliveryInfo?.name,
                address: {
                    line1: "510 Townsend St",
                    postal_code: "98140",
                    city: "San Francisco",
                    state: "CA",
                    country: "US",
                },
            },
            currency: "inr",
            amount: parseInt(req?.body?.orderTotalPayable),
            automatic_payment_methods: { enabled: true },
            metadata: orderDeliveryInfo,
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

export default router;
