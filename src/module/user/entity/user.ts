import { IUser, IUserCreationAttributes } from '../../../interface';

export class User implements IUser {
    id?: number;
    password: string;
    username: string;

    constructor(attributes: IUserCreationAttributes) {
        this.id = attributes.id;
        this.username = attributes.username;
        this.password = attributes.password;
    }
}
