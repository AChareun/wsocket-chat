import {Application, Request, Response} from "express";

export class DefaultController {
    private BASE_ROUTE = '/';
    private VIEWS_DIR = 'default/views';

    configureRoutes(app: Application) {
        const ROUTE = this.BASE_ROUTE;

        app.get(`${ROUTE}`, this.index.bind(this));
    }

    async index(req: Request, res: Response) {
        res.render('index', { title: 'Chat-App' });
    }
}