import {IUser, IUserModel, IUserModelCreationAttributes} from "../../../../interface";
import {AbstractUserRepository} from "../abstractUserRepository";
import UserModel from '../../model/userModel';
import {User} from "../../entity/user";
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

    async deleteUser(id: number): Promise<boolean> {
        try {
            await this.userModel.deleteOne({ _id: id });
            return true
        } catch (e) {
            console.log(e);
            return false
        }
    }

    async getUserById(id: number): Promise<IUser | undefined> {
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

    async updateUser(id: number, attributes: IUserModelCreationAttributes): Promise<IUser | undefined> {
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