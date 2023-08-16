import { Schema, Model, model } from "mongoose";
import { ProductModel } from "../Interface/product.interface";

const ctionOptions: object = {
    timestamp: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
};

const schema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    strickOutAmount: {
        type: String,
        required: false
    },
    sku: {
        type: String,
        required: true
    },
    isHot: {
        type: Number,
        required: false
    }
});
export const product: Model<ProductModel> = model<ProductModel>('product', schema, 'product');
