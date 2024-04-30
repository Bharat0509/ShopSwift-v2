import { CorsOptions } from "cors";

export const whitelist: string[] = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
];

const corsOptions: CorsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            const error = new Error(
                `Origin ${origin} is not allowed by CORS policy.`
            );
            callback(error);
        }
    },
    optionsSuccessStatus: 200,
};

export default corsOptions;
