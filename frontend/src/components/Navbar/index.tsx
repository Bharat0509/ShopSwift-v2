import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navMenuItems } from "@/lib/constants";
import { Axios } from "@/lib/utils";
import { authSuccess } from "@/redux/features/profileSlice";
import { useAppSelector } from "@/redux/hooks";
import {
    LayoutDashboard,
    Menu,
    Moon,
    Package2,
    Search,
    ShoppingCart,
    Sun,
    UserRound,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
    const { setTheme } = useTheme();
    const dispatch = useDispatch();
    const { status, user } = useAppSelector((state) => state.profile);
    useEffect(() => {
        const getProfile = async () => {
            const { data } = await Axios.get("/api/v1/me");
            dispatch(authSuccess(data.user));
        };
        if (status !== "authenticated") {
            getProfile();
        }
    }, [dispatch, status]);

    return (
        <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50'>
            <nav className=' z-50 hidden flex-col gap-6 mr-4 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                <Link
                    to='/'
                    className='text-foreground flex transition-colors text-lg hover:text-foreground'
                >
                    <Package2 className='h-6 w-6 mr-2' />
                    <span className='sr-only'>ShopSwift</span>
                    Shop<span className='text-primary'>Swift</span>
                </Link>
                <Link
                    to='/'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                >
                    Home
                </Link>
                <Link
                    to='/products'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                >
                    Shop
                </Link>
                <Link
                    to='/blog'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                >
                    Blog
                </Link>
                <Link
                    to='/contact'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                >
                    Contact
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant='outline'
                        size='icon'
                        className='shrink-0 md:hidden'
                    >
                        <Menu className='h-5 w-5' />
                        <span className='sr-only'>Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side='left'>
                    <div className='flex h-full max-h-screen flex-col gap-2'>
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
                            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                                {navMenuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                                    >
                                        <item.icon className='h-4 w-4' />
                                        {item.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 z-50'>
                <form className='ml-auto flex-1 sm:flex-initial w-3/4'>
                    <div className='relative'>
                        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                            type='search'
                            placeholder='Search products...'
                            className='pl-8 font-semibold'
                        />
                    </div>
                </form>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline'
                            className='rounded-full'
                            size='icon'
                        >
                            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                            <span className='sr-only'>Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link to='/account/cart'>
                    <Button
                        variant='outline'
                        size='icon'
                        className='rounded-full'
                    >
                        <ShoppingCart className='h-5 w-5' />
                        <span className='sr-only'>shopping cart menu</span>
                    </Button>
                </Link>

                <DropdownMenu>
                    {status === "authenticated" ? (
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='rounded-full'
                            >
                                <Avatar className='h-8 w-8'>
                                    <AvatarImage
                                        src={
                                            user?.avatar.url ??
                                            "https://github.com/shadcn.png"
                                        }
                                        alt='@shadcn'
                                    />
                                    <AvatarFallback>
                                        {user?.name[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className='sr-only'>
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                    ) : (
                        <Link to='/account/cart'>
                            <Button
                                variant='outline'
                                size='icon'
                                className='rounded-full'
                            >
                                <UserRound className='h-5 w-5' />
                                <span className='sr-only'>my account</span>
                            </Button>
                        </Link>
                    )}
                    <DropdownMenuContent align='end' className='w-[14rem] '>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        {user && user.role === "admin" && (
                            <DropdownMenuItem
                                key='admin'
                                className='cursor-pointer'
                            >
                                <Link
                                    to='/dashboard'
                                    className='flex items-center gap-2'
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )}

                        {navMenuItems.map((item) => (
                            <DropdownMenuItem
                                key={item.href}
                                className='cursor-pointer'
                            >
                                <Link
                                    to={item.href}
                                    className='flex items-center gap-2'
                                >
                                    <item.icon size={18} />
                                    {item.text}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Navbar;
