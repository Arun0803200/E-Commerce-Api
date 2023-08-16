import { Document } from "mongoose";

export interface BestSellersProduct {
    productId: string;
}

export interface  BestSellersProductModel extends BestSellersProduct, Document {}