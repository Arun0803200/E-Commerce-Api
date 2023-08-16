import { Document } from "mongoose";

export interface ProductRating {
    productId: string;
    ratting: number;
    customerId: number;
}

export interface ProductRatingModel extends ProductRating, Document {}