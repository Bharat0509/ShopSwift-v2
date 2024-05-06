import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { OrderInfo } from "./OrderInfo";

const formSchema = z.object({
    name: z.string().min(2).max(30).optional(),
    email: z.string().email().optional(),
    contactNumber: z.string().min(8).max(15).optional(),
    shippingAddress: z.string().optional(),
    shippingAddressDetails: z.string().optional(),
});

export type formValues = z.infer<typeof formSchema>;
export default function PlaceOrder() {
    const defaultValues: Partial<formValues> = {
        name: "John",
        email: "john@example.com",
        contactNumber: "+1234567890",
        shippingAddress: "123 Shipping Street",
        shippingAddressDetails: "Apartment 123, Floor 3",
    };
    const [currStepNumber, setCurrStepNumber] = useState(1);
    const [orderDeliveryInfo, setOrderDeliveryInfo] =
        useState<Partial<formValues>>(defaultValues);

    let content = null;

    const { register, handleSubmit } = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(orderDeliveryInfo: formValues) {
        setOrderDeliveryInfo(orderDeliveryInfo);
        setCurrStepNumber((prev) => prev + 1);
    }

    if (currStepNumber === 1) {
        content = (
            <div className='w-full max-w-4xl border rounded-lg shadow-lg '>
                <div className='flex items-center justify-between px-6 py-4 border-b dark:border-gray-800'>
                    <h1 className='text-2xl font-bold'>Order Information</h1>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-primary dark:bg-primary' />
                        <div className='w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600' />
                        <div className='w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600' />
                    </div>
                </div>
                <div className='p-6 space-y-6'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                placeholder='Enter your name'
                                {...register("name")}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                placeholder='Enter your email'
                                type='email'
                                {...register("email")}
                            />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='promo-code'>Contact Number</Label>

                        <Input
                            id='contact-number'
                            placeholder='Enter your contact number'
                            {...register("contactNumber")}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='address'>Shipping Address</Label>
                        <Textarea
                            id='address'
                            placeholder='Enter your shipping address'
                            {...register("shippingAddress")}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='address-details'>
                            Shipping Address Details
                        </Label>
                        <Input
                            id='address-details'
                            placeholder='Apartment, suite, etc. (optional)'
                            {...register("shippingAddressDetails")}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button type='submit' size='lg'>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    if (currStepNumber === 2) {
        content = (
            <div className='w-full max-w-4xl border rounded-lg shadow-lg '>
                <div className='flex items-center justify-between px-6 py-4 border-b dark:border-gray-800'>
                    <h1 className='text-2xl font-bold'>Promo Code</h1>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-primary dark:bg-primary' />
                        <div className='w-2 h-2 rounded-full bg-primary dark:bg-primary' />
                        <div className='w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600' />
                    </div>
                </div>
                <div className='p-6'>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <Label htmlFor='promo-code'>Enter Promo Code</Label>
                            <div className='flex gap-2'>
                                <Input
                                    id='promo-code'
                                    placeholder='Enter promo code'
                                />
                                <Button size='default'>Apply</Button>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <h3 className='text-lg font-bold'>
                                Promo Code Details
                            </h3>
                            <p>
                                Your promo code "SAVE10" will give you a $10
                                discount on your order. This discount will be
                                applied to your total at checkout.
                            </p>
                        </div>
                        <div className='space-y-2'>
                            <h3 className='text-lg font-bold'>
                                Promo Code Terms
                            </h3>
                            <ul className='list-disc pl-6 space-y-1'>
                                <li>
                                    Promo code is valid for one-time use only.
                                </li>
                                <li>
                                    Discount cannot be combined with other
                                    offers.
                                </li>
                                <li>
                                    Promo code expires on December 31, 2023.
                                </li>
                            </ul>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Button
                                type='button'
                                onClick={() =>
                                    setCurrStepNumber((prev) => prev - 1)
                                }
                                variant='outline'
                                size='lg'
                            >
                                Previous
                            </Button>
                            <Button
                                type='button'
                                onClick={() =>
                                    setCurrStepNumber((prev) => prev + 1)
                                }
                                size='lg'
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (currStepNumber === 3) {
        content = (
            <>
                <OrderInfo orderDeliveryInfo={orderDeliveryInfo} />
            </>
        );
    }

    return (
        <main className='flex flex-1 flex-col gap-2 p-4 md:gap-2 md:p-6'>
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
                            <Link to='#'>Cart</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Place Order</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <form onSubmit={handleSubmit(onSubmit)}>{content}</form>
        </main>
    );
}
