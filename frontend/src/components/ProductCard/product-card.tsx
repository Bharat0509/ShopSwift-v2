import { IProduct } from "@/lib/typing";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProductRating from "./product-rating";

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
        <Link
            to={`/products/${product._id}`}
            className={cn([className])}
        >
            <Card
                className={cn(["p-0 h-fit border-none shadow-none"])}
            >
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
                        <>
                            <ProductRating ratings={product.ratings} />
                        </>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                            ({product.ratings})
                        </span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <span className=' text-sm md:text-base lg:text-lg font-bold'>
                            ${product.price}
                        </span>
                        <Button className='z-10 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground whitespace-nowrap w-fit flex p-1 rounded-md text-sm font-medium md:p-2'>
                            Add to Cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
