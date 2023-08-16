import { Document } from "mongoose";

export interface Banner {
    image: string;
    title: string;
    descriptions: string;
}

export interface BannerModel extends Banner, Document {}