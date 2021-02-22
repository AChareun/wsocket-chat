import { default as DIContainer, get, object } from 'rsdi';

import { DefaultController } from '../module/default/module';
import { UserController, UserModel, UserService, UserRepository } from '../module/user/module';

function addDefaultModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        DefaultController: object(DefaultController).construct(),
    });
}

function addUserModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        UserModel: UserModel,
        UserRepository: object(UserRepository).construct(get('UserModel')),
        UserService: object(UserService).construct(get('UserRepository')),
        UserController: object(UserController).construct(get('UserService')),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addDefaultModuleDefinitions(container);
    addUserModuleDefinitions(container);

    return container;
}
