import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function OrderInfo() {
    return (
        <div className='sm:py-4 w-full flex flex-col md:flex-row justify-between gap-8'>
            <div className='w-full p-4 rounded-md border'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Order Details</div>
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Glimmer Lamps x <span>2</span>
                            </span>
                            <span>$250.00</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Aqua Filters x <span>1</span>
                            </span>
                            <span>$49.00</span>
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
                            <span>Liam Johnson</span>
                            <span>1234 Main St.</span>
                            <span>Anytown, CA 12345</span>
                        </address>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='grid gap-3'>
                    <div className='font-semibold'>Customer Information</div>
                    <dl className='grid gap-3'>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Customer</dt>
                            <dd>Liam Johnson</dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Email</dt>
                            <dd>
                                <a href='mailto:'>liam@acme.com</a>
                            </dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>Phone</dt>
                            <dd>
                                <a href='tel:'>+1 234 567 890</a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className='w-full h-fit p-4 rounded-md border'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Order Payment Details</div>

                    <Separator className='my-2' />
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Subtotal
                            </span>
                            <span>$299.00</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>
                                Shipping
                            </span>
                            <span>$5.00</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span className='text-muted-foreground'>Tax</span>
                            <span>$25.00</span>
                        </li>
                        <li className='flex items-center justify-between font-semibold'>
                            <span className='text-muted-foreground'>Total</span>
                            <span>$329.00</span>
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
