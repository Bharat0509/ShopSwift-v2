import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { fetchDashboardOrders } from "@/redux/features/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function Component() {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardOrders());
    }, [dispatch]);
    return (
        <Card>
            <CardHeader className='px-7'>
                <Breadcrumb className='hidden md:flex'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href='#'>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href='#'>Products</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    Recent orders from your store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className='hidden sm:table-cell'>
                                Type
                            </TableHead>
                            <TableHead className='hidden sm:table-cell'>
                                Status
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Date
                            </TableHead>
                            <TableHead className='text-right'>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order, index) => (
                            <TableRow
                                className={cn([index % 2 && "bg-accent"])}
                            >
                                <TableCell>
                                    <div className='font-medium'>
                                        {"Liam Doe"}
                                    </div>
                                    <div className='hidden text-sm text-muted-foreground md:inline'>
                                        {"liam@gmail.com"}
                                    </div>
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    Sale
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    <Badge
                                        className='text-xs'
                                        variant='secondary'
                                    >
                                        {order.orderStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    {order.createAt.split("T")[0]}
                                </TableCell>
                                <TableCell className='text-right'>
                                    {order.totalPrice}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
