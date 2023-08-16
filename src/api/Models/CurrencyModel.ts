import { Model, model, Schema } from "mongoose";
import { CurrencyModel } from "../Interface/Currency.interface.";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const currencySchema = new Schema({
    currencyName: {
        type: String,
        require: true
    },
    currencyCode: {
        type: String,
        require: true
    },
    symbol: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const currency: Model<CurrencyModel> = model<CurrencyModel>('currency', currencySchema, 'currency');
