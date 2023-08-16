import { Document } from "mongoose";

export interface Categort {
    name: string;
    isActive: number;
}

export interface CategortModel extends Categort, Document {}
