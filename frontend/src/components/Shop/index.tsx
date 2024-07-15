import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IProduct } from "@/lib/typing";
import { useGetProductsQuery } from "@/redux/features/appApiSlice";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Filter, Star } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../ProductCard/product-card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Spinner from "../ui/spinner";

const categories = [
    { id: "all", label: "All" },
    {
        id: "electronics",
        label: "Electronics",
    },
    {
        id: "clothing",
        label: "Clothing",
    },
    {
        id: "books",
        label: "Books",
    },
    {
        id: "home_appliances",
        label: "Home Appliances",
    },
    {
        id: "sports_outdoors",
        label: "Sports & Outdoors",
    },
    {
        id: "health_beauty",
        label: "Health & Beauty",
    },
] as const;

export function Shop() {
    const [searchParams] = useSearchParams();

    // Convert search params (query string) to an object
    const queryParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    const [filters, setFilters] = useState({
        rating: queryParams?.rating ?? 1,
        categories: queryParams?.category ?? "",
        sort: queryParams?.sortBy ?? 0,
    });

    let products: IProduct[] = [];

    const { data: result, isLoading } = useGetProductsQuery(
        {
            searchQueryUrl: `/api/v1/products?keyword=${queryParams.keyword}&category=${filters.categories}&rating[gte]=${filters.rating}`,
        },
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );
    products = result?.products ?? [];

    const handleCheckedChange = (id: string, checked: CheckedState) => {
        if (checked) {
            setFilters((prev) => ({ ...prev, categories: id }));
        } else {
            setFilters((prev) => ({ ...prev, categories: "" }));
        }
    };

    return (
        <div className='grid h-[calc(100vh-64px)] fixed w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-muted/40 md:block'>
                <div className='flex h-full max-h-screen flex-col gap-2'>
                    <div className='flex h-10 items-center border-b px-4 lg:h-12 lg:px-6'>
                        <Link
                            to='/'
                            className='flex items-center gap-2 font-semibold'
                        >
                            <span className=''>Filter Products </span>
                        </Link>
                    </div>
                    <div className='flex-1 px-4 lg:px-6 overflow-scroll '>
                        <ScrollArea>
                            <div className='space-y-3'>
                                <div className='mb-4 space-y-2'>
                                    <Label className='text-base'>
                                        Select Category
                                        <Separator className='mt-2' />
                                    </Label>
                                    <div className='space-y-2'>
                                        {categories.map((item) => (
                                            <div
                                                key={item.id}
                                                className='flex flex-row items-start space-x-3 space-y-0'
                                            >
                                                <Checkbox
                                                    checked={filters.categories?.includes(
                                                        item.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked: CheckedState
                                                    ) =>
                                                        handleCheckedChange(
                                                            item.id,
                                                            checked
                                                        )
                                                    }
                                                />

                                                <Label className='font-normal'>
                                                    {item.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>
                                    Ratings More than
                                    <Separator className='mt-2' />
                                </Label>

                                <RadioGroup
                                    onValueChange={(val) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            rating: val,
                                        }));
                                    }}
                                    className='flex flex-col space-y-1'
                                >
                                    <div className='flex items-center space-x-3 space-y-0'>
                                        <RadioGroupItem value='1' />

                                        <Label className='flex gap-2'>
                                            <Star size={16} />
                                        </Label>
                                    </div>
                                    <div className='flex items-center space-x-3 space-y-0'>
                                        <RadioGroupItem value='2' />

                                        <Label className='flex gap-2'>
                                            <Star size={16} />
                                            <Star size={16} />
                                        </Label>
                                    </div>
                                    <div className='flex items-center space-x-3 space-y-0'>
                                        <RadioGroupItem value='3' />

                                        <Label className='flex gap-2'>
                                            <Star size={16} />
                                            <Star size={16} />
                                            <Star size={16} />
                                        </Label>
                                    </div>

                                    <div className='flex items-center space-x-3 space-y-0'>
                                        <RadioGroupItem value='4' />

                                        <Label className='flex gap-2'>
                                            <Star size={16} />
                                            <Star size={16} />
                                            <Star size={16} />
                                            <Star size={16} />
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <ScrollBar orientation='vertical' />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <header className='flex h-10 items-center gap-4 border-b bg-muted/40 px-4 lg:h-12 lg:px-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='shrink-0 md:hidden'
                            >
                                <Filter className='h-5 w-5' />
                                <span className='sr-only'>
                                    Toggle filter menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='bottom' className='flex flex-col'>
                            <ScrollArea>
                                <div className='space-y-3'>
                                    <div className='mb-4'>
                                        <Label className='text-base'>
                                            Select Category
                                            <Separator className='mt-2' />
                                        </Label>

                                        {categories.map((item) => (
                                            <div
                                                key={item.id}
                                                className='flex flex-row items-start space-x-3 space-y-0'
                                            >
                                                <Checkbox
                                                    checked={filters.categories?.includes(
                                                        item.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked: CheckedState
                                                    ) =>
                                                        handleCheckedChange(
                                                            item.id,
                                                            checked
                                                        )
                                                    }
                                                />

                                                <Label className='font-normal'>
                                                    {item.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>
                                        Ratings More than
                                        <Separator className='mt-2' />
                                    </Label>

                                    <RadioGroup
                                        onValueChange={(val) =>
                                            console.log(val)
                                        }
                                        className='flex flex-col space-y-1'
                                    >
                                        <div className='flex items-center space-x-3 space-y-0'>
                                            <RadioGroupItem value='1' />

                                            <Label className='flex gap-2'>
                                                <Star size={16} />
                                            </Label>
                                        </div>
                                        <div className='flex items-center space-x-3 space-y-0'>
                                            <RadioGroupItem value='2' />

                                            <Label className='flex gap-2'>
                                                <Star size={16} />
                                                <Star size={16} />
                                            </Label>
                                        </div>
                                        <div className='flex items-center space-x-3 space-y-0'>
                                            <RadioGroupItem value='3' />

                                            <Label className='flex gap-2'>
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                            </Label>
                                        </div>

                                        <div className='flex items-center space-x-3 space-y-0'>
                                            <RadioGroupItem value='4' />

                                            <Label className='flex gap-2'>
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <ScrollBar orientation='vertical' />
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className='flex'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to='#'>ShopSwift</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className='flex items-center  w-full  p-2 md:p-4 overflow-scroll'>
                    <div className='flex gap-2 flex-wrap overflow-scroll space gap-y-8 h-[85vh] pb-20'>
                        {products?.length ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[150px] sm:w-[200px] md:w-[200px] lg:w-[225px]'
                                    width={300}
                                    height={300}
                                />
                            ))
                        ) : isLoading ? (
                            <div className='w-[80vw] h-full m-auto'>
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                {" "}
                                <p className='w-screen md:w-[80vw] h-[10rem] md:h-[20rem] m-auto flex items-center justify-center'>
                                    No Products Available
                                </p>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
