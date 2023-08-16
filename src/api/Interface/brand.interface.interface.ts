import { Document } from "mongoose";

export interface BrandInterface {
    image: string;
    name: string;
    isActive: number;
}

export interface BarandModel extends BrandInterface, Document {}
