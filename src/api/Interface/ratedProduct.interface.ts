import { Document } from "mongoose";

export interface rated {
    productId: string;
    ratting: number;
    isRattedProduct: number;
}

export interface RatedModel extends rated, Document {}