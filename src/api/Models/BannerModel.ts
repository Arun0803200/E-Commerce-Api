import { Model, model, Schema } from "mongoose";
import { BannerModel } from "../Interface/banner.interface";
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
    title: {
        type: String,
        require: true
    },
    descriptions: {
        type: String,
        require: true
    }
}, optionalaSchma);

export const banner: Model<BannerModel> = model<BannerModel>('banner', schema, 'banner');
