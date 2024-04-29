import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import { IProduct } from "@/lib/typing";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";

export default function HomeProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api/v1/products")
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products);
                });
        };
        fetchProducts();
    }, []);

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
                    <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                            {(products || []).map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[250px]'
                                    width={250}
                                    height={250}
                                />
                            ))}
                        </div>
                        <ScrollBar orientation='horizontal' className='h-2' />
                    </ScrollArea>
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
                    <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                            {(products || []).map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[250px]'
                                    width={250}
                                    height={250}
                                />
                            ))}
                        </div>
                        <ScrollBar orientation='horizontal' className='h-2' />
                    </ScrollArea>
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
                    <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                            {(products || []).map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[250px]'
                                    width={250}
                                    height={250}
                                />
                            ))}
                        </div>
                        <ScrollBar orientation='horizontal' className='h-2' />
                    </ScrollArea>
                </div>
            </div>
        </>
    );
}
