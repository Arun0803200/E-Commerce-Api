import { Document } from "mongoose";

export interface Cart {
    customerId: number;
    productId: number;
}

export interface CartModel extends Cart, Document {}