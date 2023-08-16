import { Document } from "mongoose";

export interface FeatureProduct {
    productId: string;
}

export interface  FeatureProductModel extends FeatureProduct, Document {}