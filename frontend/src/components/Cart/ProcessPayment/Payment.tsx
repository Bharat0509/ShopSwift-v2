import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
interface IAppearance {
    theme: "stripe";

    variables: {
        colorPrimary: string;
        colorBackground: string;
        colorText: string;
        colorDanger: string;
        fontFamily: string;
        spacingUnit: string;
        borderRadius: string;
        // See all possible variables below
    };
}
const appearance: IAppearance = {
    theme: "stripe",

    variables: {
        colorPrimary: "#ea580ce6",
        colorBackground: "#292524",
        colorText: "#fafaf9",
        colorDanger: "#ea580c",
        fontFamily: "Ideal Sans, system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "4px",
    },
};

function Payment({
    stripePromise,
}: {
    stripePromise: Promise<Stripe | null> | null;
}) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (clientSecret) return;
        fetch("http://localhost:4000/api/v1/payment/create-payment-intent", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: sessionStorage?.getItem("orderInfo") ?? "",
        })
            .then((res) => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret));
    }, [clientSecret]);
    if (!stripePromise) return null;
    return (
        <div className=' flex items-center justify-center text-secondary'>
            {clientSecret && stripePromise && (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, appearance }}
                >
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}

export default Payment;
