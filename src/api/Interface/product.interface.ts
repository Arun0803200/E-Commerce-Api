import { Document } from "mongoose";

export interface ProductInterface {
    image: string;
    name: string;
    isActive: number;
    price: string;
    strickOutAmount: string;
    sku: string;
    isHot: number;
}

export interface ProductModel extends ProductInterface, Document {}
