import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { selectCart } from "@/redux/features/appSlice";
import { ICartItem } from "@/lib/typing";

export default function Cart() {
    const { items, totalItems, totalPrice } = useAppSelector(selectCart);
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Your Cart</CardTitle>
                <CardDescription>
                    Manage your cart products and view their details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='lg:flex gap-4 w-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='hidden w-[100px] sm:table-cell'>
                                    <span className='sr-only'>img</span>
                                </TableHead>
                                <TableHead>Name</TableHead>

                                <TableHead>Price</TableHead>
                                <TableHead className='hidden md:table-cell'>
                                    Quantity
                                </TableHead>
                                <TableHead className='hidden md:table-cell'>
                                    SubTotal
                                </TableHead>
                                <TableHead>
                                    <span className='sr-only'>Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((item: ICartItem) => (
                                    <TableRow key={item.productId}>
                                        <TableCell className='hidden sm:table-cell'>
                                            <img
                                                alt='Product img'
                                                className='aspect-square rounded-md object-cover'
                                                height='64'
                                                src={
                                                    item.images[0].url ??
                                                    "/placeholder.svg"
                                                }
                                                width='64'
                                            />
                                        </TableCell>
                                        <TableCell className='font-medium'>
                                            {item.name}
                                        </TableCell>

                                        <TableCell>$499.9</TableCell>
                                        <TableCell className='hidden md:table-cell'>
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell className='hidden md:table-cell'>
                                            $999.98
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup='true'
                                                        size='icon'
                                                        variant='ghost'
                                                    >
                                                        <MoreHorizontal className='h-4 w-4' />
                                                        <span className='sr-only'>
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end'>
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className='text-center w-full '>
                                    <TableCell className='w-full '>
                                        <h3 className='text-2xl font-bold tracking-tight '>
                                            You have no products
                                        </h3>
                                        <p className='text-sm text-muted-foreground'>
                                            You can start selling as soon as you
                                            add a product.
                                        </p>
                                        <Button className='mt-4'>
                                            Add Product
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {totalItems > 0 && (
                        <Card className='overflow-hidden mt-4 lg:mt-0 lg:w-96'>
                            <CardContent className='p-6 text-sm'>
                                <div className='grid gap-3'>
                                    <div className='font-semibold'>
                                        Order Summary
                                    </div>

                                    <Separator className='my-2' />
                                    <ul className='grid gap-3'>
                                        <li className='flex items-center justify-between'>
                                            <span className='text-muted-foreground'>
                                                Subtotal
                                            </span>
                                            <span>${totalPrice}</span>
                                        </li>
                                        <li className='flex items-center justify-between'>
                                            <span className='text-muted-foreground'>
                                                Shipping
                                            </span>
                                            <span>$5.00</span>
                                        </li>
                                        <li className='flex items-center justify-between'>
                                            <span className='text-muted-foreground'>
                                                Tax
                                            </span>
                                            <span>$25.00</span>
                                        </li>
                                        <li className='flex items-center justify-between font-semibold'>
                                            <span className='text-muted-foreground'>
                                                Total
                                            </span>
                                            <span>${totalPrice + 30}</span>
                                        </li>
                                    </ul>
                                    <Button className='rounded-sm'>
                                        Continue for Payment
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
