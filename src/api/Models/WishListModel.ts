import { Model, model, Schema } from "mongoose";
import { WishListModel } from "../Interface/wishList.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    customerId: {
        type: Number,
        require: true
    },
    productId: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const wishList: Model<WishListModel> = model<WishListModel>('wishList', schema, 'wishList');
