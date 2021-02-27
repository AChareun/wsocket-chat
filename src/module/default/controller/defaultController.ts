import { Application, NextFunction, Request, Response } from 'express';
import * as path from 'path';
import * as passport from 'passport';

import { UserService } from '../../user/service/userService';
import { IUser } from '../../../interface';

export class DefaultController {
    private BASE_ROUTE = '/';
    private VIEWS_DIR = '../default/views';
    private authMiddleware: typeof passport;
    private userService: UserService;

    constructor(userService: UserService, authMiddleware: typeof passport) {
        this.authMiddleware = authMiddleware;
        this.userService = userService;
    }

    configureRoutes(app: Application) {
        const ROUTE = this.BASE_ROUTE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}login`, this.getLogin.bind(this));
        app.get(`${ROUTE}signup`, this.getSignUp.bind(this));
        app.post(
            `${ROUTE}login`,
            this.authMiddleware.authenticate('local', {
                successRedirect: ROUTE,
                failureRedirect: `${ROUTE}login`,
            })
        );
        app.post(`${ROUTE}signup`, this.signUp.bind(this));
    }

    async index(req: Request, res: Response) {
        if (req.user) {
            res.render(path.join(this.VIEWS_DIR, 'index'), { user: req.user });
        } else {
            res.redirect(`${this.BASE_ROUTE}login`);
        }
    }

    async getLogin(req: Request, res: Response) {
        res.render(path.join(this.VIEWS_DIR, 'login'));
    }

    async getSignUp(req: Request, res: Response) {
        res.render(path.join(this.VIEWS_DIR, 'signup'));
    }

    async signUp(req: Request, res: Response) {
        const userData = req.body;
        let newUser: IUser;
        try {
            newUser = await this.userService.addUser(userData);
            res.status(200).json(newUser);
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await this.userService.getByCredentials(username, password);

        if (user) {
            res.status(200).redirect(`${this.BASE_ROUTE}`);
        } else {
            res.status(400).json(res.statusCode);
        }
    }
}
