import express, { Application} from 'express';
const siteRouter = require('./site');
const bookRouter = require('./book');
const borrowRouter = require('./borrow');
const authRouter = require('./auth');

class Router{
    route(app: Application){
        app.use('/auth', authRouter);
        app.use('/books', bookRouter)
        app.use('/borrow', borrowRouter);
        app.use('/', siteRouter);
    }
}

const router = new Router;
export default router;