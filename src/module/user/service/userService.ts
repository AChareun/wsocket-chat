import {AbstractUserRepository} from "../repository/abstractUserRepository";
import {IUser, IUserCreationAttributes} from "../../../interface";

export class UserService {
    private userRepository: AbstractUserRepository;

    constructor(userRepository: AbstractUserRepository) {
        this.userRepository = userRepository;
    }

    async addUser(attributes: IUserCreationAttributes): Promise<IUser> {
        return this.userRepository.addUser(attributes);
    }

    async getById(id: string): Promise<IUser | undefined> {
        return this.userRepository.getUserById(id);
    }

    async updateUser(id: string, attributes: IUserCreationAttributes): Promise<IUser | undefined> {
        return this.userRepository.updateUser(id, attributes);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.deleteUser(id);
    }
}