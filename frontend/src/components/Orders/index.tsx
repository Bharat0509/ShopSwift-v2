import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/lib/typing";
import { cn } from "@/lib/utils";
import { useGetMyOrdersQuery } from "@/redux/features/appApiSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

export default function Component() {
    const { isLoading, data, error } = useGetMyOrdersQuery({
        refetchOnFocus: true,
        pollingInterval: 500,
    });
    const result = data as { orders: IOrder[] };
    if (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        toast.error(error?.data?.error ?? "Failed to fetch orders.");
    }
    return (
        <Card>
            <CardHeader className='px-4 lg:px-8'>
                <Breadcrumb className='hidden md:flex'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to='#'>Account</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to='#'>Orders</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <CardDescription>
                    Your recent orders from our store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className='hidden sm:table-cell text-center'>
                                Type
                            </TableHead>
                            <TableHead className='hidden sm:table-cell text-center'>
                                Status
                            </TableHead>
                            <TableHead className='hidden md:table-cell text-center '>
                                Date
                            </TableHead>
                            <TableHead className='text-center'>
                                Amount
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <TableRow
                                        key={item}
                                        className={cn([
                                            item % 2 && "bg-accent",
                                        ])}
                                    >
                                        <TableCell>
                                            <Skeleton className='h-6 w-[150px]' />
                                        </TableCell>
                                        <TableCell className='hidden sm:table-cell'>
                                            <Skeleton className='h-6 w-[150px]' />
                                        </TableCell>
                                        <TableCell className='hidden sm:table-cell'>
                                            <Skeleton className='h-6 w-[100px]' />
                                        </TableCell>
                                        <TableCell className='hidden md:table-cell'>
                                            <Skeleton className='h-6 w-[100px]' />
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <Skeleton className='h-6 w-full' />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            result?.orders?.map(
                                (order: IOrder, index: number) => (
                                    <TableRow
                                        key={order._id}
                                        className={cn([
                                            index % 2 && "bg-accent",
                                        ])}
                                    >
                                        <TableCell>
                                            <div className='font-medium'>
                                                {"Liam Doe"}
                                            </div>
                                            <div className='hidden text-sm text-muted-foreground md:inline'>
                                                {"liam@gmail.com"}
                                            </div>
                                        </TableCell>
                                        <TableCell className='hidden sm:table-cell text-center'>
                                            Card Payment
                                        </TableCell>
                                        <TableCell className='hidden sm:table-cell text-center'>
                                            <Badge
                                                className={cn([
                                                    "text-xs",
                                                    order.orderStatus ===
                                                        "Delivered" &&
                                                        "bg-green-600",
                                                    order.orderStatus ===
                                                        "Processing" &&
                                                        "bg-zinc-600",
                                                ])}
                                                variant='secondary'
                                            >
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='hidden md:table-cell text-center'>
                                            {order?.createAt?.split("T")?.[0]}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            Rs.{order.totalPrice.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
