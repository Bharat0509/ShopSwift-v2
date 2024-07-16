import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import ApiFilter, { QueryString } from "../utils/ApiFilter";
// Define a custom property on the Request object to store decoded user information
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                name: string;
                email: string;
                role: string;
            };
        }
    }
}
// Create Product
export const createProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let images: string[] = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLink: { public_id: string; url: string }[] = [];
        // for (let i = 0; i < images.length; i++) {
        //     const result = await cloudinary.v2.uploader.upload(images[i], {
        //         folder: "products",
        //     });
        //     imagesLink.push({
        //         public_id: result.public_id,
        //         url: result.secure_url,
        //     });
        // }
        req.body.images = imagesLink;
        req.body.user = req.user.userId;
        req.body.name = req.body.productName;
        const product = await Product.create(req.body);
        const apiResponse = new ApiResponse(
            201,
            { product },
            "Product created successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get all Products
export const getAllProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const resultPerPage = 10;
        const productsCount = await Product.countDocuments();

        const productQuery = new ApiFilter(
            Product.find(),
            req.query as QueryString
        )
            .search()
            .filter()
            .sort()
            .pagination(resultPerPage);

        const products = await productQuery.query.exec();

        const apiResponse = new ApiResponse(
            200,
            { productsCount, products, filteredProduct: products?.length },
            "Products fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get query Products
export const getAllSearchProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const data= await fetch(
            `http://15.207.16.130:5000/search?query=${req.query.keyword}`
        ).then(res=>res.json());
        const apiResponse = new ApiResponse(
            200,
            {  products:data },
            "Products fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get all Products ADMIN
export const getAdminProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const products = await Product.find();
        const apiResponse = new ApiResponse(
            200,
            { products },
            "Admin products fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get Product Details
export const getProductDetails = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findById(req.params.id);
        console.log(
            `http://15.207.16.130:5000/search?query="${product?.name}"`
        );
        
         const data = await fetch(
             `http://15.207.16.130:5000/search?query="${product?.name}"`
         ).then((res) => res.json());
       
        if (!product) {
            const apiError = new ApiError(404, "Product not found");
            return next(apiError);
        }
        const apiResponse = new ApiResponse(
            200,
            { product,recommendedProducts:data },
            "Product details fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Update Product
export const updateProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            const apiError = new ApiError(404, "Product not found");
            return next(apiError);
        }

        // New Images From User
        let images: string[] = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting images from Cloudinary
            for (let i = 0; i < product?.images?.length; i++) {
                await cloudinary.v2.uploader.destroy(
                    product.images[i].public_id
                );
            }
        }

        const imagesLink: { public_id: string; url: string }[] = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLink;

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        });

        const apiResponse = new ApiResponse(
            200,
            { product },
            "Product updated successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Delete A Product
export const deleteProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let product = await Product.findById(req.params.id);

        if (!product) {
            const apiError = new ApiError(404, "Product not found");
            return next(apiError);
        }

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await Product.deleteOne(product._id);
        const apiResponse = new ApiResponse(
            200,
            null,
            "Product deleted successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Create New Review Or Update Review
export const createProductReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { rating, comment, productId } = req.body;
        const Review = {
            // user: req.user._id,
            // name: req.user.name,
            // avatar: req.user.avatar,
            rating: Number(rating),
            comment,
            productId,
        };
        const product = await Product.findById(productId);
        // const isReviewed = product.reviews.find(
        //     (rev: any) => rev.user.toString() === req.user._id.toString()
        // );
        // if (isReviewed) {
        //     product.reviews.forEach((rev: any) => {
        //         if (rev.user.toString() === req.user._id.toString()) {
        //             (rev.rating = rating), (rev.comment = comment);
        //         }
        //     });
        // } else {
        //     // product.reviews.push(Review);
        //     product.numOfReviews = product.reviews.length;
        // }
        let avg = 0;
        product.reviews.forEach((rev: any) => {
            return (avg += Number(rev.rating));
        });
        product.ratings = avg / product.numOfReviews;

        await product.save({ validateBeforeSave: false });

        const apiResponse = new ApiResponse(
            200,
            { product },
            "Review added/updated successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Get All Reviews Of A Product
export const getProductReviews = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findById(req.query.id);

        if (!product) {
            const apiError = new ApiError(404, "Product not found");
            return next(apiError);
        }

        const apiResponse = new ApiResponse(
            200,
            { reviews: product.reviews },
            "Product reviews fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);

// Delete a Product Review
export const deleteProductReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findById(req.query.productId);
        if (!product) {
            const apiError = new ApiError(404, "Product not found");
            return next(apiError);
        }

        const reviews = product.reviews.filter(
            (rev: any) => rev._id.toString() !== req.query.id.toString()
        );

        let avg = 0;
        let ratings = product.reviews.forEach((rev: any) => {
            avg += Number(rev.rating);
        });
        product.ratings = reviews.length === 0 ? 0 : avg / reviews.length;

        await Product.findByIdAndUpdate(
            req.query.productId,
            { reviews, ratings },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        const apiResponse = new ApiResponse(
            200,
            null,
            "Product review deleted successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
    }
);
