import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
    withCredentials: true,
});
