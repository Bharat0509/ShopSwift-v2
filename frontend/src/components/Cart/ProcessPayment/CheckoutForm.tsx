import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import {
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe.js has not yet loaded.");
            return;
        }
        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/account/process-payment/success`,
            },
        });

        if (error?.message) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='m-auto w-full p-4 rounded-md md:w-[40vw]'
        >
            <LinkAuthenticationElement
                id='link-authentication-element'
                options={{ defaultValues: { email: "foo@bar.com" } }}
            />
            <PaymentElement
                id='payment-element'
                className='text-primary-foreground'
            />
            <Button
                disabled={isLoading || !stripe || !elements}
                id='submit'
                variant={isLoading ? "outline" : "default"}
                className='w-full mt-4 '
            >
                <span id='button-text'>
                    {isLoading ? <Spinner /> : "Pay now"}
                </span>
            </Button>
        </form>
    );
};

export default CheckoutForm;
