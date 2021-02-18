import { Document } from "mongoose";

export interface IUserModel extends Document {
    username: string,
    password: string,
}

export interface IUserModelCreationAttributes {
    id?: IUserModel['_id'],
    username: IUserModel['username'],
    password: IUserModel['password'],
}

export interface IUser {
    id?: number,
    username: string,
    password: string,
}

export interface IUserCreationAttributes {
    id?: IUser['id'],
    username: IUser['username'],
    password: IUser['password'],
}
