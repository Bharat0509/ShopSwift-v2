export interface IProduct {
    category: string;
    createdAt: string;
    description: string;
    images: Image[];
    name: string;
    numOfReviews: number;
    price: number;
    ratings: number;
    reviews: Review[];
    stock: number;
    user: string;
    __v: number;
    _id: string;
}

export interface IOrder {
    user: string;

    paidAt: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    createAt: string;
}

export interface IImage {
    _id: string;
    public_id: string;
    url: string;
}

export interface IReview {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUser {
    avatar: {
        public_id: string;
        url: string;
    };
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    __v: number;
    token: string;
}
