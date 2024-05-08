import { ChevronLeft, ChevronRight, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyOrderQuery } from "@/redux/features/appApiSlice";
import { useAdminUpdateOrderMutation } from "@/redux/features/dashboardApiSlice";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Order() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [updateOrder] = useAdminUpdateOrderMutation();

    const { isSuccess, data } = useGetMyOrderQuery({ orderId });
    const order = data?.order;
    const handleStatusChange = async (val: string) => {
        try {
            await updateOrder({
                orderId,
                updatedOrder: { status: val },
            }).unwrap();
            toast.success("Order status updated.");
        } catch (error) {
            console.log(error);

            toast.error("Failed to update order status.");
        }
    };
    return (
        <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-start bg-muted/50'>
                <div className='grid gap-0.5'>
                    <CardTitle className='group flex items-center gap-2 text-lg'>
                        Order Oe31b70H
                        <Button
                            size='icon'
                            variant='outline'
                            className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                        >
                            <Copy className='h-3 w-3' />
                            <span className='sr-only'>Copy Order ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className='ml-auto flex  gap-1'>
                    <div className='grid gap-6'>
                        <div className='grid gap-3'>
                            <Label>Order Status</Label>
                            {isSuccess ? (
                                <Select
                                    defaultValue={order.orderStatus}
                                    onValueChange={(val) =>
                                        handleStatusChange(val)
                                    }
                                >
                                    <SelectTrigger
                                        id='status'
                                        aria-label='Select status'
                                        className='mr-2'
                                        value={
                                            order?.orderStatus ??
                                            "Select status"
                                        }
                                    >
                                        <SelectValue className='w-full h-4' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='pending'>
                                            Pending
                                        </SelectItem>
                                        <SelectItem value='processing'>
                                            Processing
                                        </SelectItem>
                                        <SelectItem value='shipped'>
                                            Shipped
                                        </SelectItem>
                                        <SelectItem value='delivered'>
                                            Delivered
                                        </SelectItem>
                                        <SelectItem value='returned'>
                                            Returned
                                        </SelectItem>
                                        <SelectItem value='canceled'>
                                            Canceled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='p-6 text-sm'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Order Details</div>
                    <ul className='grid gap-3'>
                        {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-expect-error
                            order?.orderItems?.map((item) => {
                                return (
                                    <li
                                        key={item?._id}
                                        className='flex items-center justify-between'
                                    >
                                        <span className='text-muted-foreground'>
                                            {item.name} x{" "}
                                            <span>{item?.quantity}</span>
                                        </span>
                                        <span>${item?.price}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <Separator className='my-2' />
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Subtotal
                            </span>
                            {<span>${order?.itemsPrice}</span>}
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Shipping
                            </span>
                            {<span>${order?.shippingPrice}</span>}
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>Tax</span>
                            {<span>${order?.taxPrice}</span>}
                        </li>
                        <li className='flex items-center justify-between font-semibold'>
                            <span className='text-muted-foreground'>Total</span>
                            {<span>${order?.totalPrice}</span>}
                        </li>
                    </ul>
                </div>
                <Separator className='my-4' />
                <div className='grid grid-cols-2 gap-4'>
                    <div className='grid gap-3'>
                        <div className='font-semibold'>
                            Shipping Information
                        </div>
                        <address className='grid gap-0.5 not-italic text-muted-foreground'>
                            <span>{order?.shippingInfo?.address}</span>
                            <span>{order?.shippingInfo?.city}</span>
                            <span>
                                {order?.shippingInfo?.state},
                                {order?.shippingInfo?.country},
                                {order?.shippingInfo?.pinCode}
                            </span>
                        </address>
                    </div>
                    <div className='grid auto-rows-max gap-3'>
                        <div className='font-semibold'>Billing Information</div>
                        <div className='text-muted-foreground'>
                            Same as shipping address
                        </div>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='grid gap-3'>
                    <div className='font-semibold'>Customer Information</div>
                    <dl className='grid gap-3'>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Customer</dt>
                            <dd>{order?.user?.name}</dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Email</dt>
                            <dd>
                                <a href='mailto:'>{order?.user?.email}</a>
                            </dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Phone</dt>
                            <dd>
                                <a href='tel:'>
                                    +91 {order?.shippingInfo?.phoneNo}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                <div className='text-xs text-muted-foreground'>
                    Ordered on{" "}
                    <time dateTime='2023-11-23'>November 23, 2023</time>
                </div>
                <Pagination className='ml-auto mr-0 w-auto'>
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                size='icon'
                                variant='outline'
                                className='h-6 w-6'
                            >
                                <ChevronLeft className='h-3.5 w-3.5' />
                                <span className='sr-only'>Previous Order</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                size='icon'
                                variant='outline'
                                className='h-6 w-6'
                            >
                                <ChevronRight className='h-3.5 w-3.5' />
                                <span className='sr-only'>Next Order</span>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    );
}
