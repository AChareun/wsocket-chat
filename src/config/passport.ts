const LocalStrategy = require('passport-local').Strategy;

import { UserService } from '../module/user/service/userService';
import {IUser} from "../interface";

export function configurePassportStrategy(userService: UserService) {
    return new LocalStrategy(async function (username: string, password: string, done: any) {
        userService.validateUser(username, password)
            .then((user: IUser | undefined) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            return done(null, user);
        })
            .catch((err) => {
                return done(err);
            });
    });
}
