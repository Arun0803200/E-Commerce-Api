import { Model, model, Schema } from "mongoose";
import { CategortModel } from "../Interface/category.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    isActive: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const category: Model<CategortModel> = model<CategortModel>('wishList', schema, 'wishList');
