import { Model, model, Schema } from "mongoose";
import { BarandModel } from "../Interface/brand.interface.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    image: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    isActive: {
        type: String,
        require: true
    }
}, optionalaSchma);

export const brand: Model<BarandModel> = model<BarandModel>('brand', schema, 'brand');
