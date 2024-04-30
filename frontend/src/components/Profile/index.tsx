import { Link } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Axios } from "@/lib/utils";
import { AxiosError } from "axios";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { selectAuthObject } from "@/redux/features/authSlice";

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    avatar: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Profile() {
    const { user } = useAppSelector(selectAuthObject);

    const defaultValues: Partial<ProfileFormValues> = {
        name: user?.name ?? "user",
        email: user?.email ?? "user@gmail.com",
        avatar: user?.avatar?.url,
    };
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(profileData: ProfileFormValues) {
        const profileUpdateToastId = toast.loading("Updating Profile...");
        try {
            await Axios.put("/api/v1/me/update", profileData);
            toast.success("Profile Updated !", { id: profileUpdateToastId });
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                toast.error(e?.response?.data?.error);
            } else {
                console.error("Unexpected error:", e);
                toast.error(
                    "An unexpected error occurred. Please try again later."
                );
            }
            toast.error("Something Went wrong.");
        }
    }

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e?.target?.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                const result = reader.result;
                if (typeof result === "string") {
                    form.setValue("avatar", result);
                } else {
                    console.error("Failed to read file as string");
                }
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
            <Breadcrumb className='flex'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='#'>Account</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Profile</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='avatar'
                        render={({ field }) => (
                            <FormItem className='flex items-center'>
                                <FormControl>
                                    <Avatar className='h-32 w-32'>
                                        <AvatarImage
                                            src={
                                                field.value ??
                                                "https://github.com/shadcn.png"
                                            }
                                            alt='User'
                                        />
                                        <AvatarFallback>
                                            {field?.value}
                                        </AvatarFallback>
                                    </Avatar>
                                </FormControl>
                                <FormDescription className='ml-4 md:ml-6 flex flex-col gap-4 md:gap-6'>
                                    This is your public display image. It can be
                                    your real image or a random photo.
                                    <label
                                        htmlFor='picture'
                                        className='flex gap-2 w-fit px-4 py-2 cursor-pointer bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
                                    >
                                        <Pencil size={18} /> Update Profile
                                        Image
                                    </label>
                                    <input
                                        id='picture'
                                        name='picture'
                                        type='file'
                                        hidden
                                        onChange={handleImagesChange}
                                    />
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='john doe'
                                        className='w-full md:w-3/4'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be
                                    your real name or a pseudonym. You can only
                                    change this once every 30 days.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='john1234@gmail.com'
                                        className='w-full md:w-3/4'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your verified email address used for
                                    account.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>Update profile</Button>
                </form>
            </Form>
        </main>
    );
}
