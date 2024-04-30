import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import credentials from "./middleware/credentialHandler";
import express, { Request, Response } from "express";
import corsOptions from "./config/corsOption";
import { rateLimit } from "express-rate-limit";

//Initializing a Express App Instance
export const app = express();
dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 10 minutes
    limit: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(credentials);

// Middleware
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
import user from "./routes/user";
import product from "./routes/product";
import order from "./routes/order";
import payment from "./routes/payment";

// Error Handler Middleware
import errorHandlerMiddleware from "./middleware/errorHandler";

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorHandlerMiddleware);

app.get("/health-check", (_: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "🟢 Service is up and running.",
    });
});
