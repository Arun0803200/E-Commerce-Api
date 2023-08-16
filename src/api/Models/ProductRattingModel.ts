import { Model, model, Schema } from "mongoose";
import { ProductRating } from "../Interface/productRating.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    productId: {
        type: String,
        require: true
    },
    ratting: {
        type: Number,
        require: true
    },
    customerId: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const productRatting: Model<ProductRating> = model<ProductRating>('productRating', schema, 'productRating');
