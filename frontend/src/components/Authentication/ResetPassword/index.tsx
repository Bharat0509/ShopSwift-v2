import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password should be minimum 8 character long." }),
    confirm_password: z
        .string()
        .min(8, { message: "Password should be minimum 8 character long." }),
});
export function ResetPassword() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const navigate=useNavigate()

    const location = useLocation();

    const query = new URLSearchParams(location.search);

    const [resetPassword] = useResetPasswordMutation();
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
    
            await resetPassword({
                password: values.password,
                token: query?.get("token"),
            });
            toast.success("Password reset successful.");
            navigate("/auth")
        } catch (error) {
            toast.error("Fail to send reset password. Please try again.");
        }
    }
    return (
        <main className='h-[75vh] w-screen fixed flex items-center justify-center'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>
                        Reset Your Password
                    </CardTitle>
                    <CardDescription>
                        Enter your new password below to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-8'
                        >
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='********'
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='confirm_password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='********'
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full'>
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}
