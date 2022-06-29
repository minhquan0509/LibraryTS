import express, {Application, Request, Response} from 'express';
import jwt, {sign} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User'
class AuthController {
    async register(req: Request, res: Response) {
        try{
            const user = await User.findByPk(req.body.email);
            if(user){
                return res.status(400).json('user already existed');
            } else{

                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                const newUser = await User.create({
                    email: req.body.email,
                    password: hashed
                })
                res.status(200).json('created a new user!');
            }

        } catch(err){
            console.log(err);
        }
    }

    //private method
    private static generateAccessToken(user: User) {
        const secretKey: string = process.env.JWT_SECRET_KEY? process.env.JWT_SECRET_KEY: '';
        return sign({
            email: user.getEmail(),
            isAdmin: user.admin()
        },
        secretKey,
        {expiresIn: '3h'});
    }

    async login(req: Request, res: Response) {
        try {
            const cookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN? process.env.JWT_COOKIE_EXPIRES_IN : 3;
            const user = await User.findByPk(req.body.email);
            console.log(user);
            if(!user) return res.status(400).json('Wrong username!');
            const isValidPassword = await bcrypt.compare(req.body.password, user.getPassword());
            if(!isValidPassword) return res.send('Wrong password!');
            if(isValidPassword && user) {
                const token = AuthController.generateAccessToken(user);
                // console.log(token);
                res.cookie('token', token,{
                    httpOnly: true,
                    secure: false,
                    expires: new Date(Date.now() + (cookieExpiresIn as number)*60*60*1000) //3 hours
                })
                res.cookie('user', user,{
                    httpOnly: true,
                    secure: false,
                    expires: new Date(Date.now() + (cookieExpiresIn as number)*60*60*1000) //3 hours
                })
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    logout(req: Request, res: Response){
        res.clearCookie('token');
        res.clearCookie('user');
        res.redirect('login');
    }

}

export = new AuthController;