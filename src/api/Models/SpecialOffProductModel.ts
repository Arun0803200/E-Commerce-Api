import { Model, model, Schema } from "mongoose";
import { SpecialOffProductModel } from "../Interface/specialOffProduct.interface";
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

export const specialOffProduct: Model<SpecialOffProductModel> = model<SpecialOffProductModel>('specialOffProduct', schema, 'specialOffProduct');
