/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Star } from "lucide-react";
import Rating from "react-rating";

const ProductRating = ({ ratings }: { ratings: number }) => {
    return (
        <>
            <Rating
                readonly
                initialRating={ratings}
                emptySymbol={<Star />}
                fullSymbol={<Star fill='#FFD700' />
                
            }
            />
        </>
    );
};

export default ProductRating;
