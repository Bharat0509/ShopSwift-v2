// import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export const Axios = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
//     withCredentials: true,
// });

//Conversion rates (these are example rates, for real-time rates use an API)
const USD_TO_INR_RATE = 82.0  
 

export function formatted_price(amount_usd:number){
   return "₹" + (amount_usd * USD_TO_INR_RATE).toFixed(2);
}
    
export function shuffleArray<T>(array: T[]): T[] {
    // Make a copy of the original array
    const newArray = [...array];
    let currentIndex = newArray.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }

    return newArray;
}
export const Axios = () => {};
