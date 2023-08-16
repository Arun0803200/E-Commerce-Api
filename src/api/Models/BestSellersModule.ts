import { Model, model, Schema } from "mongoose";
import { BestSellersProduct } from "../Interface/bestSellersProduct.interface";
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

export const bestSellersProduct: Model<BestSellersProduct> = model<BestSellersProduct>('bestSellersProduct', schema, 'bestSellersProduct');
