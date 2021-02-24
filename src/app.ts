import createError = require('http-errors');
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import sassMiddleware = require('node-sass-middleware');
import { HttpError } from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';

import { configureDI } from './config/di';
import { defaultModuleInit } from './module/default/module';
import { userModuleInit } from './module/user/module';
import { configureMongoConnection } from './config/db';
import * as passport from 'passport';

const app = express();

// view engine setup
app.set('views', path.join('src', 'module', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'socket-cat',
        resave: false,
        saveUninitialized: true,
    })
);

configureMongoConnection(process.env.DB_PATH || '');

const diContainer = configureDI();

const passportMiddleware = diContainer.get<typeof passport>('Passport');
app.use(passportMiddleware.initialize());
app.use(passportMiddleware.session());

defaultModuleInit(app, diContainer);
userModuleInit(app, diContainer);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
