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
export const bannerContent = [
    {
        title: "Discover the Latest in Tech Gadgets",
        description:
            "Stay ahead of the curve with our newest collection of cutting-edge gadgets and electronics.",
        buttonText: "Shop Now",
        buttonLink: "/products/gadgets",
    },
    {
        title: "Upgrade Your Wardrobe with Style",
        description:
            "Explore our trendy collection of clothing and accessories to elevate your fashion game.",
        buttonText: "Explore Fashion",
        buttonLink: "/products/clothing",
    },
    {
        title: "Dive into the World of Knowledge",
        description:
            "Expand your mind with our vast selection of books covering various topics from fiction to self-help.",
        buttonText: "Discover Books",
        buttonLink: "/products/books",
    },
    {
        title: "Enhance Your Living Space",
        description:
            "Transform your home with our range of top-quality appliances and furnishings.",
        buttonText: "Shop Home Essentials",
        buttonLink: "/products/home",
    },
    {
        title: "Stay Active and Healthy",
        description:
            "Achieve your fitness goals with our range of sports gear and outdoor equipment.",
        buttonText: "Explore Sports",
        buttonLink: "/products/sports",
    },
    {
        title: "Pamper Yourself with Beauty Essentials",
        description:
            "Indulge in self-care with our collection of skincare, makeup, and grooming products.",
        buttonText: "Shop Beauty",
        buttonLink: "/products/beauty",
    },
];
