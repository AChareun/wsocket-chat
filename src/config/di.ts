import { default as DIContainer, factory, get, object } from 'rsdi';
import * as passport from 'passport';

import { DefaultController } from '../module/default/module';
import { UserController, UserModel, UserService, UserRepository } from '../module/user/module';
import { configurePassportStrategy } from './passport';

function configurePassport(container: DIContainer) {
    const userService = container.get<UserService>('UserService');
    const localStrategy: passport.Strategy = configurePassportStrategy(userService);

    passport.use(localStrategy);
    return passport;
}

function addCommonDefinitions(container: DIContainer) {
    container.addDefinitions({
        Passport: factory(configurePassport),
    });
}

function addDefaultModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        DefaultController: object(DefaultController).construct(get('UserService'), get('Passport')),
    });
}

function addUserModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        UserModel: UserModel,
        UserRepository: object(UserRepository).construct(get('UserModel')),
        UserService: object(UserService).construct(get('UserRepository')),
        UserController: object(UserController).construct(get('UserService'), get('Passport')),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addDefaultModuleDefinitions(container);
    addUserModuleDefinitions(container);

    return container;
}
