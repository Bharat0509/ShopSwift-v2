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
import dashboard from "./routes/dashboard";
import path from "path";

// Error Handler Middleware
import errorHandlerMiddleware from "./middleware/errorHandler";

// ====================================
// Define a route to render the order confirmation page

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/order-confirmation", (req, res) => {
    const order = {
        name: "John Doe1",
        _id: "12345",
        deliveredAt: "2024-07-15",
        paymentInfo: {
            id: "abc123",
            status: "s",
        },
        orderItems: [
            { name: "Product 1", quantity: 2, price: 19.99 },
            { name: "Product 2", quantity: 1, price: 39.99 },
        ],

        paidAt: "2024-02-09T11:54:20.003Z",
        itemsPrice: 2790.99,
        taxPrice: 502.37,
        shippingPrice: 0,
        totalPrice: 3293.36,
        orderStatus: "s",
        createAt: "2024-02-09T10:38:33.742Z",
    };

    res.render("order-confirmation", { ...order });
});
// ====================================

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", dashboard);

app.use(errorHandlerMiddleware);

app.get("/health-check", (_: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "🟢 Service is up and running.",
    });
});
