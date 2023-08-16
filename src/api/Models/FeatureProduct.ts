import { Model, model, Schema } from "mongoose";
import { FeatureProduct } from "../Interface/featureProduct.interface";
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
}, optionalaSchma);

export const featureProduct: Model<FeatureProduct> = model<FeatureProduct>('featureProduct', schema, 'featureProduct');
