import mongoose, { Document, Model } from "mongoose";

interface IReview extends Document {
  product: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: string;
  comment: string;

}

const productSchema = new mongoose.Schema<IReview>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
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
    { timestamps: true }
);

const Review: Model<IReview> = mongoose.model("Review", productSchema);
export default Review;
