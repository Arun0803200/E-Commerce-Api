import { Document } from "mongoose";

export interface LanguageInterface {
    languageCode: string;
    languageName: string;
}

export interface LanguageModel extends LanguageInterface, Document {}