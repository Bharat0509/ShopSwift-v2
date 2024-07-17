import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CustomError } from "@/lib/typing";
import { cn } from "@/lib/utils";
import {
    useUpdateProductMutation,
    useGetProductByIdQuery,
} from "@/redux/features/dashboardApiSlice";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
    productName: z.string().min(2).max(50).optional(),
    description: z.string().min(2).max(50).optional(),
    status: z.enum(["Publish", "Draft"]),
    category: z.string(),
    subCategory: z.string(),
    price: z.number().positive(),
    stock: z.number(),
    size: z.string(),
    images: z
        .array(z.string().url({ message: "Please enter a valid Image." }))
        .optional(),
});

type FormSchema = z.infer<typeof schema>;
type IImage = {
    url: string;
    public_id: string;
};

export function UpdateProduct() {
    const params = useParams();

    const { data, isLoading } = useGetProductByIdQuery({
        productId: params.id,
    });

    const product = data?.product;

    const [imagesPreview, setImagesPreview] = useState<string[]>(
        (product?.images as IImage[])?.map((e) => e?.url) ?? []
    );
    const [currImagesPreviewIdx, setCurrImagesPreviewIdx] = useState<number>(0);

    const defaultValues: Partial<FormSchema> = {
        productName: product?.name,
        description: product?.description,
        status: product?.status ?? "Draft",
        category: product?.category,
        subCategory: product?.subCategory,
        price: product?.price,
        stock: product?.stock,
        size: product?.size,
    };

    const { register, handleSubmit, setValue, getValues } = useForm<FormSchema>(
        {
            defaultValues: defaultValues,
        }
    );

    useEffect(() => {
        if (product) {
            setValue("productName", product.name);
            setValue("description", product.description);
            setValue("status", product.status as "Publish" | "Draft");
            setValue("category", product.category);
            setValue("subCategory", product.subCategory);
            setValue("price", product.price);
            setValue("stock", product.stock);
            setValue("size", product.size);
        }
    }, [product, setValue]);

    const [updateProduct] = useUpdateProductMutation();

    const handleProductImagesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || []);

        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old: string[]) => [
                        ...old,
                        reader.result as string,
                    ]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const onSubmit: SubmitHandler<FormSchema> = async (productDetails) => {
        const toastId = toast.loading("Updating product...");
        const updatedProduct = { ...productDetails, images: imagesPreview };
        try {
            await updateProduct({
                productId: params.id,
                updatedProduct,
            }).unwrap();
            toast.success("Product Updated", { id: toastId });
        } catch (error) {
            toast.error(
                `Failed to update product : ${
                    (error as CustomError)?.data?.error
                }`,
                {
                    id: toastId,
                }
            );
        }
    };

    if (isLoading)
        return (
            <div className='h-full w-full m-auto'>
                <Spinner />
            </div>
        );

    return (
        <div className='p-4 sm:p-6'>
            <Breadcrumb className='md:flex'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Products</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className='grid flex-1 items-start gap-4 pt-1'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mx-auto grid flex-1 auto-rows-max gap-4'
                >
                    <div className='flex items-center gap-4'>
                        <Button
                            variant='outline'
                            size='icon'
                            className='h-7 w-7'
                        >
                            <ChevronLeft className='h-4 w-4' />
                            <span className='sr-only'>Back</span>
                        </Button>
                        <h1 className='font-semibold'>Edit Product</h1>

                        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
                            <Button variant='outline' size='sm'>
                                Discard
                            </Button>
                            <Button size='sm' type='submit'>
                                Update Product
                            </Button>
                        </div>
                    </div>
                    <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
                        <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                            <Card x-chunk='dashboard-07-chunk-0'>
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>
                                        Elevate Your Style with Timeless
                                        Elegance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-6'>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='name'>Name</Label>
                                            <Input
                                                className='w-full'
                                                {...register("productName")}
                                            />
                                        </div>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='description'>
                                                Description
                                            </Label>
                                            <Textarea
                                                id='description'
                                                className='min-h-32'
                                                {...register("description")}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk='dashboard-07-chunk-1'>
                                <CardHeader>
                                    <CardTitle>Stock</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='w-[100px]'>
                                                    SKU
                                                </TableHead>
                                                <TableHead>Stock</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead className='w-[100px]'>
                                                    Size
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className='font-semibold'>
                                                    {product?.sku ?? "GGPC-001"}
                                                </TableCell>
                                                <TableCell>
                                                    <Label
                                                        htmlFor='stock-1'
                                                        className='sr-only'
                                                    >
                                                        Stock
                                                    </Label>
                                                    <Input
                                                        id='stock-1'
                                                        type='number'
                                                        {...register("stock")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Label
                                                        htmlFor='price-1'
                                                        className='sr-only'
                                                    >
                                                        Price
                                                    </Label>
                                                    <Input
                                                        id='price-1'
                                                        type='number'
                                                        {...register("price")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <ToggleGroup
                                                        type='single'
                                                        variant='outline'
                                                        defaultValue={getValues(
                                                            "size"
                                                        )}
                                                        onValueChange={(
                                                            val: string
                                                        ) =>
                                                            setValue(
                                                                "size",
                                                                val
                                                            )
                                                        }
                                                    >
                                                        <ToggleGroupItem value='M'>
                                                            M
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='L'>
                                                            L
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='XL'>
                                                            XL
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid auto-rows-max gap-4'>
                            <Card x-chunk='dashboard-07-chunk-2'>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                    <CardDescription>
                                        Set product publish status
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-3'>
                                        <Label htmlFor='name'>Status</Label>
                                        <Select
                                            defaultValue={getValues("status")}
                                            onValueChange={(
                                                val: "Publish" | "Draft"
                                            ) => setValue("status", val)}
                                        >
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Select Status' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Publish'>
                                                    Publish
                                                </SelectItem>
                                                <SelectItem value='Draft'>
                                                    Draft
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk='dashboard-07-chunk-3'>
                                <CardHeader>
                                    <CardTitle>Categories</CardTitle>
                                    <CardDescription>
                                        Set product category
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-3 my-2'>
                                        <Label htmlFor='category'>
                                            Category
                                        </Label>
                                        <Select
                                            defaultValue={
                                                getValues("category") ?? "none"
                                            }
                                            onValueChange={(val: string) =>
                                                setValue("category", val)
                                            }
                                        >
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Select Category' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Footwear'>
                                                    Footwear
                                                </SelectItem>
                                                <SelectItem value='Clothing'>
                                                    Clothing
                                                </SelectItem>
                                                <SelectItem value='Accessories'>
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='grid gap-3 my-2'>
                                        <Label htmlFor='subCategory'>
                                            Sub Category
                                        </Label>
                                        <Input
                                            id='subCategory'
                                            type='text'
                                            {...register("subCategory")}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk='dashboard-07-chunk-4'>
                                <CardHeader>
                                    <CardTitle>Media</CardTitle>
                                    <CardDescription>
                                        You can select multiple files
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-4'>
                                        <div className='flex gap-2'>
                                            {imagesPreview.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className={cn(
                                                            "relative h-24 w-24 overflow-hidden rounded-md",
                                                            currImagesPreviewIdx ===
                                                                index &&
                                                                "ring-2 ring-primary"
                                                        )}
                                                        onClick={() =>
                                                            setCurrImagesPreviewIdx(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={image}
                                                            className='object-cover w-full h-full'
                                                            alt={`Product preview ${
                                                                index + 1
                                                            }`}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className='grid gap-2'>
                                            <Label
                                                className='sr-only'
                                                htmlFor='images'
                                            >
                                                Images
                                            </Label>
                                            <Input
                                                id='images'
                                                type='file'
                                                onChange={
                                                    handleProductImagesChange
                                                }
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className='flex md:hidden'>
                        <Button
                            className='flex w-full items-center justify-center'
                            size='sm'
                            type='submit'
                        >
                            Update Product
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
