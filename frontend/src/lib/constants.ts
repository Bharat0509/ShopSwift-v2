import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
    ClipboardList,
    CreditCard,
    Heart,
    Home,
    LineChart,
    LogOutIcon,
    Package,
    ShoppingCart,
    User,
    Users,
} from "lucide-react";

export const navMenuItems = [
    {
        text: "My Profile",
        icon: User,
        href: "/account",
    },
    {
        text: "My Cart",
        icon: ShoppingCart,
        href: "/account/cart",
    },
    {
        text: "My Orders",
        icon: ClipboardList,
        href: "/account/orders",
    },
    {
        text: "Wishlist",
        icon: Heart,
        href: "/account/wishlist",
    },
    {
        text: "Payment Methods",
        icon: CreditCard,
        href: "/account/payment-methods",
    },
    {
        text: "Help/Support",
        icon: QuestionMarkCircledIcon,
        href: "/help",
    },
    {
        text: "Sign Out",
        icon: LogOutIcon,
        href: "/logout",
    },
];

export const dashboardMenuItems = [
    {
        href: "/dashboard",
        text: "Dashboard",
        icon: Home,
    },
    {
        href: "/dashboard/orders",
        text: "Orders",
        icon: ShoppingCart,
    },
    {
        href: "/dashboard/products",
        text: "Products",
        icon: Package,
    },
    {
        href: "/dashboard/customers",
        text: "Customers",
        icon: Users,
    },
    {
        href: "/dashboard/analytics",
        text: "Analytics",
        icon: LineChart,
    },
];
