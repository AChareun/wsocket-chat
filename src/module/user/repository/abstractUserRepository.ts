import { IUser, IUserModelCreationAttributes } from '../../../interface';

export abstract class AbstractUserRepository {

    abstract addUser(attributes: IUserModelCreationAttributes): Promise<IUser>;

    abstract getUserById(id: number): Promise<IUser | undefined>;

    abstract updateUser(id: number, attributes: IUserModelCreationAttributes): Promise<IUser | undefined>;

    abstract deleteUser(id: number): Promise<boolean>;
}
