import { Model, model, Schema } from "mongoose";
import { RatedModel } from "../Interface/ratedProduct.interface";
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
    isRattedProduct: {
        type: Number,
        required: true
    }
}, optionalaSchma);

export const ratedProduct: Model<RatedModel> = model<RatedModel>('ratedProduct', schema, 'ratedProduct');
