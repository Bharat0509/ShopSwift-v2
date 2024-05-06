import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Payment from "./Payment";

export default function ProcessPayment() {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/v1/payment/config").then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    return (
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
            <Breadcrumb className='flex'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Account</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Order</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Process Payment </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='border border-secondary w-full md:w-[40vw]'>
                <Payment stripePromise={stripePromise} />
            </div>
        </main>
    );
}
