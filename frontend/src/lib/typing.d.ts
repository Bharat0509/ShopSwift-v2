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
    _id: string;
    paidAt: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    createAt: string;
}

export interface ICartItem {
    productId: string;
    name: string;
    images: IImage[];
    price: number;
    quantity: number;
}

export interface ICart {
    items: ICartItem[];
    totalItems: number;
    totalPrice: number;
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

export interface IApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface ProfileState {
    status: "idle" | "loading" | "authenticated";
    loading: boolean;
    user: IUser | null;
    error: unknown;
    access_token: string | null;
}

export interface IorderInfo {
    orderDeliveryInfo: {
        name?: string | undefined;
        email?: string | undefined;
        contactNumber?: string | undefined;
        shippingAddress?: string | undefined;
        shippingAddressDetails?: string | undefined;
    };
    orderItems: ICartItem[];
    orderSubTotalPrice: number;
    orderShippingPrice: number;
    orderTaxPrice: number;
    orderTotalPayable: number;
}

export interface IApiError {
    statusCode: number;
    data: unknown;
    success: boolean;
    errors: unknown;
}
