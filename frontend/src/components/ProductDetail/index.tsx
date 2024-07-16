import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsByIdQuery } from "@/redux/features/appApiSlice";
import { addToCart } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ICartItem, IProduct } from "@/lib/typing";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";
import ProductRating from "../ProductCard/product-rating";
import { ProductCard } from "../ProductCard/product-card";

const ProductInfo = () => {
    const param = useParams();
    const [currPreviewImgIdx, setCurrPreviewImgIdx] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { isLoading, data } = useGetProductsByIdQuery({
        productId: param.productId,
    });
    const [productCartQty, setProductCartQty] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<string>("description");
    const product: IProduct = data?.product;
    const recommendedProducts: IProduct[] = data?.recommendedProducts;

    const handleAddToCart = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const productToAdd: ICartItem = {
            productId: param.productId as string,
            name: product?.name as string,
            images: product.images,
            price: product.price,
            quantity: productCartQty,
        };

        dispatch(addToCart(productToAdd));
        toast.success("Item added to cart!");
    };

    return (
        <>
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
                                {product?.images?.map((img, idx) => (
                                    <button
                                        key={img?.url}
                                        className={cn([
                                            "border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50",
                                            idx === currPreviewImgIdx &&
                                                "border-2 border-primary ",
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
                                            View Image 1
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className='md:col-span-4'>
                                {isLoading ? (
                                    <img
                                        alt='Product Image'
                                        className='aspect-[2/3] animate-pulse h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
                                        height='400'
                                        src='/placeholder.svg'
                                        width='600'
                                    />
                                ) : (
                                    <img
                                        alt='Product Image'
                                        className='aspect-[2/3] h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
                                        height='400'
                                        src={
                                            product?.images[currPreviewImgIdx]
                                                ?.url
                                        }
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
                                    {data.product.name}
                                </h1>
                            )}
                            <div>
                                <p>
                                    60% combed ringspun cotton/40% polyester
                                    jersey tee.
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
                                    {!isLoading && `$${product.price}`}
                                </div>
                            )}
                        </div>
                        <form className='grid gap-4 md:gap-10'>
                            {isLoading ? (
                                <Skeleton className='h-16 w-full' />
                            ) : (
                                <div className='grid gap-2'>
                                    <Label
                                        className='text-base'
                                        htmlFor='color'
                                    >
                                        Color
                                    </Label>
                                    <RadioGroup
                                        className='flex items-center gap-2'
                                        defaultValue='black'
                                        id='color'
                                    >
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='color-black'
                                        >
                                            <RadioGroupItem
                                                id='color-black'
                                                value='black'
                                            />
                                            Black
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='color-white'
                                        >
                                            <RadioGroupItem
                                                id='color-white'
                                                value='white'
                                            />
                                            White
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='color-blue'
                                        >
                                            <RadioGroupItem
                                                id='color-blue'
                                                value='blue'
                                            />
                                            Blue
                                        </Label>
                                    </RadioGroup>
                                </div>
                            )}
                            {isLoading ? (
                                <Skeleton className='h-16 w-full' />
                            ) : (
                                <div className='grid gap-2'>
                                    <Label className='text-base' htmlFor='size'>
                                        Size
                                    </Label>
                                    <RadioGroup
                                        className='flex items-center gap-2'
                                        defaultValue='m'
                                        id='size'
                                    >
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='size-xs'
                                        >
                                            <RadioGroupItem
                                                id='size-xs'
                                                value='xs'
                                            />
                                            XS
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='size-s'
                                        >
                                            <RadioGroupItem
                                                id='size-s'
                                                value='s'
                                            />
                                            S
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='size-m'
                                        >
                                            <RadioGroupItem
                                                id='size-m'
                                                value='m'
                                            />
                                            M
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='size-l'
                                        >
                                            <RadioGroupItem
                                                id='size-l'
                                                value='l'
                                            />
                                            L
                                        </Label>
                                        <Label
                                            className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                                            htmlFor='size-xl'
                                        >
                                            <RadioGroupItem
                                                id='size-xl'
                                                value='xl'
                                            />
                                            XL
                                        </Label>
                                    </RadioGroup>
                                </div>
                            )}
                            {isLoading ? (
                                <Skeleton className='h-16 w-full' />
                            ) : (
                                <div className='grid gap-2'>
                                    <Label
                                        className='text-base'
                                        htmlFor='quantity'
                                    >
                                        Quantity
                                    </Label>
                                    <Select
                                        defaultValue='1'
                                        onValueChange={(e) =>
                                            setProductCartQty(parseInt(e))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a quantity' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='1'>1</SelectItem>
                                            <SelectItem value='2'>2</SelectItem>
                                            <SelectItem value='3'>3</SelectItem>
                                            <SelectItem value='4'>4</SelectItem>
                                            <SelectItem value='5'>5</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <Button
                                className='bg-[#ea580c] text-white hover:bg-[#ee5c11] w-full'
                                disabled={isLoading}
                                type='submit'
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </Button>
                        </form>
                    </div>
                </div>
                <div className='container mx-auto my-8'>
                    <div className='flex justify-center mb-4'>
                        <button
                            className={`px-4 py-2 ${
                                activeTab === "description"
                                    ? "border-b-2 border-primary"
                                    : "border-b"
                            }`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            className={`px-4 py-2 ${
                                activeTab === "reviews"
                                    ? "border-b-2 border-primary"
                                    : "border-b"
                            }`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews
                        </button>
                    </div>
                    {activeTab === "description" && (
                        <div className='px-4'>
                            <h2 className='text-xl font-bold mb-2'>
                                Product Description
                            </h2>
                            <p>{product?.description}</p>
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div className='px-4'>
                            <h2 className='text-xl font-bold mb-2'>
                                Customer Reviews
                            </h2>
                            <ProductRating ratings={product?.ratings} />
                        </div>
                    )}
                </div>
                <Separator className='my-6' />
                <div className='container mx-auto my-8'>
                    <h2 className='text-2xl font-bold mb-4'>
                        Recommended Products
                    </h2>
                    <div className='flex flex-wrap gap-4'>
                        {recommendedProducts && recommendedProducts?.map(
                            (recommendedProduct: IProduct) => (
                               <ProductCard product={recommendedProduct} className="w-[14rem] h-[18rem]"/>
                            )
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductInfo;
