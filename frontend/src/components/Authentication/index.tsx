import { Axios } from "@/lib/utils";
import {
    authFailure,
    authRequest,
    authSuccess,
} from "@/redux/features/profileSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

    const { loading, status } = useAppSelector(
        (state: RootState) => state.profile
    );
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<FormSchema>();

    const handleClick = () => {
        setIsRegister((prev) => !prev);
    };

    const onSubmit: SubmitHandler<FormSchema> = async (userData) => {
        dispatch(authRequest());
        try {
            const { data } = await Axios.post("/api/v1/login", userData);
            dispatch(authSuccess(data.user));
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                dispatch(authFailure(e?.response?.data?.error));
                toast.error(e?.response?.data?.error);
            } else {
                console.error("Unexpected error:", e);

                dispatch(authFailure("An unexpected error occurred"));

                toast.error(
                    "An unexpected error occurred. Please try again later."
                );
            }
        }
    };
    useEffect(() => {
        if (status == "authenticated") {
            const redirectUrl = "/account";
            navigate(redirectUrl, { replace: true });
        }
    }, [location.state, navigate, status]);
    return (
        <div className='w-full lg:grid h-screen fixed lg:grid-cols-2 '>
            <div className='flex items-center justify-center py-12 bg-muted'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex items-center justify-center py-12 border border-muted bg-white px-12'
                >
                    <div className='mx-auto grid w-[350px] gap-6'>
                        <div className='grid gap-2 text-center'>
                            <h1 className='text-3xl font-bold'>
                                {isRegister ? "Sign Up" : "Login"}
                            </h1>
                            <p className='text-balance text-muted-foreground'>
                                {isRegister
                                    ? "Enter your email below to login to your account"
                                    : "Enter your information to create an account"}
                            </p>
                        </div>
                        <div className='grid gap-4'>
                            {isRegister && (
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='first-name'>
                                            First name
                                        </Label>
                                        <Input
                                            id='first-name'
                                            placeholder='Max'
                                            required
                                            {...register("firstName")}
                                        />
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='last-name'>
                                            Last name
                                        </Label>
                                        <Input
                                            id='last-name'
                                            placeholder='Robinson'
                                            required
                                            {...register("lastName")}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                    required
                                    {...register("email")}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    required
                                    placeholder='********'
                                    {...register("password")}
                                />
                                {!isRegister && (
                                    <Link
                                        href='/forgot-password'
                                        className='ml-auto inline-block text-sm underline'
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <Button type='submit' className='w-full'>
                                {isRegister ? "Sign Up" : "Login"}
                            </Button>
                            <Button variant='outline' className='w-full'>
                                {isRegister
                                    ? "Sign up with Google"
                                    : "Login with Google"}
                            </Button>
                        </div>
                        <div className='text-center text-sm'>
                            Don&apos;t have an account?{" "}
                            <Button
                                variant='link'
                                className='underline mx-0 p-0'
                                onClick={handleClick}
                                type='submit'
                                disabled={loading}
                            >
                                {isRegister ? "Sign in" : "Sign Up"}
                            </Button>
                        </div>
                    </div>
                </form>
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
