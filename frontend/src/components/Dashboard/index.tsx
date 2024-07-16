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

// Define interfaces for the data structures
interface IDashboardData {
    currentMonth: {
        totalProducts: number;
        totalOrders: number;
        totalUsers: number;
        activeOrders: number;
        revenue: string;
    };
    previousMonth: {
        revenue: string;
    };
    last10Orders: Order[];
    top10Products: Product[];
    percentageIncrease: number;
}

interface Order {
    id: string;
    product: string;
    quantity: number;
    status: string;
    totalPrice: string;
    userDetails: {
        name: string;
        email: string;
        avatar: {
            image: string;
            public_id?: string;
        };
    };
}

interface Product {
    id: string;
    name: string;
    price: number;
}

const RevenueCard = ({ revenue }: { revenue: string }) => (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>
                ${parseFloat(revenue).toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
                +20.1% from last month
            </p>
        </CardContent>
    </Card>
);

const UsersCard = ({ totalUsers }: { totalUsers: number }) => (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>+{totalUsers}</div>
            <p className='text-xs text-muted-foreground'>
                +180.1% from last month
            </p>
        </CardContent>
    </Card>
);

const OrdersCard = ({ totalOrders }: { totalOrders: number }) => (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>+{totalOrders}</div>
            <p className='text-xs text-muted-foreground'>
                +19% from last month
            </p>
        </CardContent>
    </Card>
);

const ActiveOrdersCard = ({ activeOrders }: { activeOrders: number }) => (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Orders</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>+{activeOrders}</div>
            <p className='text-xs text-muted-foreground'>
                +201 since last hour
            </p>
        </CardContent>
    </Card>
);

const RecentOrders = ({ orders }: { orders: Order[] }) => (
    <Card className='xl:col-span-2'>
        <CardHeader className='flex flex-row items-center'>
            <div className='grid gap-2'>
                <CardTitle>Recent Orders</CardTitle>
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
                        <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='h-[10rem] overflow-scroll'>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className='font-medium'>
                                    {order.userDetails.name}
                                </div>
                                <div className='hidden text-sm text-muted-foreground md:inline'>
                                    {order.userDetails.email}
                                </div>
                            </TableCell>
                            <TableCell className='hidden xl:table-column'>
                                Sale
                            </TableCell>
                            <TableCell className='text-right'>
                                <Badge className='text-xs' variant='outline'>
                                    Approved
                                </Badge>
                            </TableCell>
                            <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                                2023-06-26
                            </TableCell>
                            <TableCell className='text-right'>
                                ${parseInt(order.totalPrice).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const RecentSales = () => {
    const salesData = [
        {
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            amount: 1999,
            avatar: "/avatars/01.png",
        },
        {
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            amount: 39,
            avatar: "/avatars/02.png",
        },
        {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            amount: 299,
            avatar: "/avatars/03.png",
        },
        {
            name: "William Kim",
            email: "will@email.com",
            amount: 99,
            avatar: "/avatars/04.png",
        },
        {
            name: "Sofia Davis",
            email: "sofia.davis@email.com",
            amount: 39,
            avatar: "/avatars/05.png",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-8'>
                {salesData.map((sale, index) => (
                    <div key={index} className='flex items-center gap-4'>
                        <Avatar className='hidden h-9 w-9 sm:flex'>
                            <AvatarImage src={sale.avatar} alt='Avatar' />
                            <AvatarFallback>
                                {sale.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className='grid gap-1'>
                            <p className='text-sm font-medium leading-none'>
                                {sale.name}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                {sale.email}
                            </p>
                        </div>
                        <div className='ml-auto font-medium'>
                            +${sale.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export function Dashboard() {
    const { data } = useGetDashboardDataQuery({});
    const currMonth = (data?.dashboardData as IDashboardData)?.currentMonth;
    const lastOrders: Order[] = (data?.dashboardData as IDashboardData)
        ?.last10Orders;

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
                <RevenueCard revenue={currMonth?.revenue || "0.00"} />
                <UsersCard totalUsers={currMonth?.totalUsers || 0} />
                <OrdersCard totalOrders={currMonth?.totalOrders || 0} />
                <ActiveOrdersCard activeOrders={currMonth?.activeOrders || 0} />
            </div>
            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
                <RecentOrders orders={lastOrders || []} />
                <RecentSales />
            </div>
        </main>
    );
}
