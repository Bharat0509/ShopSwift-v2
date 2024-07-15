import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useGetDashboardDataQuery } from "@/redux/features/dashboardApiSlice";

export function Dashboard() {
    const { data } = useGetDashboardDataQuery({});
    const currMonth = data?.dashboardData?.currentMonth;
    const lastOrders = data?.dashboardData?.last10Orders;

    return (
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
            <Breadcrumb className='flex'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Overview</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                <Card x-chunk='dashboard-01-chunk-0'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Revenue
                        </CardTitle>
                        <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            ${parseFloat(currMonth?.revenue).toFixed(2)}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-1'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Users
                        </CardTitle>
                        <Users className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            +{currMonth?.totalUsers}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-2'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Orders
                        </CardTitle>
                        <CreditCard className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            +{currMonth?.totalOrders}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-3'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Active Orders
                        </CardTitle>
                        <Activity className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            +{currMonth?.activeOrders}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
                <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
                    <CardHeader className='flex flex-row items-center'>
                        <div className='grid gap-2'>
                            <CardTitle>Recet Orders</CardTitle>
                            <CardDescription>
                                Recent transactions from your store.
                            </CardDescription>
                        </div>
                        <Button asChild size='sm' className='ml-auto gap-1'>
                            <Link to='#'>
                                View All
                                <ArrowUpRight className='h-4 w-4' />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className='hidden xl:table-column'>
                                        Type
                                    </TableHead>
                                    <TableHead className='text-right pr-8'>
                                        Status
                                    </TableHead>
                                    <TableHead className='hidden xl:table-column'>
                                        Date
                                    </TableHead>
                                    <TableHead className='text-right'>
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='h-[10rem] overflow-scroll'>
                                {lastOrders &&
                                    lastOrders.map((order: unknown) => (
                                        <TableRow>
                                            <TableCell>
                                                <div className='font-medium'>
                                                    {order?.userDetails?.name}
                                                </div>
                                                <div className='hidden text-sm text-muted-foreground md:inline'>
                                                    {order?.userDetails?.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className='hidden xl:table-column'>
                                                Sale
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Badge
                                                    className='text-xs'
                                                    variant='outline'
                                                >
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                                                2023-06-26
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                $
                                                {parseInt(
                                                    order?.totalPrice
                                                ).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-5'>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent className='grid gap-8'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage
                                    src='/avatars/01.png'
                                    alt='Avatar'
                                />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className='text-sm font-medium leading-none'>
                                    Olivia Martin
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    olivia.martin@email.com
                                </p>
                            </div>
                            <div className='ml-auto font-medium'>
                                +$1,999.00
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage
                                    src='/avatars/02.png'
                                    alt='Avatar'
                                />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className='text-sm font-medium leading-none'>
                                    Jackson Lee
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    jackson.lee@email.com
                                </p>
                            </div>
                            <div className='ml-auto font-medium'>+$39.00</div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage
                                    src='/avatars/03.png'
                                    alt='Avatar'
                                />
                                <AvatarFallback>IN</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className='text-sm font-medium leading-none'>
                                    Isabella Nguyen
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    isabella.nguyen@email.com
                                </p>
                            </div>
                            <div className='ml-auto font-medium'>+$299.00</div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage
                                    src='/avatars/04.png'
                                    alt='Avatar'
                                />
                                <AvatarFallback>WK</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className='text-sm font-medium leading-none'>
                                    William Kim
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    will@email.com
                                </p>
                            </div>
                            <div className='ml-auto font-medium'>+$99.00</div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage
                                    src='/avatars/05.png'
                                    alt='Avatar'
                                />
                                <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className='text-sm font-medium leading-none'>
                                    Sofia Davis
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    sofia.davis@email.com
                                </p>
                            </div>
                            <div className='ml-auto font-medium'>+$39.00</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
