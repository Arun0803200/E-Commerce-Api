import { Model, model, Schema } from "mongoose";
import { ProductReviewModel } from "../Interface/productReview.interface";
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
    review: {
        type: String,
        require: true
    },
    customerId: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const productReview: Model<ProductReviewModel> = model<ProductReviewModel>('ProductReview', schema, 'ProductReview');
