import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Spinner from "@/components/ui/spinner";
import { useGetPublishableKeyQuery } from "@/redux/features/appApiSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import Payment from "./Payment";

export default function ProcessPayment() {
    const { isFetching, data } = useGetPublishableKeyQuery("StripePubKey");

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
            {isFetching ? (
                <Spinner />
            ) : (
                <div className='border border-secondary w-full md:w-[40vw]'>
                    <Payment stripePromise={loadStripe(data.publishableKey)} />
                </div>
            )}
        </main>
    );
}
