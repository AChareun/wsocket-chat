import { IUserModel } from '../../../interface';
import { User } from '../entity/user';

export function fromModelToEntity(model: IUserModel): User {
    return new User(model);
}
