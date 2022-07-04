import {Application, Request, Response} from 'express';
import { Sequelize, DataTypes, Model, Op } from "sequelize";
import db from "../config/db"

class authorController{
    public authors = async(req: Request, res: Response) => {
        res.render('authors');
    }
}

export = new authorController;
