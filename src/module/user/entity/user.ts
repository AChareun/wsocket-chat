import { IUser, IUserCreationAttributes } from '../../../interface';

export class User implements IUser {
    private _id?: number;
    private _password: string;
    private _username: string;

    constructor(attributes: IUserCreationAttributes) {
        this._id = attributes.id;
        this._username = attributes.username;
        this._password = attributes.password;
    }

    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }

    get id(): number | undefined {
        return this._id;
    }
    set id(value: number | undefined) {
        this._id = value;
    }
}
