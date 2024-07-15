import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/lib/typing";
import { useGetAdminProductsQuery } from "@/redux/features/dashboardApiSlice";
import { Link } from "react-router-dom";

export default function ProductsDashboard() {
    const { data, isLoading } = useGetAdminProductsQuery("dashboard-orders");

    return (
        <Card>
            <CardHeader>
                <Breadcrumb className='hidden md:flex'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to='#'>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to='#'>Products</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex gap-2'>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>

                    <Button size='sm' className='h-7 gap-1 ml-auto'>
                        <Link to='add' className='flex gap-2 items-center'>
                            <PlusCircle className='h-3.5 w-3.5' />
                            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                                Add Product
                            </span>
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <TableRow key={item}>
                                <TableCell className='hidden sm:table-cell'>
                                    <img
                                        alt='Product img'
                                        className='aspect-square rounded-md object-cover animate-pulse'
                                        height='64'
                                        src={"/placeholder.svg"}
                                        width='64'
                                    />
                                </TableCell>
                                <TableCell className='font-medium'>
                                    <Skeleton className='h-6 w-[250px]' />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='h-6 w-[150px]' />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='h-6 w-[150px]' />
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <Skeleton className='h-6 w-[150px]' />
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <Skeleton className='h-6 w-[150px]' />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='h-6 w-[150px]' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='hidden w-[100px] sm:table-cell'>
                                    <span className='sr-only'>img</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className='hidden md:table-cell'>
                                    Available Stock
                                </TableHead>
                                <TableHead className='hidden md:table-cell '>
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className='sr-only'>Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.products?.map((product: IProduct) => (
                                <TableRow key={product._id}>
                                    <TableCell className='hidden sm:table-cell'>
                                        <img
                                            alt='Product img'
                                            className='aspect-square rounded-md object-cover'
                                            height='64'
                                            src={
                                                product?.images[0]?.url ??
                                                "/placeholder.svg"
                                            }
                                            width='64'
                                        />
                                    </TableCell>
                                    <TableCell className='font-medium'>
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant='outline'>
                                            Published
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell className='hidden md:table-cell'>
                                        {product.stock}
                                    </TableCell>
                                    <TableCell className='hidden md:table-cell'>
                                        {product.createdAt}
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
                                                    <Link
                                                        className='w-full flex items-center gap-2'
                                                        to={`/dashboard/products/${product._id}/edit`}
                                                    >
                                                        <Pencil size={16} />{" "}
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link
                                                        className='w-full flex items-center gap-2'
                                                        to={`/dashboard/products/${product?._id}/delete`}
                                                    >
                                                        <Trash2 size={16} />{" "}
                                                        Delete
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
            <CardFooter>
                <div className='text-xs text-muted-foreground'>
                    Showing <strong>1-10</strong> of{" "}
                    <strong>{data?.products?.length}</strong> products
                </div>
            </CardFooter>
        </Card>
    );
}
