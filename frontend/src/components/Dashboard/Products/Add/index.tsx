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
    CardFooter,
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
import { cn } from "@/lib/utils";
import { useAddProductMutation } from "@/redux/features/dashboardApiSlice";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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

export function AddProduct() {
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [currImagesPreviewIdx, setCurrImagesPreviewIdx] = useState<number>(0);

    const defaultValues: Partial<FormSchema> = {
        productName: "Stylish Sunglasses",
        description: "Shield your eyes with sophistication and style.",
        status: "Draft",
        category: "Accessories",
        subCategory: "Sunglasses",
        price: 49.99,
        stock: 75,
        size: "M",
    };
    const { register, handleSubmit, setValue, getValues } = useForm<FormSchema>(
        {
            defaultValues: defaultValues,
        }
    );

    const [addProduct, result] = useAddProductMutation();
    const navigate = useNavigate();
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
        const toastId = toast.loading("Creating product...");
        await addProduct({ ...productDetails, images: imagesPreview });

        if (!result.isLoading && result.isSuccess) {
            toast.success("Product Created", { id: toastId });
            navigate("/dashboard/products");
        } else {
            toast.error(`Failed to create product : ${result.error}`, {
                id: toastId,
            });
        }
        // try {
        //     const { data } = await Axios.post("/api/v1/products/new", {
        //         ...productDetails,
        //         images: imagesPreview,
        //     });
        //     toast("Success");
        //     console.log(data);
        // } catch (e: unknown) {
        //     if (e instanceof AxiosError) {
        //         toast.error(e?.response?.data?.error);
        //     } else {
        //         console.error("Unexpected error:", e);
        //         toast.error(
        //             "An unexpected error occurred. Please try again later."
        //         );
        //     }
        // }
    };
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
                        <BreadcrumbPage>Add Product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className='grid flex-1 items-start gap-4 pt-1'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mx-auto grid  flex-1 auto-rows-max gap-4'
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
                        <h1 className='font-semibold'>Add Product</h1>

                        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
                            <Button variant='outline' size='sm'>
                                Discard
                            </Button>
                            <Button size='sm'>Save Product</Button>
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
                                                defaultValue='Gamer Gear Pro Controller'
                                                {...register("productName")}
                                            />
                                        </div>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='description'>
                                                Description
                                            </Label>
                                            <Textarea
                                                id='description'
                                                defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.'
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
                                                    GGPC-001
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
                                                        defaultValue='100'
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
                                                        defaultValue='99.99'
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
                                                        <ToggleGroupItem value='s'>
                                                            S
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='m'>
                                                            M
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='l'>
                                                            L
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className='justify-center border-t p-4'>
                                    <Button
                                        size='sm'
                                        variant='ghost'
                                        className='gap-1'
                                    >
                                        <PlusCircle className='h-3.5 w-3.5' />
                                        Add Variant
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk='dashboard-07-chunk-2'>
                                <CardHeader>
                                    <CardTitle>Product Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-6 sm:grid-cols-3'>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='category'>
                                                Category
                                            </Label>
                                            <Select
                                                onValueChange={(val: string) =>
                                                    setValue("category", val)
                                                }
                                            >
                                                <SelectTrigger
                                                    id='category'
                                                    aria-label='Select category'
                                                >
                                                    <SelectValue placeholder='Select category' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='clothing'>
                                                        Clothing
                                                    </SelectItem>
                                                    <SelectItem value='electronics'>
                                                        Electronics
                                                    </SelectItem>
                                                    <SelectItem value='accessories'>
                                                        Accessories
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='subcategory'>
                                                Subcategory (optional)
                                            </Label>
                                            <Select
                                                onValueChange={(val: string) =>
                                                    setValue("subCategory", val)
                                                }
                                            >
                                                <SelectTrigger
                                                    id='subcategory'
                                                    aria-label='Select subcategory'
                                                >
                                                    <SelectValue placeholder='Select subcategory' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='t-shirts'>
                                                        T-Shirts
                                                    </SelectItem>
                                                    <SelectItem value='hoodies'>
                                                        Hoodies
                                                    </SelectItem>
                                                    <SelectItem value='sweatshirts'>
                                                        Sweatshirts
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                            <Card x-chunk='dashboard-07-chunk-3'>
                                <CardHeader>
                                    <CardTitle>Product Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-6'>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='status'>
                                                Status
                                            </Label>
                                            <Select
                                                onValueChange={(
                                                    val: "Publish" | "Draft"
                                                ) => setValue("status", val)}
                                            >
                                                <SelectTrigger
                                                    id='status'
                                                    aria-label='Select status'
                                                >
                                                    <SelectValue placeholder='Select status' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='publish'>
                                                        Publish
                                                    </SelectItem>
                                                    <SelectItem value='draft'>
                                                        Draft
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card
                                className='overflow-hidden'
                                x-chunk='dashboard-07-chunk-4'
                            >
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid gap-2'>
                                        <img
                                            alt='Product img'
                                            className='aspect-square w-full rounded-md object-cover'
                                            height='300'
                                            src={
                                                imagesPreview[
                                                    currImagesPreviewIdx
                                                ] ?? "/placeholder.svg"
                                            }
                                            width='300'
                                        />
                                        <div className='grid grid-cols-3 gap-2'>
                                            {imagesPreview.map((img, idx) => (
                                                <span
                                                    key={img}
                                                    className={cn([
                                                        idx ===
                                                            currImagesPreviewIdx &&
                                                            "border border-primary",
                                                    ])}
                                                    onClick={() =>
                                                        setCurrImagesPreviewIdx(
                                                            idx
                                                        )
                                                    }
                                                >
                                                    <img
                                                        alt='Product img'
                                                        className='aspect-square w-full rounded-md object-cover'
                                                        height='84'
                                                        src={
                                                            img ??
                                                            "/placeholder.svg"
                                                        }
                                                        width='84'
                                                    />
                                                </span>
                                            ))}

                                            <input
                                                id='upload-product-image'
                                                multiple
                                                type='file'
                                                onChange={
                                                    handleProductImagesChange
                                                }
                                                hidden
                                            />
                                            <label
                                                htmlFor='upload-product-image'
                                                className='flex aspect-square cursor-pointer w-full items-center justify-center rounded-md border border-dashed'
                                            >
                                                <Upload className='h-4 w-4 text-muted-foreground' />
                                                <span className='sr-only'>
                                                    Upload
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2 md:hidden'>
                        <Button variant='outline' size='sm'>
                            Discard
                        </Button>
                        <Button size='sm' type='submit'>
                            Save Product
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
