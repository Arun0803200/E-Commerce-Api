import { Document } from "mongoose";

export interface WishList {
    customerId: number;
    productId: number;
}

export interface WishListModel extends WishList, Document {}