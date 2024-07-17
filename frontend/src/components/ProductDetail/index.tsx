import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsByIdQuery } from "@/redux/features/appApiSlice";
import { addToCart } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-hot-toast";

import { IImage, IProduct } from "@/lib/typing";
import { cn, formatted_price } from "@/lib/utils";
import { ArrowUpIcon, StarIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Reviews from "./Reviews";
import Description from "./ProductDescription";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ProductCard } from "../ProductCard/product-card";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ProductInfo = () => {
    const param = useParams();
    const dispatch = useAppDispatch();
    const [currPreviewImgIdx, setCurrPreviewImgIdx] = useState(0);
    const [productCartQty, setProductCartQty] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const { isLoading, data } = useGetProductsByIdQuery({
        productId: param.productId,
    });
    const product = data?.product;
    const recommendedProducts = data?.recommendedProducts;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productToAdd = {
            productId: param.productId,
            name: product?.name,
            images: product.images,
            price: product.price,
            quantity: productCartQty,
        };
        dispatch(addToCart(productToAdd));
        toast.success("Item added to cart!");
    };

    return (
        <main>
            <Breadcrumb className='flex container my-2 text-lg'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#' className='text-base'>
                                ShopSwift
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='/products' className='text-base'>
                                Products
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-base'>
                            #{param.productId}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start container px-4 mx-auto py-6'>
                <div className='grid gap-4'>
                    <div className='grid md:grid-cols-5 gap-3 items-start'>
                        <div className='hidden md:flex flex-col gap-3 items-start'>
                            {product?.images?.map(
                                (img: IImage, idx: number) => (
                                    <button
                                        key={img?.url}
                                        className={cn([
                                            "border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50",
                                            idx === currPreviewImgIdx &&
                                                "border-2 border-primary",
                                        ])}
                                        onClick={() =>
                                            setCurrPreviewImgIdx(idx)
                                        }
                                    >
                                        <img
                                            alt='Preview thumbnail'
                                            className='aspect-square object-cover'
                                            height='120'
                                            src={img?.url}
                                            width='120'
                                        />
                                        <span className='sr-only'>
                                            View Image {idx + 1}
                                        </span>
                                    </button>
                                )
                            )}
                        </div>
                        <div className='md:col-span-4'>
                            {isLoading ? (
                                <Skeleton className='aspect-[2/3] h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800' />
                            ) : (
                                <img
                                    alt='Product Image'
                                    className='aspect-[2/3] h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
                                    src={
                                        product?.images[currPreviewImgIdx]?.url
                                    }
                                    height='400'
                                    width='600'
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='grid gap-4 md:gap-10 items-start'>
                    <div className='grid gap-4'>
                        {isLoading ? (
                            <Skeleton className='h-8 w-3/4' />
                        ) : (
                            <h1 className='font-bold text-3xl lg:text-4xl'>
                                {product?.name}
                            </h1>
                        )}
                        <div>
                            <div className='flex items-center gap-2 text-green-500'>
                                <ArrowUpIcon className='h-5 w-5' />
                                <span>100 bought in the last week</span>
                            </div>
                            <p>
                                60% combed ringspun cotton/40% polyester jersey
                                tee.
                            </p>
                        </div>
                        <div className='flex items-center gap-4'>
                            {isLoading ? (
                                <Skeleton className='h-8 w-1/2' />
                            ) : (
                                <>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                        <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                    </div>
                                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                                        {product?.ratings} (
                                        {product?.numOfReviews} reviews)
                                    </div>
                                </>
                            )}
                        </div>
                        {isLoading ? (
                            <Skeleton className='h-8 w-1/4' />
                        ) : (
                            <div className='text-4xl font-bold'>
                                {!isLoading && formatted_price(product?.price)}
                            </div>
                        )}
                    </div>
                    <form className='grid gap-4 md:gap-10'>
                        {isLoading ? (
                            <Skeleton className='h-16 w-full' />
                        ) : (
                            <>
                                <div className='grid gap-2'>
                                    <Label
                                        htmlFor='color'
                                        className='text-base'
                                    >
                                        Color
                                    </Label>
                                    <RadioGroup
                                        className='flex items-center gap-2'
                                        defaultValue='black'
                                        id='color'
                                    >
                                        {["black", "white", "blue"].map(
                                            (color) => (
                                                <Label
                                                    key={color}
                                                    className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                                    htmlFor={`color-${color}`}
                                                >
                                                    <RadioGroupItem
                                                        id={`color-${color}`}
                                                        value={color}
                                                    />
                                                    {color
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        color.slice(1)}
                                                </Label>
                                            )
                                        )}
                                    </RadioGroup>
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='size' className='text-base'>
                                        Size
                                    </Label>
                                    <RadioGroup
                                        className='flex items-center gap-2'
                                        defaultValue='m'
                                        id='size'
                                    >
                                        {["xs", "s", "m", "l", "xl"].map(
                                            (size) => (
                                                <Label
                                                    key={size}
                                                    className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                                    htmlFor={`size-${size}`}
                                                >
                                                    <RadioGroupItem
                                                        id={`size-${size}`}
                                                        value={size}
                                                    />
                                                    {size.toUpperCase()}
                                                </Label>
                                            )
                                        )}
                                    </RadioGroup>
                                </div>
                                <div className='grid gap-2 md:w-3/4'>
                                    <Label
                                        htmlFor='quantity'
                                        className='text-base'
                                    >
                                        Quantity
                                    </Label>
                                    <Select
                                        defaultValue='1'
                                        onValueChange={(e: string) =>
                                            setProductCartQty(parseInt(e))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a quantity' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5].map((qty) => (
                                                <SelectItem
                                                    key={qty}
                                                    value={`${qty}`}
                                                >
                                                    {qty}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    className='bg-[#ea580c] text-white hover:bg-[#ee5c11] py-6 md:w-3/4'
                                    disabled={isLoading}
                                    type='submit'
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </Button>
                            </>
                        )}
                    </form>
                </div>
            </div>
            <div className='container mx-auto my-8'>
                <div className='flex justify-center mb-4'>
                    {["description", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            className={cn("px-4 py-2 border-b-2", {
                                "border-primary": activeTab === tab,
                                "border-transparent": activeTab !== tab,
                            })}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <Separator className='my-2' />
                {activeTab === "description" && <Description />}
                {activeTab === "reviews" && <Reviews />}
            </div>
            <div className='container mx-auto py-8'>
                <h2 className='text-2xl font-bold mb-6'>
                    Recommended Products
                </h2>
                <ScrollArea dir='ltr'>
                    <div className='flex space-x-4 pb-4'>
                        {(recommendedProducts as IProduct[])?.map(
                            (product: IProduct) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[150px] md:w-[150px] lg:w-[200px]'
                                    width={200}
                                    height={200}
                                />
                            )
                        )}
                    </div>
                    <ScrollBar orientation='horizontal' className='h-2' />
                </ScrollArea>
            </div>
        </main>
    );
};

export default ProductInfo;
