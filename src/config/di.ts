import {default as DIContainer, get, object} from 'rsdi';

import { DefaultController } from '../module/default/module';

function addDefaultModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        DefaultController: object(DefaultController).construct(),
    })
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addDefaultModuleDefinitions(container);

    return container;
}
