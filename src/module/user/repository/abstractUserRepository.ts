import { IUser, IUserModelCreationAttributes } from '../../../interface';

export abstract class AbstractUserRepository {

    abstract getUserByCredentials(username: string, password: string): Promise<IUser | undefined>;

    abstract addUser(attributes: IUserModelCreationAttributes): Promise<IUser>;

    abstract getUserById(id: string): Promise<IUser | undefined>;

    abstract updateUser(id: string, attributes: IUserModelCreationAttributes): Promise<IUser | undefined>;

    abstract deleteUser(id: string): Promise<boolean>;
}
