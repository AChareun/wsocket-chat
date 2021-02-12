import { DefaultController } from './controller/defaultController';
import {Application} from "express";
import DIContainer from "rsdi";

function defaultModuleInit(app: Application, container: DIContainer) {
    const defaultController = container.get<DefaultController>('DefaultController');
    defaultController.configureRoutes(app);
}

export { DefaultController, defaultModuleInit };
