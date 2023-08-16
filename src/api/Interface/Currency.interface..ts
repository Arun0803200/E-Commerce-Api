import { Document } from "mongoose";

export interface CurrencyInterface {
    currencyName: string;
    currencyCode: string
    symbol: string;
}

export interface CurrencyModel extends CurrencyInterface, Document {}