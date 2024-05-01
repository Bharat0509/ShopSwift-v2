import {
    authFailure,
    authRequest,
    authSuccess,
    selectAuthObject,
} from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormSchema = z.infer<typeof schema>;

const Authentication = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [login, { isLoading }] = useLoginMutation();

    const { status, user, loading } = useAppSelector(selectAuthObject);

    const [isRegister, setIsRegister] = useState<boolean>(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    const handleClick = () => {
        setIsRegister((prev) => !prev);
    };

    const onSubmit: SubmitHandler<FormSchema> = async (userData) => {
        dispatch(authRequest());
        try {
            const result = await login(userData).unwrap();
            console.log(result);

            dispatch(authSuccess(result?.data));
        } catch (e: unknown) {
            const errorMsg = (e as Error)?.message ?? "Something went wrong.";
            toast.error(errorMsg);
            dispatch(authFailure(errorMsg));
        }
    };
    useEffect(() => {
        if (!loading && status === "authenticated" && user?.email) {
            const redirectUrl = location?.state?.redirectUrl ?? "/account";
            navigate(redirectUrl, { replace: true });
        }
    }, [loading, location.state, navigate, status, user?.email]);
    return (
        <div className='w-full lg:grid h-screen fixed lg:grid-cols-2 '>
            <div className='flex items-center justify-center py-8 bg-muted'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex items-center justify-center py-6 border border-muted px-12  bg-white dark:bg-black/50  rounded-xl'
                    >
                        <div className='mx-auto grid w-[350px] gap-6'>
                            <div className='grid gap-2 text-center'>
                                <h1 className='text-3xl font-bold'>
                                    {isRegister ? "Sign Up" : "Login"}
                                </h1>
                                <p className='text-balance text-muted-foreground'>
                                    {isRegister
                                        ? "Enter your information to create an account"
                                        : "Enter your email below to login to your account"}
                                </p>
                            </div>
                            <div className='grid gap-4'>
                                {isRegister && (
                                    <div className='grid grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='firstName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        First Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='Max'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='lastName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Last Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='Robbins'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='jogn@gmai.com'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='********'
                                                />
                                            </FormControl>
                                            {!isRegister && (
                                                <div className='flex w-full '>
                                                    <Link
                                                        to='/forgot-password'
                                                        className='text-sm ml-auto hover:underline'
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={isLoading}
                                >
                                    {isRegister ? "Sign Up" : "Login"}
                                </Button>
                                <Button
                                    variant='outline'
                                    disabled
                                    className='w-full'
                                >
                                    {isRegister
                                        ? "Sign up with Google"
                                        : "Login with Google"}
                                </Button>
                                <div className='text-center text-sm'>
                                    Don&apos;t have an account?{" "}
                                    <Button
                                        variant='link'
                                        className='underline m-0 p-0 h-0'
                                        onClick={handleClick}
                                        type='button'
                                        disabled={loading}
                                    >
                                        {isRegister ? "Sign in" : "Sign Up"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
            <div className='hidden bg-muted lg:block z-0'>
                <img
                    src='/placeholder.svg'
                    alt='Image'
                    className='h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale -z-10'
                />
            </div>
        </div>
    );
};
export default Authentication;
