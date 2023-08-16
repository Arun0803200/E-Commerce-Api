import { Model, model, Schema } from "mongoose";
import { CartModel } from "../Interface/customerCart.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    customerId: {
        type: Array,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const cart: Model<CartModel> = model<CartModel>('cart', schema, 'cart');
