import mongoose, { Document, Model } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: {
        public_id: string;
        url: string;
    }[];
    category: string;
    stock: number;
    numOfReviews: number;
    reviews: {
        user: mongoose.Schema.Types.ObjectId;
        name: string;
        rating: string;
        comment: string;
    }[];
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, "Please enter the product name."],
        },
        description: {
            type: String,
            required: [true, "Please enter the product description."],
        },
        price: {
            type: Number,
            required: [true, "Please enter the product price."],
            maxLength: [8, "Price cannot be more than 8 digits."],
        },
        ratings: {
            type: Number,
            default: 0,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        category: {
            type: String,
            required: [true, "Please enter the product category."],
        },
        stock: {
            type: Number,
            required: [true, "Please enter the stock quantity."],
            default: 1,
        },
        numOfReviews: {
            type: Number,
            required: [true, "Please enter the number of reviews."],
            default: 1,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: String,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model("Product", productSchema);
export default Product;
