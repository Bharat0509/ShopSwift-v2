import { Filter, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IProduct } from "@/lib/typing";
import { useGetProductsQuery } from "@/redux/features/appApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";
import { z } from "zod";
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const categories = [
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

const displayFormSchema = z.object({
    categories: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one category.",
        }),
    rating: z.string({
        message: "You have to select at least one rating.",
    }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
    categories: ["all"],
    rating: "1 Start or more",
};
export function Shop() {
    const location = useLocation();
    const form = useForm<DisplayFormValues>({
        resolver: zodResolver(displayFormSchema),
        defaultValues,
    });
    let products: IProduct[] = [];
    let productsQueryUrl: string = `/api/v1/products?category=${form.getValues(
        "categories"
    )}&rating=${form.getValues("categories")}`;
    const { data: result, refetch } = useGetProductsQuery(
        { searchQueryUrl: productsQueryUrl },
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );
    products = result.products;

    function onSubmit(data: DisplayFormValues) {
        console.log(data);
    }
    useEffect(() => {
        productsQueryUrl = `/api/v1/products?category=${form.getValues(
            "categories"
        )}&rating=${form.getValues("categories")}`;
        refetch();
    }, [refetch, location]);

    return (
        <div className='grid h-[calc(100vh-64px)] fixed w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-muted/40 md:block'>
                <div className='flex h-full max-h-screen flex-col gap-2'>
                    <div className='flex h-10 items-center border-b px-4 lg:h-12 lg:px-6'>
                        <Link
                            to='/'
                            className='flex items-center gap-2 font-semibold'
                        >
                            <span className=''>Filter Products</span>
                        </Link>
                    </div>
                    <div className='flex-1 px-4 lg:px-6 overflow-scroll '>
                        <ScrollArea>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-8'
                                >
                                    <FormField
                                        control={form.control}
                                        name='categories'
                                        render={() => (
                                            <FormItem>
                                                <div className='mb-4'>
                                                    <FormLabel className='text-base'>
                                                        Select Category
                                                        <Separator className='mt-2' />
                                                    </FormLabel>
                                                </div>
                                                {categories.map((item) => (
                                                    <FormField
                                                        key={item.id}
                                                        control={form.control}
                                                        name='categories'
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className='flex flex-row items-start space-x-3 space-y-0'
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                item.id
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              item.id,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          field.value?.filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  item.id
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className='font-normal'>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='rating'
                                        render={({ field }) => (
                                            <FormItem className='space-y-3'>
                                                <FormLabel>
                                                    Ratings More than.
                                                    <Separator className='mt-2' />
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className='flex flex-col space-y-1'
                                                    >
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='1' />
                                                            </FormControl>
                                                            <FormLabel className='font-normal flex'>
                                                                <Star
                                                                    size={16}
                                                                />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='2' />
                                                            </FormControl>
                                                            <FormLabel className='flex gap-2'>
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='3' />
                                                            </FormControl>
                                                            <FormLabel className='flex gap-2'>
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='4' />
                                                            </FormControl>
                                                            <FormLabel className='flex gap-2'>
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                                <Star
                                                                    size={16}
                                                                />
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
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
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-8'
                                    >
                                        <FormField
                                            control={form.control}
                                            name='categories'
                                            render={() => (
                                                <FormItem>
                                                    <div className='mb-4'>
                                                        <FormLabel className='text-base'>
                                                            Select Category
                                                            <Separator className='mt-2' />
                                                        </FormLabel>
                                                    </div>
                                                    {categories.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={
                                                                form.control
                                                            }
                                                            name='categories'
                                                            render={({
                                                                field,
                                                            }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className='flex flex-row items-start space-x-3 space-y-0'
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(
                                                                                    item.id
                                                                                )}
                                                                                onCheckedChange={(
                                                                                    checked
                                                                                ) => {
                                                                                    return checked
                                                                                        ? field.onChange(
                                                                                              [
                                                                                                  ...field.value,
                                                                                                  item.id,
                                                                                              ]
                                                                                          )
                                                                                        : field.onChange(
                                                                                              field.value?.filter(
                                                                                                  (
                                                                                                      value
                                                                                                  ) =>
                                                                                                      value !==
                                                                                                      item.id
                                                                                              )
                                                                                          );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className='font-normal'>
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='rating'
                                            render={({ field }) => (
                                                <FormItem className='space-y-3'>
                                                    <FormLabel>
                                                        Ratings More than.
                                                        <Separator className='mt-2' />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            className='flex flex-col space-y-1'
                                                        >
                                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                                <FormControl>
                                                                    <RadioGroupItem value='1' />
                                                                </FormControl>
                                                                <FormLabel className='font-normal flex'>
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                                <FormControl>
                                                                    <RadioGroupItem value='2' />
                                                                </FormControl>
                                                                <FormLabel className='flex gap-2'>
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                                <FormControl>
                                                                    <RadioGroupItem value='3' />
                                                                </FormControl>
                                                                <FormLabel className='flex gap-2'>
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                                <FormControl>
                                                                    <RadioGroupItem value='4' />
                                                                </FormControl>
                                                                <FormLabel className='flex gap-2'>
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
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
                <main className='flex items-center justify-center w-full  p-2 md:p-4 overflow-scroll'>
                    <div className='flex gap-2 flex-wrap overflow-scroll space gap-y-8 h-[85vh]'>
                        {(products || []).map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                className='w-[150px] sm:w-[200px] md:w-[200px] lg:w-[225px]'
                                width={300}
                                height={300}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
