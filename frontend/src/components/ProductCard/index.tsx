import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import { IProduct } from "@/lib/typing";
import { useGetProductsQuery } from "@/redux/features/appApiSlice";
import Spinner from "../ui/spinner";
import { ProductCard } from "./product-card";
interface IProductsData {
    productsCount: number;
    products: IProduct[];
}
export default function HomeProducts() {
    const { data, isSuccess } = useGetProductsQuery({
        searchQueryUrl: `/api/v1/products?category=all&rating[gte]=0`,
    });
    return (
        <>
            <div className='px-4 md:px-6 pt-4 md:block z-0'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                            Recommended For You
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                            Top picks for you. Updated daily.
                        </p>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='relative'>
                    {isSuccess ? (
                        <ScrollArea>
                            <div className='flex space-x-4 pb-4'>
                                {(data as IProductsData).products.map(
                                    (product: IProduct) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            className='w-[150px] md:w-[200px] lg:w-[250px]'
                                            width={250}
                                            height={250}
                                        />
                                    )
                                )}
                            </div>
                            <ScrollBar
                                orientation='horizontal'
                                className='h-2'
                            />
                        </ScrollArea>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>

            <div className='px-4 md:px-6 pt-4 md:block z-0'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                            Recommended For You
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                            Top picks for you. Updated daily.
                        </p>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='relative'>
                    {isSuccess ? (
                        <ScrollArea>
                            <div className='flex space-x-4 pb-4'>
                                {(data as IProductsData).products.map(
                                    (product: IProduct) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            className='w-[150px] md:w-[200px] lg:w-[250px]'
                                            width={250}
                                            height={250}
                                        />
                                    )
                                )}
                            </div>
                            <ScrollBar
                                orientation='horizontal'
                                className='h-2'
                            />
                        </ScrollArea>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>

            <div className='px-4 md:px-6 pt-4 md:block z-0'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                            Recommended For You
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                            Top picks for you. Updated daily.
                        </p>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='relative'>
                    {isSuccess ? (
                        <ScrollArea>
                            <div className='flex space-x-4 pb-4'>
                                {(data as IProductsData).products.map(
                                    (product: IProduct) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            className='w-[150px] md:w-[200px] lg:w-[250px]'
                                            width={250}
                                            height={250}
                                        />
                                    )
                                )}
                            </div>
                            <ScrollBar
                                orientation='horizontal'
                                className='h-2'
                            />
                        </ScrollArea>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </>
    );
}
