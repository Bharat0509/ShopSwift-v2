import { Table } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export const TableSkeleton = () => {
    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                        <span className='sr-only'>img</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                        Total Sales
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                        Created at
                    </TableHead>
                    <TableHead>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className='hidden sm:table-cell'>
                        <img
                            alt='Product img'
                            className='aspect-square rounded-md object-cover'
                            height='64'
                            src={"/placeholder.svg"}
                            width='64'
                        />
                        {/* <Skeleton className=' w-16 h-16 rounded-md' /> */}
                    </TableCell>
                    <TableRow>
                        <TableCell className='hidden sm:table-cell'>
                            <img
                                alt='Product img'
                                className='aspect-square rounded-md object-cover'
                                height='64'
                                src={"/placeholder.svg"}
                                width='64'
                            />
                            {/* <Skeleton className=' w-16 h-16 rounded-md' /> */}
                        </TableCell>
                        <TableCell className='font-medium'>
                            <Skeleton className='h-6 w-[150px]' />
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
                </TableRow>
            </TableBody>
        </Table>
    );
};
