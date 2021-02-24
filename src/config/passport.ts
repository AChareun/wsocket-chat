const LocalStrategy = require('passport-local').Strategy;

import { UserService } from '../module/user/service/userService';
import { IUser } from '../interface';

export function configurePassportStrategy(userService: UserService) {
    return new LocalStrategy(async function (username: string, password: string, done: any) {
        try {
            const user = await userService.getByCredentials(username, password);
            console.log(user);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, null);
        }
    });
}

export function getSerializeLogic() {
    return function (user: IUser, done: any) {
        done(null, user.id);
    };
}

export function getDeserializeLogic(userService: UserService) {
    return async function (id: string, done: any) {
        await userService
            .getById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    };
}
