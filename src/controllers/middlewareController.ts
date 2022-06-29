import { Application, Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken'
import User from '../models/User';
import db from '../config/db'
import Person from '../models/Person';
class MiddlewareController {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        const secretKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : ''
        if (token) {  //already logged in

            const accessToken = token;
            verify(accessToken, secretKey, (err: any, user: any) => {
                if (err) return res.status(403).json('Token is not valid');
                req.user = user;

                //Create new Class Person which is Admin or Normal user
                db.sequelize.query(`select * from users where email='${req.user.email}'`).then((currentUser: any) => {
                    currentUser = currentUser[0][0];
                    if (!currentUser.isAdmin) {
                        req.currentUser = new Person.NormalUser(currentUser.email, currentUser.password, currentUser.firstName, currentUser.lastName, currentUser.address, currentUser.phoneNumber);
                    }
                    else req.currentUser = new Person.Admin(currentUser.email, currentUser.password, currentUser.firstName, currentUser.lastName, currentUser.address, currentUser.phoneNumber);
                    next();
                })
                    .catch((error: any) => { res.status(404).json({ message: "access Token fail...", error }) })
            })
        }
        else {       //user not login yet
            return res.json('You are not login yet');
        }
    }

    async verifyAdmin(req: Request, res: Response, next: NextFunction) {
        const user = await User.findOne({ where: { email: req.user.email } });
        // console.log(user);
        if (user?.admin() === true) {
            next();
        } else {
            return res.status(403).json('You are not allow to do that action');
        }
    }
}

export = new MiddlewareController;