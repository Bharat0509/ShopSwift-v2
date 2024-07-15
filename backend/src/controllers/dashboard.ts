import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import Product from "../models/product";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user";
import asyncHandler from "../utils/asyncHandler";

// Function to calculate total revenue for a specific month
const getTotalRevenue = async (month: number) => {
    const startOfMonth = new Date(new Date().getFullYear(), month - 1, 1); // First day of the month
    const endOfMonth = new Date(new Date().getFullYear(), month, 0); // Last day of the month

    try {
        const result = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]);

        return result.length > 0 ? result[0].total : 0;
    } catch (error) {
        console.error("Error calculating total revenue:", error);
        throw new ApiError(500, "Error calculating total revenue");
    }
};

// Get last 10 orders
const getLast10Orders = async () => {
    try {
        const last10Orders = await Order.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $project: {
                    _id: 1,
                    totalPrice: 1,
                    status: 1,
                    createdAt: 1,
                    'userDetails.name': 1,
                    'userDetails.email': 1,
                    'userDetails.avatar': 1
                }
            }
        ]);
        return last10Orders;
    } catch (error) {
        console.error("Error fetching last 10 orders:", error);
        throw new ApiError(500, "Error fetching last 10 orders");
    }
};

// Get top 10 products with reviews
const getTop10Products = async () => {
    try {
        const top10Products = await Product.find({})
            .sort({ numOfReviews: -1 })
            .limit(10)
            .exec();
        return top10Products;
    } catch (error) {
        console.error("Error fetching top 10 products:", error);
        throw new ApiError(500, "Error fetching top 10 products");
    }
};

// Get all Products ADMIN
export const getDashboardData = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Fetch data for current month
            const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
            const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Calculate previous month

            // Fetch metrics for current month
            const totalProducts = await Product.countDocuments({});
            const totalOrders = await Order.countDocuments({});
            const totalUsers = await User.countDocuments({});
            const activeOrders = await Order.countDocuments({
                status: "active",
            });
            const currentMonthRevenue = await getTotalRevenue(currentMonth);

            // Fetch metrics for previous month
            const prevMonthRevenue = await getTotalRevenue(prevMonth);

            // Fetch last 10 orders
            const last10Orders = await getLast10Orders();

            // Fetch top 10 products with reviews
            const top10Products = await getTop10Products();

            // Calculate percentage increase needed to meet 10% goal
            const percentageIncrease =
                ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) *
                100;

            // Construct dashboard data object
            const dashboardData = {
                currentMonth: {
                    totalProducts,
                    totalOrders,
                    totalUsers,
                    activeOrders,
                    revenue: currentMonthRevenue,
                },
                previousMonth: {
                    revenue: prevMonthRevenue,
                },
                last10Orders,
                top10Products,
                percentageIncrease,
            };

            const apiResponse = new ApiResponse(
                200,
                { dashboardData },
                "Dashboard data fetched successfully"
            );
            res.status(apiResponse.statusCode).json(apiResponse);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            next(new ApiError(500, "Internal Server Error"));
        }
    }
);
