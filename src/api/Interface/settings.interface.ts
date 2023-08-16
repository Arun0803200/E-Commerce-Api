import { Document } from "mongoose";

export interface settings {
    email: string;
    phoneNumber: string;
    address: string;
    workingHours: string;
    descriptions: string
}

export interface SettingsModel extends settings, Document {}