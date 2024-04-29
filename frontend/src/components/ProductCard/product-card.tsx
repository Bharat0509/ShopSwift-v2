import { IProduct } from "@/lib/typing";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
                    className='rounded-t-lg object-cover'
                    height={height}
                    src={product.images[0].url ?? "/placeholder.svg"}
                    style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                    }}
                    width={width}
                />
            </CardHeader>
            <CardContent className='space-y-2 p-4'>
                <h3 className='text-lg font-semibold  line-clamp-1'>
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
                    <span className='text-lg font-bold'>${product.price}</span>
                    <Link to={`/product/${product._id}`}>
                        <Button variant='outline'>View Product</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
