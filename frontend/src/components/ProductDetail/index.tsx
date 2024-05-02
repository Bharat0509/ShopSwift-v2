import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { IProduct } from "@/lib/typing";
import { cn } from "@/lib/utils";
import { useGetProductsByIdQuery } from "@/redux/features/appApiSlice";
import { addToCart } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

export default function ProductInfo() {
    const param = useParams();
    const [currPreviewImgIdx, setCurrPreviewImgIdx] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { isLoading, data, isError } = useGetProductsByIdQuery({
        productId: param.productId,
    });

    const handleAddToCart = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productId = param.productId;
        dispatch(addToCart({ productId, quantity: 1 }));
        toast.success("Item added to cart!");
    };
    const product: IProduct = data?.product;
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
                                            className='aspect-square  object-cover'
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
                                    <>
                                        <img
                                            alt='Product Image'
                                            className='aspect-[2/3] animate-pulse h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
                                            height='400'
                                            src='/placeholder.svg'
                                            width='600'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            alt='Product Image'
                                            className='aspect-[2/3] h-[400px] md:h-[400px] lg:h-[575px] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
                                            height='400'
                                            src={
                                                product?.images[
                                                    currPreviewImgIdx
                                                ]?.url
                                            }
                                            width='600'
                                        />
                                    </>
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
                                <>
                                    <div className='text-4xl font-bold'>
                                        {!isLoading && `$${product.price}`}
                                    </div>
                                </>
                            )}
                        </div>
                        <form className='grid gap-4 md:gap-10'>
                            {isLoading ? (
                                <Skeleton className='h-16 w-full' />
                            ) : (
                                <>
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
                                </>
                            )}

                            {isLoading ? (
                                <Skeleton className='h-16 w-full' />
                            ) : (
                                <>
                                    <div className='grid gap-2'>
                                        <Label
                                            className='text-base'
                                            htmlFor='size'
                                        >
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
                                                {"\n                          "}
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
                                                {"\n                          "}
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
                                                {"\n                          "}
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
                                </>
                            )}

                            {isLoading ? (
                                <Skeleton className='h-12 w-full' />
                            ) : (
                                <>
                                    <div className='grid gap-2'>
                                        <Label
                                            className='text-base'
                                            htmlFor='quantity'
                                        >
                                            Quantity
                                        </Label>
                                        <Select defaultValue='1'>
                                            <SelectTrigger className='w-24'>
                                                <SelectValue placeholder='Select' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='1'>
                                                    1
                                                </SelectItem>
                                                <SelectItem value='2'>
                                                    2
                                                </SelectItem>
                                                <SelectItem value='3'>
                                                    3
                                                </SelectItem>
                                                <SelectItem value='4'>
                                                    4
                                                </SelectItem>
                                                <SelectItem value='5'>
                                                    5
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            <Button
                                size='lg'
                                disabled={isLoading || isError}
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </Button>
                        </form>
                    </div>
                </div>
                <div className='container px-4 mx-auto py-12'>
                    <Separator />
                    <div className='grid gap-8'>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Product Details
                            </h2>
                            <div className='grid gap-4 mt-4 text-sm leading-loose text-gray-500 dark:text-gray-400'>
                                <p>
                                    Introducing the Acme Prism T-Shirt, a
                                    perfect blend of style and comfort for the
                                    modern individual. This tee is crafted with
                                    a meticulous composition of 60% combed
                                    ringspun cotton and 40% polyester jersey,
                                    ensuring a soft and breathable fabric that
                                    feels gentle against the skin.
                                </p>
                                <p>
                                    The design of the Acme Prism T-Shirt is as
                                    striking as it is comfortable. The shirt
                                    features a unique prism-inspired pattern
                                    that adds a modern and eye-catching touch to
                                    your ensemble.
                                </p>
                                <p>
                                    Whether you're running errands, hitting the
                                    gym, or enjoying a casual weekend, the Acme
                                    Prism T-Shirt is the perfect companion. Its
                                    versatile design and high-quality
                                    construction make it a wardrobe staple that
                                    will last for seasons to come.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Product Specifications
                            </h2>
                            <div className='grid gap-4 mt-4 text-sm leading-loose text-gray-500 dark:text-gray-400'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <span className='font-medium'>
                                            Material:
                                        </span>
                                        60% combed ringspun cotton, 40%
                                        polyester
                                        {"\n                          "}
                                    </div>
                                    <div>
                                        <span className='font-medium'>
                                            Fit:
                                        </span>
                                        Regular{"\n                          "}
                                    </div>
                                    <div>
                                        <span className='font-medium'>
                                            Sleeve Length:
                                        </span>
                                        Short{"\n                          "}
                                    </div>
                                    <div>
                                        <span className='font-medium'>
                                            Neckline:
                                        </span>
                                        Crew{"\n                          "}
                                    </div>
                                    <div>
                                        <span className='font-medium'>
                                            Care Instructions:
                                        </span>
                                        Machine wash cold, tumble dry low
                                        {"\n                          "}
                                    </div>
                                    <div>
                                        <span className='font-medium'>
                                            Origin:
                                        </span>
                                        Made in USA
                                        {"\n                          "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Customer Reviews
                            </h2>
                            <div className='grid gap-6 mt-4'>
                                <div className='flex gap-4'>
                                    <Avatar className='w-10 h-10 border'>
                                        <AvatarImage
                                            alt='@shadcn'
                                            src='/placeholder-user.jpg'
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='grid gap-2'>
                                        <div className='flex items-center gap-4'>
                                            <div className='grid gap-0.5 text-sm'>
                                                <h3 className='font-semibold'>
                                                    Sarah Johnson
                                                </h3>
                                                <time className='text-sm text-gray-500 dark:text-gray-400'>
                                                    2 days ago
                                                </time>
                                            </div>
                                            <div className='flex items-center gap-0.5'>
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                            </div>
                                        </div>
                                        <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
                                            <p>
                                                I've been experimenting with my
                                                LuminaCook Multi-Function Air
                                                Fryer for a few weeks now, and
                                                it's been a versatile addition
                                                to my kitchen. It's great for
                                                making crispy fries, chicken
                                                wings, and even some healthier
                                                options.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <Avatar className='w-10 h-10 border'>
                                        <AvatarImage
                                            alt='@shadcn'
                                            src='/placeholder-user.jpg'
                                        />
                                        <AvatarFallback>AC</AvatarFallback>
                                    </Avatar>
                                    <div className='grid gap-2'>
                                        <div className='flex items-center gap-4'>
                                            <div className='grid gap-0.5 text-sm'>
                                                <h3 className='font-semibold'>
                                                    Alex Smith
                                                </h3>
                                                <time className='text-sm text-gray-500 dark:text-gray-400'>
                                                    3 weeks ago
                                                </time>
                                            </div>
                                            <div className='flex items-center gap-0.5'>
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                            </div>
                                        </div>
                                        <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
                                            <p>
                                                I recently purchased the
                                                SparkleShine Home Cleaning
                                                Robot, and it has been a
                                                game-changer in my life. I used
                                                to spend hours every weekend
                                                cleaning my house, but now I can
                                                simply turn on this little robot
                                                and let it do the work. It's
                                                incredibly efficient, navigating
                                                around obstacles with ease. The
                                                only reason I didn't give it a
                                                perfect 5-star rating is that it
                                                occasionally gets stuck under
                                                low furniture. Overall, it's
                                                been a great addition to my
                                                home, saving me time and effort.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <Avatar className='w-10 h-10 border'>
                                        <AvatarImage
                                            alt='@shadcn'
                                            src='/placeholder-user.jpg'
                                        />
                                        <AvatarFallback>EC</AvatarFallback>
                                    </Avatar>
                                    <div className='grid gap-2'>
                                        <div className='flex items-center gap-4'>
                                            <div className='grid gap-0.5 text-sm'>
                                                <h3 className='font-semibold'>
                                                    Emily Parker
                                                </h3>
                                                <time className='text-sm text-gray-500 dark:text-gray-400'>
                                                    2 days ago
                                                </time>
                                            </div>
                                            <div className='flex items-center gap-0.5'>
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-primary' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
