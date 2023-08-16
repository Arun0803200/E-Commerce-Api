import { Model, model, Schema } from "mongoose";
import { SettingsModel } from "../Interface/settings.interface";
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
    phoneNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    workingHours: {
        type: String,
        require: true
    },
    descriptions: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const settings: Model<SettingsModel> = model<SettingsModel>('settings', schema, 'settings');
