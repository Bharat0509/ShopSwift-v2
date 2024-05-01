import { Link, useLocation } from "react-router-dom";

import { navMenuItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { selectAuthUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AccountLayout({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(selectAuthUser);
    const location = useLocation();

    return (
        <div className='grid h-[calc(100vh-64px)] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed'>
            <div className='hidden border-r bg-muted/50 md:block'>
                <div className='flex h-full  flex-col gap-2'>
                    <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 gap-2'>
                        <Avatar>
                            <AvatarImage
                                src={
                                    user?.avatar.url ??
                                    "https://github.com/shadcn.png"
                                }
                                alt='User'
                            />
                            <AvatarFallback>{user?.name[0]}</AvatarFallback>
                        </Avatar>

                        <p className='text-sm font-semibold'>
                            Welcome,
                            <br />
                            {user?.email}
                        </p>
                    </div>
                    <div className='flex-1'>
                        <nav className='grid items-start px-2 space-y-1 font-medium lg:px-4'>
                            {navMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn([
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                        location.pathname === item.href
                                            ? "text-primary"
                                            : "",
                                    ])}
                                >
                                    <item.icon className='h-4 w-4' />
                                    {item.text}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-[calc(100vh-64px)] overflow-scroll'>
                <main className='flex flex-1 flex-col gap-4 px-4 pt-2 lg:gap-6 lg:px-4'>
                    {children}
                </main>
            </div>
        </div>
    );
}
