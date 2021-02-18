import {connect, Error as MongoError} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import UserModel from '../userModel';
import {IUserModelCreationAttributes} from "../../../../interface";

const userData: IUserModelCreationAttributes = {password: "asdfgh322", username: "JohnDoe"};

describe('User Model Test', () => {

    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = new MongoMemoryServer();

        const uri = await mongod.getUri();

        await connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
       await mongod.stop();
    });

    it('creates & saves a user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
    });

    it('inserts user successfully, ignoring fields not defined in the schema', async () => {
        const userWithInvalidField = new UserModel({ username: 'JohnDoe2', password: 'asdfgh322', nickname: 'Johnny' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        // @ts-expect-error
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    });

    it('throws error when required field is missing', async () => {
        const userWithoutRequiredField = new UserModel({ name: 'JohnDoe3' });
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
        } catch (error) {
            expect(error).toBeInstanceOf(MongoError.ValidationError)
            expect(error.errors.password).toBeDefined();
        }
    });
})