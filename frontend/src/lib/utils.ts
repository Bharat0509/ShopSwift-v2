import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Axios = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
});
