import { Schema, Model, model } from "mongoose";
import { LanguageModel } from "../Interface/Language.interface";
const schemaOption: Object = {
    timestamp: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
};

const schema = new Schema({
    languageCode: {
        type: String,
        required: true
    },
    languageName: {
        type: String,
        required: true
    }
}, schemaOption);

export const language: Model<LanguageModel> = model<LanguageModel>('language', schema, 'language');