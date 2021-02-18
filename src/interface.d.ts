import { Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string,
}

export interface IUserCreationAttributes {
    username: IUser['username'],
    password: IUser['password'],
}
