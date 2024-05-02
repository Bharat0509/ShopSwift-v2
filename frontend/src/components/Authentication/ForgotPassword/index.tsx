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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendForgotPasswordEmailMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({ message: "Please Enter a Valid email address." }),
});
export function ForgotPassword() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const [currTab, setCurrTab] = useState<
        "forgot-password" | "resend-forgot-password"
    >("forgot-password");

    const [sendForgotPasswordEmail] = useSendForgotPasswordEmailMutation();

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await sendForgotPasswordEmail(values.email);
            toast.success("Email sent...");
            setCurrTab("resend-forgot-password");
        } catch (error) {
            toast.error("Fail to send reset password email. Please try again.");
        }
    }
    return (
        <main className='h-[75vh] w-screen fixed flex items-center justify-center'>
            {currTab === "forgot-password" ? (
                <Card className='w-full max-w-sm'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Forgot Password
                        </CardTitle>
                        <CardDescription>
                            Enter your email below to reset your password.
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
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='smithjohn3656@gmail.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This email will be used for
                                                sending reset password email.{" "}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='w-full'>
                                    Send Reset Password Email
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            ) : (
                <Card className='w-full max-w-sm'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Forgot Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <p>
                            We've sent reset password email. please follow
                            mentioned in email to reset your password. f
                        </p>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-8'
                            >
                                <Button type='submit' className='w-full'>
                                    Resend Email
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
