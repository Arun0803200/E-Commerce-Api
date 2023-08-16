import { Document } from "mongoose";

export interface Customer {
    username: string;
    password: string;
    email: string;
    isActie: number;
    isDelete: number;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    mobileNumber: string;
}

export interface CustomerModel extends Document, Customer {}
