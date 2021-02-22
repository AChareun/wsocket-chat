import {IUser, IUserModel, IUserModelCreationAttributes} from "../../../../interface";
import {AbstractUserRepository} from "../abstractUserRepository";
import UserModel from '../../model/userModel';
import {fromModelToEntity} from "../../mapper/userMapper";

export class UserRepository extends AbstractUserRepository {
    private readonly userModel: typeof UserModel;

    constructor(userModel: typeof UserModel) {
        super();
        this.userModel = userModel;
    }

    async addUser(attributes: IUserModelCreationAttributes): Promise<IUser> {
        const newUser = new this.userModel(attributes);
        try {
            await newUser.save()
        } catch (e) {
            console.log(e);
        }
        return fromModelToEntity(newUser);
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            await this.userModel.deleteOne({ _id: id });
            return true
        } catch (e) {
            console.log(e);
            return false
        }
    }

    async getUserById(id: string): Promise<IUser | undefined> {
        let requestedUser: IUserModel | null;
        try {
            requestedUser = await this.userModel.findById(id);
            if (requestedUser) {
                return fromModelToEntity(requestedUser);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateUser(id: string, attributes: IUserModelCreationAttributes): Promise<IUser | undefined> {
        let requestedUser: IUserModel | null;
        try {
            requestedUser = await this.userModel.findByIdAndUpdate(id, attributes)
            if (requestedUser) {
                return fromModelToEntity(requestedUser);
            }
        } catch (e) {
            console.log(e);
        }
    }
}