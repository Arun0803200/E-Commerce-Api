import { Document } from "mongoose";

export interface SpecialOffProduct {
    productId: string;
}

export interface  SpecialOffProductModel extends SpecialOffProduct, Document {}