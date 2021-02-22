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

    async getById(id: number): Promise<IUser | undefined> {
        return this.userRepository.getUserById(id);
    }

    async updateUser(id: number, attributes: IUserCreationAttributes): Promise<IUser | undefined> {
        return this.userRepository.updateUser(id, attributes);
    }

    async deleteUser(id: number): Promise<boolean> {
        return this.userRepository.deleteUser(id);
    }
}