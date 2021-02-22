import { Application } from 'express';
import DIContainer from 'rsdi';
import { UserController } from './controller/userController';
import { UserService } from './service/userService';
import { UserRepository } from './repository/mongoose/userRepository';
import UserModel from './model/userModel';

function userModuleInit(app: Application, container: DIContainer) {
    const userController = container.get<UserController>('UserController');
    userController.configureRoutes(app);
}

export { UserRepository, UserService, UserController, UserModel, userModuleInit };
