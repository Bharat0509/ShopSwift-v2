import Spinner from "@/components/ui/spinner";
import { selectAuthObject } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { PaymentIntent, Stripe, loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const ProcessPaymentSuccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { access_token } = useAppSelector(selectAuthObject);
    const [orderInfo, setOrderInfo] = useState<PaymentIntent | undefined>(
        undefined
    );
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location]
    );
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:4000/api/v1/payment/config").then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        if (!stripePromise) return;

        stripePromise.then(async (stripe) => {
            if (!stripe) return;

            const clientSecret = searchParams.get(
                "payment_intent_client_secret"
            );
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(
                clientSecret!
            );

            if (error) {
                toast.error("Failed");
                return;
            }
            const orderInfo = JSON.parse(
                sessionStorage.getItem("orderInfo") ?? ""
            );
            await fetch("http://localhost:4000/api/v1/orders/new", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    orderInfo,
                    paymentInfo: paymentIntent,
                }),
            });

            setOrderInfo(paymentIntent);
            setIsLoading(false);
        });
    }, [searchParams, stripePromise]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 w-full'>
            {isLoading ? (
                <div className='flex flex-col items-center justify-center'>
                    <p className='mb-4 text-center'>
                        Please refrain from leaving this page or pressing the
                        back button.
                    </p>
                    <p className='mb-4 text-center'>
                        We are currently processing your payment and order
                        details.
                    </p>
                    <Spinner />
                </div>
            ) : (
                <div className='max-w-md w-full space-y-8'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='bg-green-500 rounded-full p-4 mb-6'>
                            <CheckIcon className='h-8 w-8 text-white' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-50'>
                            Order Placed Successfully
                        </h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-2'>
                            Thank you for your order! We're processing it now
                            and will send you an update when it ships.
                        </p>
                    </div>
                    <div className='bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden'>
                        <div className='px-4 py-5 sm:px-6'>
                            <h2 className='text-lg font-medium text-gray-900 dark:text-gray-50'>
                                Payment Summary
                            </h2>
                        </div>
                        <div className='border-t border-gray-200 dark:border-gray-700'>
                            <dl className='divide-y divide-gray-200 dark:divide-gray-700'>
                                <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                    <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                        Order Number
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2'>
                                        #{orderInfo?.id}
                                    </dd>
                                </div>

                                <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                    <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                        Total
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2'>
                                        ${orderInfo?.amount}
                                    </dd>
                                </div>
                                <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                    <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                        Delivery
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2'>
                                        Estimated delivery within 3 Days.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Link
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300'
                            to='/account/orders'
                        >
                            View Order Status
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessPaymentSuccess;
