import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetProductsQuery } from "@/redux/features/appApiSlice";
import { useEffect, useState } from "react";
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Spinner from "../ui/spinner";
import { CategoryFilter } from "./CategoryFilter";
import { RatingFilter } from "./RatingFilter";
import { CheckedState } from "@radix-ui/react-checkbox";
import { IProduct } from "@/lib/typing";
import { Filter } from "lucide-react";

type FiltersState = {
    rating: number;
    categories: string;
    sort: number;
};

export function Shop() {
    const [searchParams,setSearchParams] = useSearchParams();
    
    const queryParams = Object.fromEntries(searchParams.entries());

    const [filters, setFilters] = useState<FiltersState>({
        rating: Number(queryParams?.rating) || 1,
        categories: queryParams?.category || "",
        sort: Number(queryParams?.sortBy) || 0,
    });

    const { data: result, isLoading } = useGetProductsQuery(
        {
            searchQueryUrl: `/api/v1/products?keyword=${
                queryParams?.keyword || ""
            }&category=${filters.categories}&rating[gte]=${filters.rating}`,
        },
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );
    const products: IProduct[] = result?.products || [];

    const handleCheckedChange = (id: string, checked: CheckedState) => {
        setFilters((prev) => ({ ...prev, categories: checked ? id : "" }));
    };
    useEffect(()=>{
        // Navigate(`keyword=${
        //         queryParams?.keyword || ""
        //     }&category=${filters.categories}&rating[gte]=${filters.rating}`)
        let searchParameters = `keyword=${
            queryParams?.keyword || ""
        }`;
        if(filters.categories.length)
        {
            searchParameters+=`&category=${filters.categories}`;
        }
        if(filters.rating>0)
        {
            searchParameters+=`&rating[gte]=${filters.rating}`;
        }

        setSearchParams(
            searchParameters
        );
    },[filters.categories, filters.rating, isLoading, queryParams?.keyword, setSearchParams])

    return (
        <div className='grid h-[calc(100vh-64px)] fixed w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <aside className='hidden border-r bg-muted/40 md:block'>
                <div className='flex flex-col gap-2 h-full max-h-screen'>
                    <header className='flex items-center border-b px-4 lg:px-6 h-10 lg:h-12'>
                        <Link
                            to='/'
                            className='flex items-center gap-2 font-semibold'
                        >
                            Filter Products
                        </Link>
                    </header>
                    <ScrollArea className='flex-1 px-4 lg:px-6'>
                        <CategoryFilter
                            filters={filters}
                            handleCheckedChange={handleCheckedChange}
                        />
                        <RatingFilter setFilters={setFilters} />
                        <ScrollBar orientation='vertical' />
                    </ScrollArea>
                </div>
            </aside>
            <div className='flex flex-col'>
                <header className='flex items-center gap-4 border-b bg-muted/40 px-4 lg:px-6 h-10 lg:h-12'>
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
                                <CategoryFilter
                                    filters={filters}
                                    handleCheckedChange={handleCheckedChange}
                                />
                                <RatingFilter setFilters={setFilters} />
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
                <main className='flex items-center w-full p-2 md:p-4 overflow-scroll'>
                    <div className='flex flex-wrap gap-2 gap-y-8 h-[85vh] pb-20'>
                        {isLoading ? (
                            <div className='w-[80vw] h-full m-auto'>
                                <Spinner />
                            </div>
                        ) : products.length ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    className='w-[150px] sm:w-[200px] md:w-[200px] lg:w-[225px]'
                                    width={300}
                                    height={300}
                                />
                            ))
                        ) : (
                            <p className='w-screen md:w-[80vw] h-[10rem] md:h-[20rem] m-auto flex items-center justify-center'>
                                No Products Available
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
