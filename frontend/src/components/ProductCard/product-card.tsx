import { IProduct } from "@/lib/typing";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: IProduct;
    width?: number;
    height?: number;
    className?: string;
}

export function ProductCard({
    product,
    width,
    height,
    className,
}: ProductCardProps) {
    return (
        <Card className={cn(["p-0 h-fit border-none shadow-none", className])}>
            <CardHeader className='p-0.5'>
                <img
                    alt='Product Image'
                    className='rounded-t-lg object-cover aspect-square'
                    height={height}
                    src={product?.images?.[0]?.url ?? "/placeholder.svg"}
                    width={width}
                />
            </CardHeader>
            <CardContent className='space-y-2 p-2 md:p-4'>
                <h3 className='text-base  md:text-lg font-semibold  line-clamp-1'>
                    {product.name}
                </h3>
                <div className='flex items-center gap-2'>
                    <StarIcon className='h-5 w-5 fill-yellow-500' />
                    <StarIcon className='h-5 w-5 fill-yellow-500' />
                    <StarIcon className='h-5 w-5 fill-yellow-500' />
                    <StarIcon className='h-5 w-5 fill-yellow-500' />
                    <StarIcon className='h-5 w-5 fill-gray-300 dark:fill-gray-600' />
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                        (4.5)
                    </span>
                </div>

                <div className='flex items-center justify-between'>
                    <span className=' text-sm md:text-base lg:text-lg font-bold'>
                        ${product.price}
                    </span>
                    <Link
                        to={`/products/${product._id}`}
                        className='border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground whitespace-nowrap w-fit flex p-1 rounded-md text-sm font-medium md:p-2'
                    >
                        View{" "}
                        <span className='hidden md:block ml-2'> Product</span>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
