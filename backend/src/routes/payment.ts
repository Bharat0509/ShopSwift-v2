// import { processPayment, sendStripeApiKey } from "../controllers/payment";
import express, { Router } from "express";

// import verifyJWT from "../middleware/verifyJWT";
import stripeModule from "stripe";

const stripe = new stripeModule(process.env.STRIPE_SECRET_KEY);

const router: Router = express.Router();

// router.route("/payment/process").get(processPayment);
// router.route("/stripeapikey").get(verifyJWT, sendStripeApiKey);

router.get("/payment/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

const calculate_tax = async (orderAmount: number, currency: string) => {
    const taxCalculation = await stripe.tax.calculations.create({
        currency,
        customer_details: {
            address: {
                line1: "10709 Cleary Blvd",
                city: "Plantation",
                state: "FL",
                postal_code: "33322",
                country: "US",
            },
            address_source: "shipping",
        },
        line_items: [
            {
                amount: orderAmount,
                reference: "ProductRef",
                tax_behavior: "exclusive",
                tax_code: "txcd_30011000",
            },
        ],
    });

    return taxCalculation;
};

router.post("/payment/create-payment-intent", async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create

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
