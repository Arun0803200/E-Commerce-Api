import { Document } from "mongoose";

export interface ProductReview {
    productId: string;
    review: string;
    customerId: number;
}

export interface ProductReviewModel extends ProductReview, Document {}