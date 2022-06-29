import {Application, Request, Response, NextFunction} from 'express';
import jwt, {verify} from 'jsonwebtoken'
import User from '../models/User';
class MiddlewareController{
    verifyToken(req: Request, res: Response, next : NextFunction) {
        const token = req.cookies.token;
        const secretKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : ''
        if(token){  //already logged in

            const accessToken = token;
            verify(accessToken,secretKey, (err: any, user: any) => {
                if(err) return res.status(403).json('Token is not valid');
                req.user = user;
                console.log(user);
                next();
            })
        }
        else{       //user not login yet
            next();
        }
    }

    async verifyAdmin (req: Request, res: Response, next: NextFunction){
        const user = await User.findOne({ where: { email: req.user.email } });
        // console.log(user);
        if(user?.admin() === true){
            next();
        } else{
            return res.status(403).json('You are not allow to do that action');
        }
    }

    requireLogin(req: Request, res: Response, next: NextFunction){
        try{
            if(req.cookies.user === undefined)
            res.status(403).json('You are not logged in yet')
            else next();
        } catch(error){
            console.log(error);
            res.status(400).json('There was an error')
        }
    }

}

export = new MiddlewareController;