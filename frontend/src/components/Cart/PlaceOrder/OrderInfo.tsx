import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { formValues } from ".";
import { useAppSelector } from "@/redux/hooks";
import { selectCart } from "@/redux/features/appSlice";
import { ICartItem } from "@/lib/typing";
import { useEffect } from "react";

export function OrderInfo({
    orderDeliveryInfo,
}: {
    orderDeliveryInfo: formValues;
}) {
    const { items } = useAppSelector(selectCart);
    const subTotalPrice = items.reduce(
        (total: number, currItem: ICartItem) =>
            total + currItem.price * currItem.quantity,
        0
    );
    const taxPrice = 0.29 * subTotalPrice;
    const totalPrice = subTotalPrice + 5 + taxPrice;

    useEffect(() => {
        const orderInfo = {
            orderDeliveryInfo: orderDeliveryInfo,
            orderItems: items,
            orderSubTotalPrice: subTotalPrice,
            orderShippingPrice: 5,
            orderTaxPrice: taxPrice,
            orderTotalPayable: totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    }, [items, orderDeliveryInfo, subTotalPrice, taxPrice, totalPrice]);
    return (
        <div className='sm:py-4 w-full flex flex-col md:flex-row justify-between gap-8'>
            <div className='w-full p-4 rounded-md border'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Order Details</div>
                    <ul className='grid gap-3'>
                        {items?.map((item) => (
                            <li
                                key={item?.productId}
                                className='flex items-center justify-between'
                            >
                                <span className='text-muted-foreground'>
                                    {item?.name} x <span>{item?.quantity}</span>
                                </span>
                                <span>${item?.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator className='my-4' />
                <div className='grid grid-cols-2 gap-4'>
                    <div className='grid gap-3'>
                        <div className='font-semibold'>
                            Shipping Information
                        </div>
                        <address className='grid gap-0.5 not-italic text-muted-foreground'>
                            <span>{orderDeliveryInfo?.shippingAddress}</span>
                            <span>
                                {orderDeliveryInfo?.shippingAddressDetails}
                            </span>
                        </address>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='grid gap-3'>
                    <div className='font-semibold'>Customer Information</div>
                    <dl className='grid gap-3'>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Customer</dt>
                            <dd>{orderDeliveryInfo?.name}</dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Email</dt>
                            <dd>
                                <a href='mailto:'>{orderDeliveryInfo?.email}</a>
                            </dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Phone</dt>
                            <dd>
                                <a href='tel:'>
                                    {orderDeliveryInfo?.contactNumber}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className='w-full md:max-w-md h-fit p-4 rounded-md border'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Order Payment Details</div>

                    <Separator className='my-2' />
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Subtotal
                            </span>
                            <span>${subTotalPrice.toFixed(2)}</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Shipping
                            </span>
                            <span>$5.00</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>Tax</span>
                            <span>${(0.29 * totalPrice).toFixed(2)}</span>
                        </li>
                        <li className='flex items-center justify-between font-semibold'>
                            <span className='text-muted-foreground'>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>
                <Separator className='my-4' />
                <div className='w-full'>
                    <Button className='w-full'>
                        <Link to='/account/process-payment' className='w-full'>
                            Continue for payment
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
