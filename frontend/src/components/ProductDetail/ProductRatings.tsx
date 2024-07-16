import React from "react";
import { StarIcon } from "lucide-react";

interface Review {
    user: string;
    rating: number;
    comment: string;
    images: { url: string }[];
}

interface ProductRatingProps {
    reviews: Review[];
}

const ProductRating: React.FC<ProductRatingProps> = ({ reviews }) => {
    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            : 0;

    return (
        <div className='p-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center gap-0.5'>
                    {Array.from({ length: 5 }, (_, idx) => (
                        <StarIcon
                            key={idx}
                            className={`w-5 h-5 ${
                                idx < Math.round(averageRating)
                                    ? "fill-yellow-400"
                                    : "fill-gray-300 stroke-gray-400"
                            }`}
                        />
                    ))}
                </div>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
            </div>
            <div className='h-60 overflow-y-auto'>
                {reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className='mb-4 p-2 bg-gray-100 rounded-lg dark:bg-gray-700'
                    >
                        <div className='flex items-center gap-2 mb-2'>
                            {review.images[0]?.url && (
                                <img
                                    src={review.images[0]?.url}
                                    alt={review.user}
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            )}
                            <div className='font-bold text-gray-900 dark:text-white'>
                                {review.user}
                            </div>
                        </div>
                        <div className='flex items-center gap-0.5 mb-1'>
                            {Array.from({ length: 5 }, (_, idx) => (
                                <StarIcon
                                    key={idx}
                                    className={`w-4 h-4 ${
                                        idx < review.rating
                                            ? "fill-yellow-400"
                                            : "fill-gray-300 stroke-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className='text-sm text-gray-700 dark:text-gray-300'>
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRating;
