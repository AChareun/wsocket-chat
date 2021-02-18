import {Application, Request, Response} from "express";
import * as path from "path";

export class DefaultController {
    private BASE_ROUTE = '/';
    private VIEWS_DIR = '../default/views';

    configureRoutes(app: Application) {
        const ROUTE = this.BASE_ROUTE;

        app.get(`${ROUTE}`, this.index.bind(this));
    }

    async index(req: Request, res: Response) {
        res.render(path.join(this.VIEWS_DIR, 'index'), { title: 'Chat-App' });
    }
}