import { Application, Request, Response } from 'express';
import { UserService } from '../service/userService';
import { IUser } from '../../../interface';

export class UserController {
    private BASE_ROUTE = '/user';
    private VIEWS_DIR = '../user/views';
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    configureRoutes(app: Application) {
        const ROUTE = this.BASE_ROUTE;

        app.get(`${ROUTE}/:id`, this.getById.bind(this));
        app.post(`${ROUTE}`, this.createUser.bind(this));
        app.put(`${ROUTE}/:id`, this.updateUser.bind(this));
        app.delete(`${ROUTE}/:id`, this.deleteUser.bind(this));
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        let newUser: IUser;
        try {
            newUser = await this.userService.addUser(userData);
            res.status(200).json(newUser);
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        let requestedUser: IUser | undefined;
        if (userId) {
            try {
                requestedUser = await this.userService.getById(userId);
                res.status(200).json(requestedUser);
            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            res.status(500).send();
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const userData = req.body;
        let updatedUser: IUser | undefined;
        if (userData) {
            try {
                updatedUser = await this.userService.updateUser(userId, userData);
                res.status(200).json(updatedUser);
            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            res.status(500).send();
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        if (userId) {
            try {
                const isSuccess = await this.userService.deleteUser(userId);
                res.status(isSuccess ? 200 : 400).json(isSuccess);
            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            res.status(500).send();
        }
    }
}
