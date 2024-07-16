import React from "react";
import { Link } from "react-router-dom";

interface Product {
    productId: string;
    name: string;
    price: number;
    images: { url: string }[];
}

interface RecommendedProductsProps {
    products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
    products,
}) => {
    return (
        <div className='container mx-auto my-8'>
            <h2 className='text-2xl font-bold mb-4'>Recommended Products</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {products.map((product) => (
                    <div key={product.productId} className='border p-4 rounded'>
                        <Link to={`/products/${product.productId}`}>
                            <img
                                src={product.images[0]?.url}
                                alt={product.name}
                                className='h-40 w-full object-cover mb-2'
                            />
                            <h3 className='font-bold'>{product.name}</h3>
                            <p className='text-sm'>${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
